import { GraphDisplay } from "@/components/graph/graph-display";
import { getClientGraphConfig } from "@/lib/client-graphs";

export default function DemoPage() {
  return <GraphDisplay config={getClientGraphConfig("demo")} />;
}
