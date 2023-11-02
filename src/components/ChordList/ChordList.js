import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import React from "react";
import {
  chordNames,
  makeChord,
  chordData,
  chordCats,
} from "../../services/Chords";

function ChordList({ chordCat, sameKey }) {
  return (
    <Card bg="dark" className="rounded chordCard" style={{ width: "18rem" }}>
      <Card.Header className="text-white text-center h4">
        {chordCats[chordCat].label}
      </Card.Header>
      <ButtonGroup className="d-flex flex-column align-items-center">
        {chordCats[chordCat].names.map((chordName) => (
          <button
            key={chordName}
            onClick={() => {
              if (sameKey) {
                makeChord(chordData[chordName].intervals, 40);
              } else {
                makeChord(chordData[chordName].intervals);
              }
            }}
            className="chord-btn"
          >
            {chordData[chordName].symbol}
          </button>
        ))}
      </ButtonGroup>
    </Card>
  );
}

export default ChordList;
