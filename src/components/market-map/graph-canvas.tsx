"use client";

import { Line, OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";

import { PositionedVentureNode, VentureEdge } from "@/types/venture";

interface GraphCanvasProps {
  nodes: PositionedVentureNode[];
  edges: VentureEdge[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string | null) => void;
}

function DriftingNode({
  node,
  isSelected,
  isHovered,
  onSelectNode,
  onHover,
}: {
  node: PositionedVentureNode;
  isSelected: boolean;
  isHovered: boolean;
  onSelectNode: (nodeId: string | null) => void;
  onHover: (nodeId: string | null) => void;
}) {
  const groupRef = useRef<Group>(null);
  const offset = node.position[0] * 0.37 + node.position[1] * 0.22;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * 0.22 + offset;
    groupRef.current.position.set(
      node.position[0] + Math.sin(t) * 0.18,
      node.position[1] + Math.cos(t * 1.2) * 0.14,
      node.position[2] + Math.sin(t * 0.85) * 0.12,
    );
  });

  const scale = isSelected ? 1.4 : isHovered ? 1.18 : 1;

  return (
    <group ref={groupRef} position={node.position}>
      <mesh
        scale={scale}
        onClick={() => onSelectNode(node.id)}
        onPointerOver={() => onHover(node.id)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[node.radius, 28, 28]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isSelected ? 1.1 : isHovered ? 0.78 : 0.34}
          roughness={0.12}
          metalness={0.82}
        />
      </mesh>
      {(isSelected || isHovered || node.type === "sector") && (
        <Text
          position={[0, node.radius + 1.4, 0]}
          color={isSelected ? "#f8fafc" : "#cbd5e1"}
          fontSize={node.type === "sector" ? 1.15 : 0.8}
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
        >
          {node.name}
        </Text>
      )}
    </group>
  );
}

function GraphScene({ nodes, edges, selectedNodeId, onSelectNode }: GraphCanvasProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  return (
    <>
      <color attach="background" args={["#03070b"]} />
      <fog attach="fog" args={["#03070b", 20, 55]} />
      <ambientLight intensity={0.75} />
      <pointLight position={[18, 20, 12]} intensity={75} color="#6dfcf1" />
      <pointLight position={[-18, -12, -10]} intensity={45} color="#ffb747" />
      <pointLight position={[0, 0, 22]} intensity={30} color="#f87171" />
      <Stars radius={65} depth={34} count={1700} factor={3.5} fade speed={0.55} />

      {edges.map((edge, index) => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target) return null;

        const active = selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId);

        return (
          <Line
            key={edge.id}
            points={[source.position, target.position]}
            color={active ? "#b8fff8" : index % 4 === 0 ? "#ffb747" : "#355161"}
            transparent
            opacity={active ? 0.95 : index % 4 === 0 ? 0.34 : 0.24}
            lineWidth={active ? 2.5 : Math.max(0.6, edge.strength * 1.3)}
            dashed={!active && index % 3 === 0}
            dashScale={12}
            gapSize={0.55}
            dashSize={0.95}
          />
        );
      })}

      {nodes.map((node) => (
        <DriftingNode
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          isHovered={hoveredNodeId === node.id}
          onSelectNode={onSelectNode}
          onHover={setHoveredNodeId}
        />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        maxDistance={50}
        minDistance={10}
        autoRotate
        autoRotateSpeed={0.28}
      />
    </>
  );
}

export function GraphCanvas(props: GraphCanvasProps) {
  return (
    <div className="hud-panel relative h-full min-h-[620px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(109,252,241,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,183,71,0.08),transparent_26%)]" />
      <div className="pointer-events-none absolute left-4 top-4 z-10 border border-[rgba(109,252,241,0.16)] bg-[rgba(2,8,12,0.8)] px-3 py-2">
        <p className="hud-label">Graph Status</p>
        <p className="mt-1 text-xs text-slate-300">Animated fictional venture network</p>
      </div>
      <Canvas camera={{ position: [0, 10, 28], fov: 48 }}>
        <GraphScene {...props} />
      </Canvas>
    </div>
  );
}
