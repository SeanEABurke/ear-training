import * as Tone from "tone";

// Define a mapping of chess moves to musical intervals
const chessToMusic = {
  a: "A4",
  b: "B4",
  c: "C4",
  d: "D4",
  e: "E4",
  f: "F4",
  g: "G4",
  h: "G3",
};

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

function chessNotationToArray(chessGame) {
  // Step 1: Split the string based on spaces
  const movesArray = chessGame.split(/\s+/);

  // Step 2: Remove move numbers (numbers followed by a dot)
  const filteredMoves = movesArray.filter((move) => !/^\d+\./.test(move));

  // Step 3: Remove non-alphanumeric characters
  const cleanedMoves = filteredMoves.map((move) =>
    move.replace(/[^a-zA-Z0-9]/g, "")
  );

  return cleanedMoves;
}

const synth = new Tone.Synth().toDestination();

export function playChessMusic() {
  Tone.start().then(() => {
    const chessGame =
      "1. e4 c6 2. d4 d5 3. Nc3 e6 4. f4 Nd7 5. e5 f6 6. Bd3 Bb4 7. Qh5+ Kf8 8. Ne2 Ne7 9. O-O f5 10. Ng3 g6 11. Qh6+ Kf7 12. Nce2 Ng8 13. Qh3 Be7 14. c4 h5 15. cxd5 cxd5 16. Nc3 a6 17. Be2 b5 18. Kh1 Nb6 19. b3 Qc7 20. Bd2 Bd7 21. Nxh5 gxh5 22. Bxh5+ Kf8 23. g4 Be8 24. Qf3 b4 25. Bxe8 bxc3 26. Rac1 Rxe8 27. Rxc3 Qa7 28. gxf5 exf5 29. Rc6 Nd7 30. Qxd5";
    const chessMoves = chessNotationToArray(chessGame);
    console.log(chessMoves);
    const lowercaseMoves = chessMoves.map((move) =>
      move
        .split("")
        .filter((char) => /[a-z]/.test(char))
        .join("")
    );

    const melody = lowercaseMoves.map(
      (move) => chessToMusic[move.toLowerCase()]
    );
    console.log(melody);
    const numbers = chessMoves.map((move) =>
      move
        .split("")
        .filter((char) => /[1-8]/.test(char))
        .join("")
    );
    const rhythms = numbers.map((move) => chessToRhythm[move]);
    console.log(rhythms);

    const melodyWithDurations = melody.map((note, index) => ({
      note,
      duration: rhythms[index % rhythms.length],
    }));
    console.log(melodyWithDurations);

    // Can't get this part to make sound
    //     const filteredMelody = melodyWithDurations.filter(
    //       (value) => value.note && value.duration
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

    // Create a sequence to play the melody
    const melodySequence = new Tone.Sequence(
      (time, { note, duration }) => {
        // Trigger the synth to play the note at the specified time
        synth.triggerAttackRelease(note, duration, time);
      },
      melodyWithDurations.map(({ note, duration }) => ({ note, duration }))
    );

    // Start the Tone.js transport
    Tone.Transport.start();

    // Start the melody sequence
    melodySequence.start(Tone.now());

    //   Schedule a stop event after the duration of the melody
    const melodyDuration = melodyWithDurations.reduce(
      (totalDuration, { duration }) =>
        totalDuration + Tone.Time(duration).toSeconds(),
      0
    );
    Tone.Transport.scheduleOnce(() => {
      // Stop the Tone.js transport
      Tone.Transport.stop();
    }, `+${melodyDuration}`);
  });
}
