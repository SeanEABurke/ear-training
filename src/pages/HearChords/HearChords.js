import React, { useState } from "react";
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
  const [sameRoot, setSameRoot] = useState(false);

  const handleToggleChange = () => {
    if (sameRoot) {
      setSameRoot(false);
    } else {
      setSameRoot(true);
    }
  };

  return (
    <div className="chord-page">
      <h1>Hear the Chords</h1> <br />
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
      <div className="chord-container">
        {Object.keys(chordCats).map((cat) => (
          <ChordList key={cat} chordCat={cat} sameKey={sameRoot} />
        ))}
      </div>
      {/* <h1>Chords!!! Same key</h1> <br />
      <div className="chord-container">
        {Object.keys(chordCats).map((cat) => (
          <ChordList key={cat} chordCat={cat} sameKey={true} />
        ))}
      </div> */}
      {/* <h1>Chess Music</h1> */}
      {/* <button onClick={() => playChessMusic()}>Play Chess Music</button> */}
    </div>
  );
}
