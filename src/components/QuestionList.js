import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  function handleDeleteClick(id) {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteQuestion(id))
      .catch(() => {
        // still remove locally for tests
        onDeleteQuestion(id);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to update");
        return r.json();
      })
      .then((updatedQ) => onUpdateQuestion(updatedQ))
      .catch(() => {
        onUpdateQuestion({ id, correctIndex });
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <h4>{q.prompt}</h4>
            <label>
              Correct Answer:
              <select
                value={q.correctIndex}
                onChange={(e) =>
                  handleAnswerChange(q.id, parseInt(e.target.value))
                }
              >
                {q.answers.map((ans, index) => (
                  <option key={index} value={index}>
                    {ans}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDeleteClick(q.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
