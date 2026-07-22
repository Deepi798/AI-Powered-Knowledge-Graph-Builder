from fastapi import APIRouter
from services.graph import driver

# 1. Define the router instance first
router = APIRouter()

# 2. Graph data endpoint
@router.get("/graph")
def get_graph():
    query = """
    MATCH (a)-[r]->(b)
    RETURN
    a.name AS source,
    b.name AS target,
    type(r) AS relationship
    """

    elements = []
    added_nodes = set()

    with driver.session() as session:
        results = session.run(query)

        for record in results:
            source = record["source"]
            target = record["target"]
            relationship = record["relationship"]

            # Add source node
            if source not in added_nodes:
                elements.append({
                    "data": {
                        "id": source,
                        "label": source
                    }
                })
                added_nodes.add(source)

            # Add target node
            if target not in added_nodes:
                elements.append({
                    "data": {
                        "id": target,
                        "label": target
                    }
                })
                added_nodes.add(target)

            # Add relationship edge
            elements.append({
                "data": {
                    "source": source,
                    "target": target,
                    "label": relationship
                }
            })

    return {"elements": elements}


# 3. Live Analytics endpoint
@router.get("/analytics")
def get_analytics():
    count_query = "MATCH (n) RETURN count(n) as total_nodes"
    rel_query = "MATCH ()-[r]->() RETURN count(r) as total_rels"
    
    top_node_query = """
    MATCH (n)
    RETURN n.name as name, count(*) as connections
    ORDER BY connections DESC
    LIMIT 1
    """
    
    with driver.session() as session:
        nodes_result = session.run(count_query).single()
        rels_result = session.run(rel_query).single()
        top_result = session.run(top_node_query).single()
        
        total_entities = nodes_result["total_nodes"] if nodes_result else 0
        total_relationships = rels_result["total_rels"] if rels_result else 0
        top_connected = top_result["name"] if top_result else "None"
        
    return {
        "total_entities": total_entities,
        "total_relationships": total_relationships,
        "top_connected_node": top_connected
    }