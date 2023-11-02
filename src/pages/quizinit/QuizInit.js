import React, { useState } from "react";
import { chordData, chordCats } from "../../services/Chords";
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
      const allSelected = chordCats[cat].names.every((chord) =>
        prevChords.includes(chord)
      );

      // If all chords are selected, unselect them
      if (allSelected) {
        return prevChords.filter((c) => !chordCats[cat].names.includes(c));
      }
      // If not all chords are selected, select them
      else {
        return [...prevChords, ...chordCats[cat].names];
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
            className="rounded chordCard"
            style={{ width: "18rem" }}
            key={cat}
          >
            <CardHeader className="quiz-header">
              <label className="container">
                <input
                  type="checkbox"
                  onChange={() => handleCatCheckboxChange(cat)}
                  checked={chordCats[cat].names.every((chord) =>
                    chords.includes(chord)
                  )}
                />
                <div className="checkmark"></div>
                <span className="text-decoration-underline ">
                  {chordCats[cat].label}
                </span>
              </label>
            </CardHeader>
            {chordCats[cat].names.map((chord) => (
              <div key={chord}>
                console.log(chord);
                <label className="container">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(chord)}
                    checked={chords.includes(chord)}
                  />
                  <div className="checkmark"></div>
                  <span>{chordData[chord].symbol}</span>
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
