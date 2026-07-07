import { GraphDisplay } from "@/components/graph/graph-display";
import { getClientGraphConfig } from "@/lib/client-graphs";

export default function HomePage() {
  return <GraphDisplay config={getClientGraphConfig("demo")} />;
}
