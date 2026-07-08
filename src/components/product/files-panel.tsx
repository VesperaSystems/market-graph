import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const files = ["Investment questions", "Legal review exports", "Python strategy drafts", "Graph configuration", "Uploaded diligence materials"];
export function FilesPanel() {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{files.map((file) => <Card key={file}><CardHeader><div className="flex items-center justify-between"><p className="hud-label">Estate</p><Badge>MVP</Badge></div><CardTitle>{file}</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-neutral-400">This file estate panel is the landing zone for the mission-control file manager port. Storage, shares, history, and retention controls are tracked in future work.</p></CardContent></Card>)}</div>;
}
