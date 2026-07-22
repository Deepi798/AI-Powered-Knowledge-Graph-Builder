import React, { useState, useEffect } from "react";
import GraphView from "./components/GraphView";
import KnowledgeGraph from "./components/knowledgeGraph"; 

// import KnowledgeGraphPage from "./components/KnowledgeGraphPage"; 
// import AnalyticsPage from "./components/AnalyticsPage"; 

function App() {
  const [currentTab, setCurrentTab] = useState("documents");
  const [graphElements, setGraphElements] = useState([]);
  const [analytics, setAnalytics] = useState({
    total_entities: 0,
    total_relationships: 0,
    top_connected_node: "None",
  });

  // Global function to pull fresh data from Neo4j backend
  const refreshProjectData = async () => {
  try {
    const graphRes = await fetch("http://localhost:8000/graph");
    const graphData = await graphRes.json();

    console.log("Raw Graph Data:", graphData);

    const elements = Array.isArray(graphData.elements)
      ? graphData.elements
      : [];

    // Separate nodes
    const nodes = elements.filter(
      (el) => el?.data?.id
    );

    const nodeIds = new Set(
      nodes.map((n) => n.data.id)
    );

    // Keep only valid edges
    const edges = elements.filter(
      (el) =>
        el?.data?.source &&
        el?.data?.target &&
        nodeIds.has(el.data.source) &&
        nodeIds.has(el.data.target)
    );

    setGraphElements([...nodes, ...edges]);

    const analyticsRes = await fetch(
      "http://localhost:8000/analytics"
    );
    const analyticsData = await analyticsRes.json();

    setAnalytics({
      total_entities: analyticsData.total_entities || 0,
      total_relationships:
        analyticsData.total_relationships || 0,
      top_connected_node:
        analyticsData.top_connected_node || "None",
    });
  } catch (error) {
    console.error("Error refreshing data:", error);
    setGraphElements([]);
  }
};

  // Load database status once on initial launch
  useEffect(() => {
    refreshProjectData();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff" }}>
      
      {/* Sidebar Navigation Panel */}
      <div style={{ width: "250px", background: "#1e293b", padding: "20px" }}>
        <h3>GraphAI</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li 
            onClick={() => setCurrentTab("documents")} 
            style={{ padding: "10px", cursor: "pointer", background: currentTab === "documents" ? "#334155" : "transparent" }}
          >
             <h2>Documents</h2>
          </li>
          <li 
            onClick={() => setCurrentTab("graph")} 
            style={{ padding: "10px", cursor: "pointer", background: currentTab === "graph" ? "#334155" : "transparent" }}
          >
             <h2>Knowledge Graph</h2>
          </li>
          <li 
            onClick={() => setCurrentTab("analytics")} 
            style={{ padding: "10px", cursor: "pointer", background: currentTab === "analytics" ? "#334155" : "transparent" }}
          >
            <h2>Analytics</h2>
          </li>
        </ul>
      </div>

      {/* Main Feature Screen Switching Area */}
      <div style={{ flex: 1, padding: "40px" }}>
        {currentTab === "documents" && (
          <GraphView onUploadSuccess={refreshProjectData} />
        )}

        {currentTab === "graph" && (
  <KnowledgeGraph graphElements={graphElements} />
  )}

        {currentTab === "analytics" && (
          <div>
            <h2>Analytics Dashboard</h2>
            <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px" }}>
              <p><strong>Total Entities:</strong> {analytics.total_entities}</p>
              <p><strong>Total Relationships:</strong> {analytics.total_relationships}</p>
              <p><strong>Top Connected Node:</strong> <span style={{ color: "#10b981" }}>{analytics.top_connected_node}</span></p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;