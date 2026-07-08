import { legalAnalysisSchema } from "@/lib/legal/analyze";
import { exportLegalAnalysisDocx } from "@/lib/legal/export";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const parsed = legalAnalysisSchema.safeParse((await request.json().catch(() => null))?.analysis);
  if (!parsed.success) return Response.json({ error: "Invalid legal analysis payload." }, { status: 400 });
  const buffer = await exportLegalAnalysisDocx(parsed.data);
  return new Response(new Uint8Array(buffer), { headers: { "content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "content-disposition": `attachment; filename="${parsed.data.document || "vespera-legal-review"}.docx"` } });
}
