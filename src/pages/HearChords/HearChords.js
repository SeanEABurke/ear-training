import React from "react";
import {
  chordNames,
  makeChord,
  chordDictionary,
  chordSymbols,
  chordCats,
} from "../../services/Chords";
import "./HearChords.css";
import ChordList from "../../components/ChordList/ChordList";

export default function HearChords() {
  return (
    <div className="chord-page">
      <h1>Chords!!! Random Key </h1> <br />
      <div className="chord-container">
        {Object.keys(chordCats).map((cat) => (
          <ChordList key={cat} chordCat={cat} sameKey={false} />
        ))}
      </div>
      <h1>Chords!!! Same key</h1> <br />
      <div className="chord-container">
        {Object.keys(chordCats).map((cat) => (
          <ChordList key={cat} chordCat={cat} sameKey={true} />
        ))}
      </div>
      {/* <h1>Chess Music</h1> */}
      {/* <button onClick={() => playChessMusic()}>Play Chess Music</button> */}
    </div>
  );
}
