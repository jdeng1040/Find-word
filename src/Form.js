import React, { useState } from "react";
import "./App.css";

function Form() {
  const [inputText, setInputText] = useState("");
  const [wordToHighlight, setWordToHighlight] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  const handleWordInputChange = (e) => {
    const word = e.target.value.trim();
    setWordToHighlight(word);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(inputText)) {
      document.getElementById("outputText").innerHTML = highlightSpecificWord(
        inputText,
        wordToHighlight
      );
      setError("");
    } else {
      setError(
        "Input exceeds 200 words limit. Make sure to type under 200 words!"
      );
    }
  };

  const validateInput = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length <= 200;
  };

  const highlightSpecificWord = (text, word) => {
    return text.replace(
      new RegExp(word, "g"),
      '<span class="highlighted">$&</span>'
    );
  };

  const wordCount = inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter a word to highlight"
            value={wordToHighlight}
            onChange={handleWordInputChange}
          />
        </div>
        <div>
          <textarea
            id="inputText"
            placeholder="Enter up to 200 words"
            value={inputText}
            onChange={handleChange}
            rows="7"
          />
        </div>
        <p id="word-count">Word Count: {wordCount}/200</p>
        <button type="submit">Submit</button>
      </form>
      <div className="output">
        <h2>Output:</h2>
        {error ? <p className="error">{error}</p> : <p id="outputText"></p>}
      </div>
    </div>
  );
}

export default Form;
