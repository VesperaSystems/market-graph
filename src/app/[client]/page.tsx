import { GraphDisplay } from "@/components/graph/graph-display";
import { getClientGraphConfig } from "@/lib/client-graphs";

export default async function ClientGraphPage({
  params,
}: {
  params: Promise<{ client: string }>;
}) {
  const { client } = await params;

  return <GraphDisplay config={getClientGraphConfig(client)} />;
}
