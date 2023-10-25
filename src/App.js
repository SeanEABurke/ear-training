import "./App.css";
import React from "react";
import { chordNames, makeChord, chordDictionary, chordSymbols } from "./chords";
import { playChessMusic } from "./chessMusic";

function App() {
  return (
    <div className="container">
      <h1>Chords!!! Random Key</h1>
      {chordNames.map((chordName) => (
        <button
          key={chordName}
          onClick={() => makeChord(chordDictionary[chordName])}
        >
          {chordSymbols[chordName]}
        </button>
      ))}
      <h1>Chords!!! Same key</h1>
      {chordNames.map((chordName) => (
        <button
          key={chordName}
          onClick={() => makeChord(chordDictionary[chordName], 40)}
        >
          {chordSymbols[chordName]}
        </button>
      ))}
      <h1>Chess Music</h1>
      {/* <button onClick={() => playChessMusic()}>Play Chess Music</button> */}
    </div>
  );
}

export default App;
