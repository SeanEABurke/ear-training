import React, { useState } from "react";
import { chordSymbols } from "../services/Chords";
import { Link } from "react-router-dom";

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
    <div>
      {Object.keys(chordSymbols).map((chord) => (
        <div key={chord}>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(chord)}
              checked={chords.includes(chord)}
            />
            {chordSymbols[chord]}
          </label>
        </div>
      ))}
      <Link to={`/quiz`} state={chords}>
        <button>Start Quiz!</button>
      </Link>
    </div>
  );
};

export default QuizInit;
