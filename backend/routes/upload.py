from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from services.pdf_reader import (
    extract_text_from_pdf
)

from services.nlp import (
    extract_entities_and_relations
)

from services.graph import (
    save_graph,
    clear_graph
)


router = APIRouter()


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    try:

        # Extract text from PDF
        text = extract_text_from_pdf(
            file.file
        )


        # Validate PDF text
        if not text or len(text.strip()) == 0:

            return {
                "error":
                "No text found in PDF"
            }


        # Extract entities + relations
        entities, relations = (
            extract_entities_and_relations(
                text
            )
        )


        # Clear old graph
        clear_graph()


        # Save new graph
        save_graph(
            entities,
            relations
        )


        # Success response
        return {

            "message":
            "Upload successful 🚀",

            "total_entities":
            len(entities),

            "total_relations":
            len(relations),

            "entities":
            entities[:20],

            "relations":
            relations[:20]
        }


    except Exception as e:

        print(
            "UPLOAD ERROR:",
            str(e)
        )

        return {
            "error":
            str(e)
        }