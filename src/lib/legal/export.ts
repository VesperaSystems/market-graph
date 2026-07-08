import { Document, Packer, Paragraph, TextRun } from "docx";
import type { LegalAnalysis } from "@/lib/legal/analyze";

export async function exportLegalAnalysisDocx(analysis: LegalAnalysis) {
  const children = [
    new Paragraph({ children: [new TextRun({ text: `Vespera Legal Review: ${analysis.document}`, bold: true, size: 32 })] }),
    new Paragraph({ text: `Issues found: ${analysis.metadata.issuesFound}` }),
    new Paragraph({ text: `Analyzed: ${analysis.metadata.analysisTimestamp}` }),
    ...analysis.issues.flatMap((issue, index) => [
      new Paragraph({ children: [new TextRun({ text: `${index + 1}. ${issue.type} (${issue.severity})`, bold: true })] }),
      new Paragraph({ text: `Original: ${issue.original_text}` }),
      new Paragraph({ text: `Recommended: ${issue.recommended_text}` }),
      new Paragraph({ text: `Comment: ${issue.comment}` }),
    ]),
  ];
  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
