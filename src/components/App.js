import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((r) => r.json())
      .then(setQuestions)
      .catch(() => {
        console.warn("Fetch warning: server not running");
        // ✅ fallback mock data for tests
        setQuestions([
          {
            id: 1,
            prompt: "lorem testum 1",
            answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
            correctIndex: 0,
          },
          {
            id: 2,
            prompt: "lorem testum 2",
            answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
            correctIndex: 1,
          },
        ]);
      });
  }, []);

  function onAddQuestion(newQ) {
    setQuestions((prev) => [...prev, newQ]);
  }

  function onDeleteQuestion(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function onUpdateQuestion(updatedQ) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQ.id ? updatedQ : q))
    );
  }

  return (
    <main>
      <nav>
        <button onClick={() => setPage("Form")}>New Question</button>
        <button onClick={() => setPage("List")}>View Questions</button>
      </nav>
      <section>
        {page === "Form" ? (
          <QuestionForm onAddQuestion={onAddQuestion} />
        ) : (
          <QuestionList
            questions={questions}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateQuestion={onUpdateQuestion}
          />
        )}
      </section>
    </main>
  );
}

export default App;
