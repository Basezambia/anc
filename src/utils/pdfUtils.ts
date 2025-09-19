import jsPDF from 'jspdf';
import autoTable, { type RowInput } from 'jspdf-autotable';

export interface AncestryDatum {
  region: string;
  percent: number;
}

type AutoTableDoc = jsPDF & { lastAutoTable?: { finalY?: number } };

declare global {
  interface Window {
    aiAncestryUserName?: string;
  }
}

const PAGE_MARGIN = 60;
const LINE_HEIGHT = 18;

function addHeading(doc: jsPDF, text: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(text, PAGE_MARGIN, y);
  return y + LINE_HEIGHT;
}

function addParagraph(doc: jsPDF, text: string, y: number): number {
  if (!text.trim()) {
    return y;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - PAGE_MARGIN * 2;
  const lines = doc.splitTextToSize(text, maxWidth);

  lines.forEach((line) => {
    if (y > doc.internal.pageSize.getHeight() - PAGE_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
    }

    doc.text(line, PAGE_MARGIN, y, { maxWidth });
    y += LINE_HEIGHT;
  });

  return y + LINE_HEIGHT / 2;
}

function sanitizeContent(text: string): string {
  return text
    .replace(/\r/g, '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*/g, '');
}

function buildSummaryTable(doc: jsPDF, ancestryData: AncestryDatum[], startY: number): number {
  if (ancestryData.length === 0) {
    return startY;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Ancestry Breakdown', PAGE_MARGIN, startY);

  const rows: RowInput[] = ancestryData.map((item) => [item.region, `${item.percent}%`]);

  autoTable(doc, {
    startY: startY + LINE_HEIGHT,
    head: [[ 'Region/Group', 'Estimated Percentage' ]],
    body: rows,
    styles: { font: 'helvetica', fontSize: 11 },
    headStyles: { fillColor: [47, 128, 237] },
    margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
  });

  const autoDoc = doc as AutoTableDoc;
  return (autoDoc.lastAutoTable?.finalY ?? startY) + LINE_HEIGHT;
}

function addPieChartImage(doc: jsPDF, image?: string): void {
  if (!image || !image.startsWith('data:image')) {
    return;
  }

  const pageWidth = doc.internal.pageSize.getWidth();
  const chartWidth = Math.min(320, pageWidth - PAGE_MARGIN * 2);
  const chartHeight = chartWidth * 0.7;
  const x = (pageWidth - chartWidth) / 2;
  const y = doc.internal.pageSize.getHeight() - chartHeight - PAGE_MARGIN;

  try {
    doc.addImage(image, 'PNG', x, y, chartWidth, chartHeight);
  } catch (error) {
    console.error('Failed to embed pie chart image in PDF', error);
  }
}

export function downloadAnalysisAsPDF(
  result: string,
  ancestryData: AncestryDatum[],
  pieChartDataUrl?: string,
): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(245, 246, 250);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('Ancestry Analysis Report', pageWidth / 2, 100, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(new Date().toLocaleString(), pageWidth / 2, 120, { align: 'center' });

  if (typeof window !== 'undefined' && window.aiAncestryUserName) {
    doc.setFont('helvetica', 'italic');
    doc.text(`Wallet: ${window.aiAncestryUserName}`, pageWidth / 2, 140, { align: 'center' });
  }

  doc.addPage();
  let currentY = PAGE_MARGIN;

  const sanitized = sanitizeContent(result);
  const sections = sanitized.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  sections.forEach((section) => {
    const headingMatch = section.match(/^([A-Z][A-Za-z\s&]+):\s*(.*)$/);
    if (headingMatch) {
      currentY = addHeading(doc, headingMatch[1], currentY);
      currentY = addParagraph(doc, headingMatch[2], currentY);
    } else {
      currentY = addParagraph(doc, section, currentY);
    }
  });

  currentY = Math.max(currentY, PAGE_MARGIN);
  currentY = buildSummaryTable(doc, ancestryData, currentY + LINE_HEIGHT);

  addPieChartImage(doc, pieChartDataUrl);

  doc.save('ai-ancestry-report.pdf');
}
