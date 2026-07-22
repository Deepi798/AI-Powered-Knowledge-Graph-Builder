# AI-Powered Knowledge Graph Builder

## Project Description
The AI-Powered Knowledge Graph Builder is a full-stack web application designed to process unstructured text documents and transform them into interactive Knowledge Graphs. It extracts key entities and their relationships using natural language processing and visualizes them dynamically, allowing users to explore structured connections within their data.

---

## Key Features
* Document Ingestion: Allows users to upload plain text and documents for entity extraction.
* Automatic Graph Generation: Extracts relationships and entities from text to build connected knowledge nodes.
* Dynamic Visualizations: Displays interactive node-and-edge network graphs using Cytoscape.js.
* Graph Database Integration: Stores graph structures and relationships efficiently in a Neo4j database.
* Full-Stack API Architecture: Connects a React user interface with a FastAPI backend.

---

## Tech Stack
* Frontend: React.js, Cytoscape.js, CSS3
* Backend: Python, FastAPI, Uvicorn
* Database: Neo4j
* Language Processing: Python NLP libraries and embeddings

---

## Repository Structure
* backend/ - Contains FastAPI routes, NLP processing scripts, and database utility modules.
* frontend/ - Contains React source code, user interface components, and styling.
* database/ - Holds graph database configuration and schema setups.

---

## Getting Started

### Prerequisites
* Node.js (v16 or higher)
* Python (v3.10 or higher)
* Neo4j Database (Local or AuraDB)

---

### Backend Setup

1. Navigate to the backend directory:
   cd backend

2. Activate your virtual environment:
   # Windows PowerShell:
   ..\.venv\Scripts\Activate.ps1

3. Install required Python packages:
   pip install -r requirements.txt

4. Run the backend server:
   uvicorn main:app --reload --port 8000

---

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Run the development server:
   npm start

4. Open http://localhost:3000 in your browser to view the application.