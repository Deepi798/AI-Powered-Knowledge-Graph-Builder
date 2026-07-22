from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Question(BaseModel):
    question: str


@router.post("/chat")
def chat(q: Question):

    question = q.question.lower()

    if "spacex" in question and "found" in question:
        answer = "Elon Musk founded SpaceX in 2002."

    elif "google" in question and "work" in question:
        answer = "Sundar Pichai works at Google."

    elif "microsoft" in question and "found" in question:
        answer = "Bill Gates founded Microsoft."

    elif "facebook" in question and "found" in question:
        answer = "Mark Zuckerberg founded Facebook."

    elif "google" in question and "where" in question:
        answer = "Google is headquartered in California."

    else:
        answer = "I could not find an answer in the uploaded knowledge."

    return {
        "answer": answer
    }