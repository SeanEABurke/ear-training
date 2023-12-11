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

const pianoSampler = new Tone.Sampler({
  urls: {
    A1: "A1.mp3",
    A2: "A2.mp3",
    A3: "A3.mp3",
    A4: "A4.mp3",
    A5: "A5.mp3",
  },

  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

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

  const chessMoves = chessNotationToArray(chessGame);

  const filteredSubarrays = chessMovesParsing(chessMoves, rhythm);

  // console.log(filteredSubarrays);
  let melody;

  if (withRests) {
    melody = filteredSubarrays.map((move) =>
      move.map((note) => {
        const mappedNote = note.includes("x")
          ? null
          : Modes[mode][note[note.length - 1]];
        return mappedNote !== undefined ? mappedNote : null;
      })
    );
  } else {
    melody = filteredSubarrays.map((move) =>
      move.map((note) => {
        const mappedNote = Modes[mode][note[note.length - 1]];
        return mappedNote !== undefined ? mappedNote : null;
      })
    );
  }

  // // Map the array to replace undefined with null
  // const melody2 = melody.map((move) =>
  //   move.map((note) => (note === undefined ? null : note))
  // );
  clearSequences();
  clearAllSynths();

  // Create a sequence to play the melody
  melodySequence = new Tone.Sequence(
    (time, note) => {
      // Trigger the synth to play the note at the specified time
      pianoSampler.triggerAttackRelease(note, 1, time);
    },
    melody,
    tempos[tempo]
  );

  // Start the Tone.js transport
  Tone.Transport.start();

  // Start the melody sequence
  melodySequence.start(0);

  // Schedule a stop event after the number of steps in the sequence
  Tone.Transport.scheduleOnce(() => {
    // Stop the Tone.js transport
    Tone.Transport.stop();
  }, `+${melody.length * tempos[tempo]}`);
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

  const synthPlayer1 = pianoSampler;
  const synthPlayer2 = pianoSampler;

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

  // console.log(player1Moves);

  // Get the rhythmic subarrays for each set of moves
  const filteredPlayer1Moves = chessMovesParsing(player1Moves, rhythm);
  const filteredPlayer2Moves = chessMovesParsing(player2Moves, rhythm);

  // console.log(filteredPlayer1Moves);

  clearSequences();

  // Map both set of moves to their pitches
  if (withRests) {
    melodyPlayer1 = filteredPlayer1Moves.map((move) =>
      move.map((note) => {
        const mappedNote = note.includes("x")
          ? null
          : Modes[mode][note[note.length - 1]];
        return mappedNote !== undefined ? mappedNote : null;
      })
    );
    melodyPlayer2 = filteredPlayer2Moves.map((move) =>
      move.map((note) => {
        const mappedNote = note.includes("x")
          ? null
          : Modes[mode][note[note.length - 1]];
        return mappedNote !== undefined ? mappedNote : null;
      })
    );
  } else {
    melodyPlayer1 = filteredPlayer1Moves.map((move) =>
      move.map((note) => {
        const mappedNote = Modes[mode][note[note.length - 1]];
        return mappedNote !== undefined ? mappedNote : null;
      })
    );

    melodyPlayer2 = filteredPlayer2Moves.map((move) =>
      move.map((note) => {
        const mappedNote = Modes[mode][note[note.length - 1]];
        return mappedNote !== undefined ? mappedNote : null;
      })
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
function clearSequences() {
  if (melodySequence) {
    melodySequence.dispose();
  }
  if (melodySequencePlayer1) {
    melodySequencePlayer1.dispose();
  }
  if (melodySequencePlayer2) {
    melodySequencePlayer2.dispose();
  }
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
