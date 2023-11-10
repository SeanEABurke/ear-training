import React, { useEffect } from "react";
import { playChessMusic, setup } from "../../services/ChessMusic";

const Chess = () => {
  return (
    <div>
      <button onClick={playChessMusic} className="chord-btn">
        Play
      </button>
    </div>
  );
};

export default Chess;
