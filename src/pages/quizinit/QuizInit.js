import React, { useState } from "react";
import {
  chordSymbols,
  chordCats,
  chordCatsStrings,
} from "../../services/Chords";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./QuizInit.css";
import CardHeader from "react-bootstrap/esm/CardHeader";

const QuizInit = () => {
  const [chords, setChords] = useState([]);

  const handleCheckboxChange = (chord) => {
    setChords((prevChords) => {
      if (prevChords.includes(chord)) {
        return prevChords.filter((c) => c !== chord);
      } else {
        return [...prevChords, chord];
      }
    });
  };

  const handleCatCheckboxChange = (cat) => {
    setChords((prevChords) => {
      // Check if all chords in the category are currently selected
      const allSelected = chordCats[cat].every((chord) =>
        prevChords.includes(chord)
      );

      // If all chords are selected, unselect them
      if (allSelected) {
        return prevChords.filter((c) => !chordCats[cat].includes(c));
      }
      // If not all chords are selected, select them
      else {
        return [...prevChords, ...chordCats[cat]];
      }
    });
  };

  return (
    <div className="quiz-page">
      <h1>Quiz Setup</h1>
      <Link to={`/quiz`} state={chords}>
        <button className="chord-btn" id="start-btn">
          Start Quiz!
        </button>
      </Link>
      <div className="columns">
        {Object.keys(chordCats).map((cat) => (
          <Card
            bg="dark"
            className="rounded"
            style={{ width: "18rem" }}
            key={cat}
          >
            <CardHeader className="quiz-header">
              <label className="container">
                <input
                  type="checkbox"
                  onChange={() => handleCatCheckboxChange(cat)}
                  checked={chordCats[cat].every((chord) =>
                    chords.includes(chord)
                  )}
                />
                <div className="checkmark"></div>
                <span className="text-decoration-underline ">
                  {chordCatsStrings[cat]}
                </span>
              </label>
            </CardHeader>
            {chordCats[cat].map((chord) => (
              <div key={chord}>
                console.log(chord);
                <label className="container">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(chord)}
                    checked={chords.includes(chord)}
                  />
                  <div className="checkmark"></div>
                  <span>{chordSymbols[chord]}</span>
                </label>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizInit;
