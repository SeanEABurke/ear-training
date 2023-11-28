import * as Tone from "tone";
import { Modes } from "./Scales";
import { groupings } from "./Rhythms";

export const tempos = {
  slower: 1.5,
  slow: 1.1,
  medium: 0.8,
  fast: 0.5,
  faster: 0.3,
};

const synth = new Tone.Synth().toDestination();
let melodySequence = "";
let melodyPlayer1, melodyPlayer2;
let melodySequencePlayer1 = "",
  melodySequencePlayer2 = "";

export const playChessMusic = async (
  chessGame,
  mode,
  withRests,
  rhythm,
  tempo
) => {
  await Tone.start();

  Tone.Transport.stop();
  // const chessGame =
  //   "1. e4 d5 2. f3 dxe4 3. fxe4 Nc6 4. Nc3 Nf6 5. Bb5 Bg4 6. Nge2 Qd6 7. d3 a6 8. Ba4 O-O-O 9. Bf4 Qb4 10. Bxc6 bxc6 11. O-O e6 12. Bg5 h6 13. Bxf6 gxf6 14. Rxf6 Rd7 15. Qf1 Bh5 16. Rb1 Rg8 17. Nf4 Bg6 18. Nxg6 fxg6 19. a3 Qc5+ 20. Kh1 Qe5 21. Rxf8+ Rxf8 22. Qxf8+ Kb7 23. Na4 h5 24. Nc5+ 1-0";
  const chessMoves = chessNotationToArray(chessGame);
  console.log(chessMoves);

  const filteredSubarrays = chessMovesParsing(chessMoves, rhythm);

  console.log(filteredSubarrays);
  let melody;

  if (withRests) {
    melody = filteredSubarrays.map((move) =>
      move.map((note) =>
        note.includes("x") ? null : Modes[mode][note[note.length - 1]]
      )
    );
  } else {
    melody = filteredSubarrays.map((move) =>
      move.map((note) => Modes[mode][note[note.length - 1]])
    );
  }
  console.log(melody);

  clearAllSynths();

  // Create a sequence to play the melody
  melodySequence = new Tone.Sequence(
    (time, note) => {
      // Trigger the synth to play the note at the specified time
      synth.triggerAttackRelease(note, 1, time);
    },
    melody,
    tempos[tempo]
  );

  // Start the Tone.js transport
  Tone.Transport.start();

  // Start the melody sequence
  melodySequence.start(0);

  //   Schedule a stop event after the duration of the melody
  const melodyDuration = (melody.length - 1) * tempos[tempo];
  Tone.Transport.scheduleOnce(() => {
    // Stop the Tone.js transport
    Tone.Transport.stop();
  }, `+${melodyDuration}`);
};

export const playCounterpointChessMusic = async (
  chessGame,
  mode,
  withRests,
  rhythm,
  tempo
) => {
  await Tone.start();

  Tone.Transport.stop();

  const synthPlayer1 = new Tone.Synth().toDestination();
  const synthPlayer2 = new Tone.Synth().toDestination();

  const chessMoves = chessNotationToArray(chessGame);

  // const filteredSubarrays = chessMovesParsing(chessMoves, rhythm);

  // console.log(chessMoves);

  // Separate the moves into two arrays based on player
  const player1Moves = chessMoves.filter((element, index) => {
    return index % 2 === 0;
  });
  const player2Moves = chessMoves.filter((element, index) => {
    return index % 2 === 1;
  });

  console.log(player1Moves);

  // Get the rhythmic subarrays for each set of moves
  const filteredPlayer1Moves = chessMovesParsing(player1Moves, rhythm);
  const filteredPlayer2Moves = chessMovesParsing(player2Moves, rhythm);

  console.log(filteredPlayer1Moves);

  // Map both set of moves to their pitches
  if (withRests) {
    melodyPlayer1 = filteredPlayer1Moves.map((move) =>
      move.map((note) =>
        note.includes("x") ? null : Modes[mode][note[note.length - 1]]
      )
    );

    melodyPlayer2 = filteredPlayer2Moves.map((move) =>
      move.map((note) =>
        note.includes("x") ? null : Modes[mode][note[note.length - 1]]
      )
    );
  } else {
    melodyPlayer1 = filteredPlayer1Moves.map((move) =>
      move.map((note) => Modes[mode][note[note.length - 1]])
    );

    melodyPlayer2 = filteredPlayer2Moves.map((move) =>
      move.map((note) => Modes[mode][note[note.length - 1]])
    );
  }

  console.log(melodyPlayer1);
  console.log(melodyPlayer2);

  clearAllSynths();

  // Create two sequences to play the melodies for each player
  melodySequencePlayer1 = new Tone.Sequence(
    (time, note) => {
      synthPlayer1.triggerAttackRelease(note, 1, time);
    },
    melodyPlayer1,
    tempos[tempo]
  );

  melodySequencePlayer2 = new Tone.Sequence(
    (time, note) => {
      synthPlayer2.triggerAttackRelease(note, 1, time);
    },
    melodyPlayer2,
    tempos[tempo]
  );

  // Start the Tone.js transport
  Tone.Transport.start();

  // Start the melody sequences for each player
  melodySequencePlayer1.start(0);
  melodySequencePlayer2.start(0);

  // Schedule a stop event after the duration of the longer melody
  const melodyDuration = Math.max(
    melodyPlayer1.length * tempos[tempo],
    melodyPlayer2.length * tempos[tempo]
  );

  Tone.Transport.scheduleOnce(() => {
    // Stop the Tone.js transport
    Tone.Transport.stop();
  }, `+${melodyDuration}`);
};

// Turns the chess notation string into and array where each move is an element
function chessNotationToArray(chessGame) {
  // Step 1: Split the string based on spaces
  const movesArray = chessGame.split(/\s+/);

  // Step 2: Remove move numbers (numbers followed by a dot)
  const filteredMoves = movesArray.filter((move) => !/^\d+\./.test(move));

  // Step 3: Remove non-alphanumeric characters
  const cleanedMoves = filteredMoves.map((move) =>
    move.replace(/[^a-zA-Z1-9]/g, "")
  );

  return cleanedMoves;
}

function chessMovesParsing(chessMoves, rhythm) {
  const subarrays = [];

  // Iterate through the chessMoves array
  let index = 0;
  while (index < chessMoves.length) {
    // Get the number from the current move
    try {
      const currentNumber = parseInt(chessMoves[index].match(/\d+/)[0]);
      // console.log(currentNumber);
      // Create a subarray with the next 'currentNumber' elements
      if (currentNumber !== 0) {
        const currentSubarray = chessMoves.slice(
          index,
          index + groupings[rhythm][currentNumber]
        );
        // Push the current subarray to the array of subarrays
        subarrays.push(currentSubarray);

        // Move the index to the next move after the current subarray
        index += groupings[rhythm][currentNumber];
      } else {
        index++;
      }
    } catch {
      console.log("Something was wrong");
      index++;
    }
  }
  // console.log(subarrays);

  const filteredSubarrays = subarrays.map((subarray) =>
    subarray.map((note) =>
      note
        .split("")
        .filter((char) => /[a-z]/.test(char))
        .join("")
    )
  );
  return filteredSubarrays;
}

// Dispose of old melodic sequences before creating new ones
function clearAllSynths() {
  if (melodySequencePlayer1) {
    melodySequencePlayer1.stop();
    melodySequencePlayer1.dispose();
  }

  if (melodySequencePlayer2) {
    melodySequencePlayer2.stop();
    melodySequencePlayer2.dispose();
  }

  if (melodySequence) {
    melodySequence.stop();
    melodySequence.dispose();
  }
}
