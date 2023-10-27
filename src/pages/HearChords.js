import React from "react";
import {
  chordNames,
  makeChord,
  chordDictionary,
  chordSymbols,
} from "../services/Chords";

export default function HearChords() {
  return (
    <div className="container">
      <h1>Chords!!! Random Key</h1>
      {chordNames.map((chordName) => (
        <button
          key={chordName}
          onClick={() => makeChord(chordDictionary[chordName])}
          className="chord-btn"
        >
          {chordSymbols[chordName]}
        </button>
      ))}
      <h1>Chords!!! Same key</h1>
      {chordNames.map((chordName) => (
        <button
          key={chordName}
          onClick={() => makeChord(chordDictionary[chordName], 40)}
          className="chord-btn"
        >
          {chordSymbols[chordName]}
        </button>
      ))}
      {/* <h1>Chess Music</h1> */}
      {/* <button onClick={() => playChessMusic()}>Play Chess Music</button> */}
    </div>
  );
}
