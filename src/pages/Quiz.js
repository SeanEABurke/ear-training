import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  chordNames,
  makeChord,
  chordDictionary,
  chordSymbols,
} from "../services/Chords";

const Quiz = (props) => {
  const { state } = useLocation();
  //   const { score, setScore } = useState();
  const [index, setIndex] = useState(0);
  const [selectedChords, setSelectedChords] = useState([]);
  const [roots, setRoots] = useState([]);

  useEffect(() => {
    const generateSelectedChords = () => {
      const chords = [];
      while (chords.length < 20) {
        const chord = state[Math.floor(Math.random() * state.length)];
        chords.push(chord);
      }
      setSelectedChords(chords);
    };

    const generateRoots = () => {
      const rootNotes = [];
      while (rootNotes.length < 20) {
        rootNotes.push(Math.floor(Math.random() * 12) + 35);
      }
      setRoots(rootNotes);
    };

    generateSelectedChords();
    generateRoots();
  }, []);

  console.log(selectedChords);
  console.log(index);

  const answerBtn = (chordName) => {
    if (chordName === selectedChords[index]) {
      window.confirm("Correct");
      setIndex(index + 1);
    } else {
      window.confirm("Wrong, try again");
    }
  };

  return (
    <>
      <div>
        <h1>Round {index + 1}:</h1>
        <button
          key={index}
          onClick={() =>
            makeChord(chordDictionary[selectedChords[index]], roots[index])
          }
          className="chord-btn"
        >
          Play
        </button>
      </div>
      <div>
        <h1>Make your guess:</h1>
        {state.map((chordName) => (
          <button
            key={chordName}
            onClick={() => answerBtn(chordName)}
            className="chord-btn"
          >
            {chordSymbols[chordName]}
          </button>
        ))}
      </div>
    </>
  );
};

export default Quiz;
