// import * as Tone from "tone";

// // Define an initial note (starting position)
// let currentNote = "C4"; // Starting note

// // Create a Tone.js synth
// const synth = new Tone.Synth().toDestination();
// // Define a mapping of chess moves to musical intervals
// const chessToMusic = {
//   e4: 0,
//   c5: 3,
//   Nf3: 4,
//   Nc6: 3,
//   c3: -1,
//   d6: 2, // Move pawn to d6 (up a whole step)
//   // Add more mappings as needed
// };
// // Function to play a note based on chess move
// function playNoteFromChessMove(chessMove) {
//   const interval = chessToMusic[chessMove];
//   if (interval !== undefined) {
//     // Calculate the new note based on the interval
//     currentNote = Tone.Frequency(currentNote).transpose(interval);
//     // Play the note
//     synth.triggerAttackRelease(currentNote, "4n");
//   }
// }
// export function playChessMusic() {
//   const chessMoves = ["e4", "c5", "Nf3", "Nc6", "c3", "d6", "g6", "Bc5"];
//   let time = 0;
//   chessMoves.forEach((move) => {
//     playNoteFromChessMove(move);
//   });
// }
