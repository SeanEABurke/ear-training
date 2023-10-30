import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  makeChord,
  chordDictionary,
  chordSymbols,
} from "../../services/Chords";
import "./Quiz.css";
import { Link } from "react-router-dom";

const Quiz = (props) => {
  const { state } = useLocation();
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [selectedChords, setSelectedChords] = useState([]);
  const [roots, setRoots] = useState([]);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(new Date().getTime());

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
  }, [uniqueKey]);

  console.log(selectedChords);
  console.log(index);

  const answerBtn = (chordName) => {
    if (chordName === selectedChords[index]) {
      if (!showIncorrectMessage) {
        setScore(score + 1);
      }
      setShowIncorrectMessage(false);
      setShowCorrectMessage(true);
      setIndex(index + 1);
    } else {
      setShowIncorrectMessage(true);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
  };

  return (
    <div className="page">
      {index < 10 ? (
        <>
          <h1>Round {index + 1}:</h1>
          <button
            key={index}
            onClick={() => {
              makeChord(chordDictionary[selectedChords[index]], roots[index]);
              setShowCorrectMessage(false);
            }}
            className="chord-btn"
          >
            Play
          </button>

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
            {/* Correct Answer Message */}
            {showCorrectMessage && (
              <div className="message">
                <h1>You got it right!</h1>
              </div>
            )}

            {/* Incorrect Answer Message */}
            {showIncorrectMessage && (
              <div className="message">
                <h1>Wrong, try again!</h1>
              </div>
            )}
            <div className="score">
              <h2>Score: {score}</h2>
            </div>
          </div>
        </>
      ) : (
        <div className="quiz-over">
          <h1>
            Final Score: {score} out of {index}
          </h1>

          <button
            className="chord-btn"
            id="start-btn"
            onClick={() => {
              resetQuiz();
              // Re-run the useEffect logic by setting a unique key
              setUniqueKey(new Date().getTime());
            }}
          >
            Retry These Chords!
          </button>

          <Link to={`/quizinit`}>
            <button className="chord-btn" id="start-btn">
              Make New Quiz!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Quiz;
