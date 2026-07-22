from neo4j import GraphDatabase


# Neo4j Connection
URI = "bolt://localhost:7687"

USERNAME = "neo4j"

PASSWORD = "Deepika@2005"


driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD)
)


# Clear old graph
def clear_graph():

    with driver.session() as session:

        session.run(
            "MATCH (n) DETACH DELETE n"
        )



# Save graph data
def save_graph(
    entities,
    relations
):

    with driver.session() as session:


        # Save nodes
        for entity in entities:

            try:

                session.run(
                    """
                    MERGE (e:Entity {
                        name: $name
                    })
                    """,

                    name=entity["text"]
                )

            except Exception as e:

                print(
                    "Node save error:",
                    e
                )


        # Save relationships
        for rel in relations:

            try:

                session.run(
                    """
                    MATCH (a:Entity {
                        name: $source
                    })

                    MATCH (b:Entity {
                        name: $target
                    })

                    MERGE (a)-[:RELATED_TO]->(b)
                    """,

                    source=rel["source"],
                    target=rel["target"]
                )

            except Exception as e:

                print(
                    "Relation save error:",
                    e
                )