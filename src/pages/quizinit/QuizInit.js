import React, { useState } from "react";
import { chordData, chordCats } from "../../services/Chords";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./QuizInit.css";
import CardHeader from "react-bootstrap/esm/CardHeader";

const QuizInit = () => {
  const [chords, setChords] = useState([]);
  const [sameRoot, setSameRoot] = useState(false);

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

  const handleLinkClick = (event) => {
    if (chords.length < 2) {
      event.preventDefault();
      alert("Please add at least 2 chords to start the quiz.");
      // You can also use a modal or any other UI element to show the error message
    }
    // You can add additional actions if needed
  };

  const handleToggleChange = () => {
    if (sameRoot) {
      setSameRoot(false);
    } else {
      setSameRoot(true);
    }
  };

  const stateData = {
    chords,
    sameRoot,
  };

  return (
    <div className="quiz-page">
      <h1>Quiz Setup</h1>
      <div className="toggler">
        <h4>{sameRoot ? "Same root" : "Random roots"}</h4>
        <div className="toggle-border">
          <input
            id="one"
            type="checkbox"
            checked={sameRoot}
            onChange={handleToggleChange}
          />
          <label htmlFor="one">
            <div className="handle"></div>
          </label>
        </div>
      </div>
      <Link to={`/quiz`} state={stateData} onClick={handleLinkClick}>
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
