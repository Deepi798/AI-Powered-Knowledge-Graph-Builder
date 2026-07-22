import React, { useState } from "react";

function Chatbot() {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);


  const askQuestion = async () => {

    if (!question.trim()) {

      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            question: question
          })

        }
      );

      const data =
        await response.json();


      setMessages(
        [
          ...messages,

          {
            role: "You",
            text: question
          },

          {
            role: "AI",
            text: data.answer
          }

        ]
      );

      setQuestion("");

    } catch (error) {

      console.error(error);

      alert(
        "Chat backend not reachable"
      );

    }
  };


  return (

    <div className="card">

      <h2>
        AI Assistant
      </h2>


      <input

        type="text"

        value={question}

        placeholder=
          "Ask a question..."

        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }

      />


      <button
        onClick={askQuestion}
      >

        Ask

      </button>


      <div
        style={{
          marginTop: "20px"
        }}
      >

        {messages.map(
          (msg, index) => (

            <p key={index}>

              <strong>
                {msg.role}:
              </strong>

              {" "}

              {msg.text}

            </p>

          )
        )}

      </div>

    </div>
  );
}

export default Chatbot;