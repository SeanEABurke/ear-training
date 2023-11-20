import React, { useEffect, useState, useCallback } from "react";
import { playChessMusic, setup } from "../../services/ChessMusic";
import { Modes } from "../../services/Scales";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";

const Chess = () => {
  const [chessMoves, setChessMoves] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const handleChessMovesChange = (event) => {
    setChessMoves(event.target.value);
  };

  const handleModeChange = useCallback((mode) => {
    setSelectedMode(mode);
    console.log(mode);
  }, []);

  const handlePlayChessMusic = async () => {
    await playChessMusic(chessMoves, selectedMode);
  };

  return (
    <>
      <div>
        <button onClick={handlePlayChessMusic} className="chord-btn">
          Play
        </button>
        <input
          type="text"
          value={chessMoves}
          onChange={handleChessMovesChange}
        ></input>
      </div>
      <Card
        bg="dark"
        className="rounded chordCard"
        style={{ width: "18rem" }}
        key="modes"
      >
        <CardHeader className="quiz-header">
          <label className="container">
            <span className="text-decoration-underline ">Modes</span>
          </label>
        </CardHeader>
        {Object.keys(Modes).map((mode) => (
          <div key={mode}>
            <label className="container">
              <input
                type="checkbox"
                id={mode}
                value={mode}
                checked={mode === selectedMode}
                onChange={() => handleModeChange(mode)}
              />
              <div className="checkmark"></div>
              <span>{mode}</span>
            </label>
          </div>
        ))}
      </Card>
    </>
  );
};

export default Chess;
