import { analyzeLegalDocument } from "@/lib/legal/analyze";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  const context = String(form.get("context") || "");
  if (!(file instanceof File)) return Response.json({ error: "A DOCX or TXT file is required." }, { status: 400 });
  try {
    const analysis = await analyzeLegalDocument(file, context);
    return Response.json({ analysis });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Legal analysis failed." }, { status: 400 });
  }
}
