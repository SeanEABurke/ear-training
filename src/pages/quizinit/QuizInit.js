import React, { useState } from "react";
import { chordSymbols } from "../../services/Chords";
import { Link } from "react-router-dom";
import "./QuizInit.css";

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
    console.log(chords);
  };

  return (
    <div className="page">
      <div className="columns">
        {Object.keys(chordSymbols).map((chord) => (
          <div key={chord} className="column">
            <label class="container">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(chord)}
                checked={chords.includes(chord)}
              />
              <div class="checkmark"></div>
              <span>{chordSymbols[chord]}</span>
            </label>
          </div>
        ))}
      </div>
      <Link to={`/quiz`} state={chords}>
        <button className="chord-btn" id="start-btn">
          Start Quiz!
        </button>
      </Link>
    </div>
  );
};

export default QuizInit;
