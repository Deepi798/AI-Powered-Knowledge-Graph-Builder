import spacy

nlp = spacy.load("en_core_web_sm")


def extract_entities_and_relations(text):

    doc = nlp(text)

    entities = []
    relations = []


    # Extract entities
    for ent in doc.ents:

        entities.append({
            "text": ent.text,
            "label": ent.label_
        })


    # Create simple relationships
    for i in range(len(entities) - 1):

        relations.append({

            "source":
            entities[i]["text"],

            "target":
            entities[i + 1]["text"],

            "relation":
            "RELATED_TO"
        })


    return entities, relations