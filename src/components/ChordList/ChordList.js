import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import React from "react";
import {
  chordNames,
  makeChord,
  chordDictionary,
  chordSymbols,
  chordCats,
  chordCatsStrings,
} from "../../services/Chords";

function ChordList({ chordCat, sameKey }) {
  return (
    <Card bg="dark" className="rounded" style={{ width: "18rem" }}>
      <Card.Header className="text-white text-center h4">
        {chordCatsStrings[chordCat]}
      </Card.Header>
      <ButtonGroup className="d-flex flex-column align-items-center">
        {chordCats[chordCat].map((chordName) => (
          <button
            key={chordName}
            onClick={() => {
              if (sameKey) {
                makeChord(chordDictionary[chordName], 40);
              } else {
                makeChord(chordDictionary[chordName]);
              }
            }}
            className="chord-btn"
          >
            {chordSymbols[chordName]}
          </button>
        ))}
      </ButtonGroup>
    </Card>
  );
}

export default ChordList;
