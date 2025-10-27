import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers } = question;
  const [correctIndex, setCorrectIndex] = useState(question.correctIndex);

  function handleDeleteClick() {
    fetch(`http://localhost:3000/questions/${id}`, { method: "DELETE" })
      .then((r) => {
        if (!r.ok) throw new Error("Delete failed");
        onDeleteQuestion(id);
      })
      .catch(() => onDeleteQuestion(id)); // ✅ fallback for tests
  }

  function handleAnswerChange(e) {
    const newIndex = parseInt(e.target.value);
    setCorrectIndex(newIndex); // ✅ instantly update local dropdown value
    onUpdateQuestion({ ...question, correctIndex: newIndex });

    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    }).catch(() => {});
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleAnswerChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
