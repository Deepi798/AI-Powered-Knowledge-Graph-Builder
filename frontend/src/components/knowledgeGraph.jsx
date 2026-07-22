import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

function KnowledgeGraph({ graphElements = [] }) {

  // Remove invalid nodes/edges
  const validElements = graphElements.filter((el) => {
    if (!el || !el.data) return false;

    // Node
    if (el.data.id) return true;

    // Edge
    if (el.data.source && el.data.target) return true;

    return false;
  });

  console.log("Graph Elements:", validElements);

  const layout = {
    name: "preset",
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
  };

  const stylesheet = [
    {
      selector: "node",
      style: {
        "background-color": "#3b82f6",
        label: "data(label)",
        color: "#ffffff",
        "font-size": "13px",
        "text-valign": "center",
        "text-halign": "center",
        width: "60px",
        height: "60px",
      },
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#475569",
        "target-arrow-color": "#475569",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        label: "data(label)",
        "font-size": "11px",
        color: "#94a3b8",
      },
    },
  ];

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "8px",
      }}
    >
      <h2>Live Knowledge Graph View</h2>

      <p style={{ color: "#10b981" }}>
        ✔ Elements loaded dynamically from Neo4j
      </p>

      <div
        style={{
          border: "2px solid #334155",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#0f172a",
        }}
      >
        {validElements.length > 0 ? (
          <CytoscapeComponent
  elements={validElements}
  layout={{ name: "grid" }}
  stylesheet={stylesheet}
  style={{ width: "100%", height: "550px" }}
/>
        ) : (
          <div
            style={{
              height: "550px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#94a3b8",
            }}
          >
            No graph data available. Upload documents first.
          </div>
        )}
      </div>
    </div>
  );
}

export default KnowledgeGraph;