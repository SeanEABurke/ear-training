import * as Tone from "tone";
import { Modes } from "./Scales";

const chessToRhythm = {
  1: "16n",
  2: "16n",
  3: "8n",
  4: "8n",
  5: "4n",
  6: "4n",
  7: "2n",
  8: "2n",
};

const groupings = {
  rhythmsA: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: 1,
    6: 2,
    7: 3,
    8: 4,
  },
  rhythmsB: {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
  },
};

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

const synth = new Tone.Synth().toDestination();
let melodySequence = "";

export const playChessMusic = async (chessGame, mode) => {
  await Tone.start();

  Tone.Transport.stop();
  // const chessGame =
  //   "1. e4 d5 2. f3 dxe4 3. fxe4 Nc6 4. Nc3 Nf6 5. Bb5 Bg4 6. Nge2 Qd6 7. d3 a6 8. Ba4 O-O-O 9. Bf4 Qb4 10. Bxc6 bxc6 11. O-O e6 12. Bg5 h6 13. Bxf6 gxf6 14. Rxf6 Rd7 15. Qf1 Bh5 16. Rb1 Rg8 17. Nf4 Bg6 18. Nxg6 fxg6 19. a3 Qc5+ 20. Kh1 Qe5 21. Rxf8+ Rxf8 22. Qxf8+ Kb7 23. Na4 h5 24. Nc5+ 1-0";
  const chessMoves = chessNotationToArray(chessGame);
  console.log(chessMoves);

  const subarrays = [];

  // Iterate through the chessMoves array
  let index = 0;
  while (index < chessMoves.length) {
    // Get the number from the current move
    try {
      const currentNumber = parseInt(chessMoves[index].match(/\d+/)[0]);
      console.log(currentNumber);
      // Create a subarray with the next 'currentNumber' elements
      if (currentNumber !== 0) {
        const currentSubarray = chessMoves.slice(
          index,
          index + groupings.rhythmsA[currentNumber]
        );
        // Push the current subarray to the array of subarrays
        subarrays.push(currentSubarray);

        // Move the index to the next move after the current subarray
        index += groupings.rhythmsA[currentNumber] + 1;
      } else {
        index++;
      }
    } catch {
      console.log("Something was wrong");
      index++;
    }
  }

  console.log(subarrays);

  const filteredSubarrays = subarrays.map((subarray) =>
    subarray.map((note) =>
      note
        .split("")
        .filter((char) => /[a-z]/.test(char))
        .join("")
    )
  );

  console.log(filteredSubarrays);
  console.log(mode);

  const melody = filteredSubarrays.map((move) =>
    move.map((note) => Modes[mode][note[note.length - 1]])
  );
  console.log(melody);

  if (melodySequence) {
    melodySequence.stop();
    melodySequence.dispose();
  }

  // Create a sequence to play the melody
  melodySequence = new Tone.Sequence(
    (time, note) => {
      // Trigger the synth to play the note at the specified time
      synth.triggerAttackRelease(note, 1, time);
    },
    melody,
    0.7
  );

  // Start the Tone.js transport
  Tone.Transport.start();

  // Start the melody sequence
  melodySequence.start(0);

  //   Schedule a stop event after the duration of the melody
  const melodyDuration = melody.length * 0.7;
  Tone.Transport.scheduleOnce(() => {
    // Stop the Tone.js transport
    Tone.Transport.stop();
  }, `+${melodyDuration}`);
};

// Can't get this part to make sound
//     const filteredMelody = melodyWithDurations.filter(
//       (value) => )value.note && value.duration
//     );

//     console.log(filteredMelody);

//     Tone.Transport.start();
//     console.log("Transport state:", Tone.Transport.state);

//     const part = new Tone.Part((time, value) => {
//       console.log(value.note);
//       if (value && value.note && value.duration) {
//         synth.triggerAttackRelease(value.note, value.duration, time);
//         console.log(value.note);
//       } else {
//         console.error("Invalid value in melodyWithDurations:", value);
//       }
//     }, filteredMelody).start();

// const lowercaseMoves = subarrays.map((move) =>
//   move
//     .split("")
//     .filter((char) => /[a-z]/.test(char))
//     .join("")
// );

// const melody = lowercaseMoves.map(
//   (move) => chessToMusic[move.toLowerCase()]
// );
// console.log(melody);
// const numbers = chessMoves.map((move) =>
//   move
//     .split("")
//     .filter((char) => /[1-8]/.test(char))
//     .join("")
// );
// const rhythms = numbers.map((move) => chessToRhythm[move]);
// console.log(rhythms);

// const melodyWithDurations = melody.map((note, index) => ({
//   note,
//   duration: rhythms[index % rhythms.length],
// }));
// console.log(melodyWithDurations);
