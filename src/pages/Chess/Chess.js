import React, { useEffect, useState, useCallback } from "react";
import {
  playChessMusic,
  tempos,
  playCounterpointChessMusic,
} from "../../services/ChessMusic";
import { groupings } from "../../services/Rhythms";
import { Modes } from "../../services/Scales";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "./Chess.css";

const Chess = () => {
  const [chessMoves, setChessMoves] = useState(
    "1. e4 d5 2. f3 dxe4 3. fxe4 Nc6 4. Nc3 Nf6 5. Bb5 Bg4 6. Nge2 Qd6 7. d3 a6 8. Ba4 O-O-O 9. Bf4 Qb4 10. Bxc6 bxc6 11. O-O e6 12. Bg5 h6 13. Bxf6 gxf6 14. Rxf6 Rd7 15. Qf1 Bh5 16. Rb1 Rg8 17. Nf4 Bg6 18. Nxg6 fxg6 19. a3 Qc5+ 20. Kh1 Qe5 21. Rxf8+ Rxf8 22. Qxf8+ Kb7 23. Na4 h5 24. Nc5+ 1-0"
  );
  const [selectedMode, setSelectedMode] = useState("major");
  const [withRests, setWithRests] = useState(true);
  const [selectedRhythm, setSelectedRhythm] = useState("rhythmsA");
  const [selectedTempo, setSelectedTempo] = useState("medium");

  const handleChessMovesChange = (event) => {
    setChessMoves(event.target.value);
  };

  const handleModeChange = useCallback((mode) => {
    setSelectedMode(mode);
    console.log(mode);
  }, []);

  const handleRhythmChange = useCallback((grouping) => {
    setSelectedRhythm(grouping);
  }, []);

  const handleTempoChange = useCallback((tempo) => {
    setSelectedTempo(tempo);
  }, []);

  const handleToggleChange = () => {
    if (withRests) {
      setWithRests(false);
    } else {
      setWithRests(true);
    }
  };

  const handlePlayChessMusic = async () => {
    await playChessMusic(
      chessMoves,
      selectedMode,
      withRests,
      selectedRhythm,
      selectedTempo
    );
  };

  const handlePlayCounterpointChessMusic = async () => {
    await playCounterpointChessMusic(
      chessMoves,
      selectedMode,
      withRests,
      selectedRhythm,
      selectedTempo
    );
  };

  return (
    <div className="chess-page">
      <div>
        <button onClick={handlePlayChessMusic} className="chord-btn">
          Play
        </button>
        <button
          onClick={handlePlayCounterpointChessMusic}
          className="chord-btn"
        >
          Play In Counterpoint
        </button>
      </div>
      <textarea
        type="text"
        className="moves-input"
        value={chessMoves}
        onChange={handleChessMovesChange}
      ></textarea>

      <div className="toggler">
        <h4>{withRests ? "With Rests" : "No Rests"}</h4>
        <div className="toggle-border">
          <input
            id="one"
            type="checkbox"
            checked={withRests}
            onChange={handleToggleChange}
          />
          <label htmlFor="one">
            <div className="handle"></div>
          </label>
        </div>
      </div>
      <div className="columns">
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
        <Card
          bg="dark"
          className="rounded chordCard"
          style={{ width: "18rem" }}
          key="rhythms"
        >
          <CardHeader className="quiz-header">
            <label className="container">
              <span className="text-decoration-underline ">Rhythms</span>
            </label>
          </CardHeader>
          {Object.keys(groupings).map((grouping) => (
            <div key={grouping}>
              <label className="container">
                <input
                  type="checkbox"
                  id={grouping}
                  value={grouping}
                  checked={grouping === selectedRhythm}
                  onChange={() => handleRhythmChange(grouping)}
                />
                <div className="checkmark"></div>
                <span>{grouping}</span>
              </label>
            </div>
          ))}
        </Card>
        <Card
          bg="dark"
          className="rounded chordCard"
          style={{ width: "18rem" }}
          key="tempos"
        >
          <CardHeader className="quiz-header">
            <label className="container">
              <span className="text-decoration-underline ">Tempo</span>
            </label>
          </CardHeader>
          {Object.keys(tempos).map((tempo) => (
            <div key={tempo}>
              <label className="container">
                <input
                  type="checkbox"
                  id={tempo}
                  value={tempo}
                  checked={tempo === selectedTempo}
                  onChange={() => handleTempoChange(tempo)}
                />
                <div className="checkmark"></div>
                <span>{tempo}</span>
              </label>
            </div>
          ))}
        </Card>
      </div>
      <div className="explanations">
        <p>
          With Rests: When on, any capture is a rest. If it's off then those
          notes are played
        </p>
        <p>
          Rhythms A-C: Different mappings between quarter, triplet, eighth, and
          sixteenth notes
        </p>
        <p>Rhythms D: Includes same as A-C but also adds sextuplets</p>
        <p>Rhythms E: Includes quarter, eithth, triplet and sextuplets</p>
        <p>Rhythms F: Includes quarter, eithth, triplets and quintuplets</p>
        <p>Rhythms G: Only quarter notes and triplets</p>
        <p>Rhythms H: Quarter notes, eigther notes and sixteenth notes</p>
      </div>
    </div>
  );
};

export default Chess;
