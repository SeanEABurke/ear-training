import * as Tone from "tone";

// const synth = new Tone.PolySynth().toDestination();
const reverb = new Tone.Reverb(2).toDestination();
export const chordData = {
  major: {
    intervals: [-12, 4, 7],
    symbol: "Major",
  },
  minor: {
    intervals: [-12, 3, 7],
    symbol: "Minor",
  },
  dominant: {
    intervals: [-12, 4, 7, 10],
    symbol: "Dominant",
  },
  diminished: {
    intervals: [-12, 3, 6],
    symbol: "Diminished",
  },
  augmented: {
    intervals: [-12, 4, 8],
    symbol: "Augmented",
  },
  major6: {
    intervals: [-12, 4, 7, 9],
    symbol: "Major 6",
  },
  major7: {
    intervals: [-12, 4, 7, 11],
    symbol: "Major 7",
  },
  major2: {
    intervals: [-12, 2, 4, 7],
    symbol: "Major add 2",
  },
  major6_9: {
    intervals: [-12, 4, 7, 9, 14],
    symbol: "Major 6/9",
  },
  major7_s5: {
    intervals: [-12, 4, 8, 11],
    symbol: "Major 7 #5",
  },
  major9: {
    intervals: [-12, 4, 7, 11, 14],
    symbol: "Major 9",
  },
  major9_s11: {
    intervals: [-12, 4, 11, 14, 18],
    symbol: "Major #11",
  },
  major13: {
    intervals: [-12, 4, 11, 14, 18, 21],
    symbol: "Major 13",
  },
  major9_s5: {
    intervals: [-12, 4, 8, 11, 14],
    symbol: "Major 9 #5",
  },
  major7_s9_s11: {
    intervals: [-12, 4, 11, 15, 18],
    symbol: "Major 7 #9 #11",
  },
  sus4: {
    intervals: [-12, 5, 7, 12],
    symbol: "Sus 4",
  },
  sus2: { intervals: [-12, 2, 7, 12], symbol: "Sus 2" },
  sus7: { intervals: [-12, 5, 7, 10], symbol: "7 Sus" },
  susb9: { intervals: [-12, 1, 5, 7], symbol: "Sus b9" },
  sus9: { intervals: [-12, 5, 7, 10, 14], symbol: "9 Sus" },
  sus13_b9: { intervals: [-12, 10, 13, 17, 21], symbol: "13 Sus b9" },
  sus13: { intervals: [-12, 5, 7, 9, 10, 14], symbol: "13 Sus" },
  susadd10: { intervals: [-12, 5, 7, 16], symbol: "Sus add 10" },
  sus7_add10: { intervals: [-12, 5, 7, 10, 16], symbol: "7 Sus add 10" },
  sus7_addm10: { intervals: [-12, 5, 7, 10, 15], symbol: "7 Sus add m 10" },
  minor6: { intervals: [-12, 3, 7, 9], symbol: "Minor 6" },
  minorb6: { intervals: [-12, 3, 7, 8], symbol: "Minor b6" },
  minor7: { intervals: [-12, 3, 7, 10], symbol: "Minor 7" },
  minormaj7: { intervals: [-12, 3, 7, 11], symbol: "Minor maj7" },
  minor9: { intervals: [-12, 3, 7, 10, 14], symbol: "Minor 9" },
  minor11: { intervals: [-12, 3, 10, 14, 17], symbol: "Minor 11" },
  minor13: { intervals: [-12, 3, 10, 17, 21], symbol: "Minor 13" },
  minormaj9: { intervals: [-12, 3, 7, 11, 14], symbol: "Minor maj9" },
  minormaj7_add6: { intervals: [-12, 3, 9, 11], symbol: "Minor maj7 add 6" },
  dom9: { intervals: [-12, 4, 7, 10, 14], symbol: "9" },
  dom13: { intervals: [-12, 4, 7, 10, 14, 21], symbol: "13" },
  dom_s11: { intervals: [-12, 4, 10, 14, 18], symbol: "#11" },
  dom13_s11: { intervals: [-12, 4, 10, 14, 18, 21], symbol: "13 #11" },
  dom13_b9: { intervals: [-12, 4, 10, 13, 16, 21], symbol: "13 b9" },
  domb9: { intervals: [-12, 4, 7, 10, 13], symbol: "b9" },
  doms9: { intervals: [-12, 4, 7, 10, 15], symbol: "#9" },
  doms5: { intervals: [-12, 4, 8, 10, 15], symbol: "#5" },
  doms9_s5: { intervals: [-12, 4, 10, 12, 15, 20], symbol: "#5 #9" },
  doms5_b9: { intervals: [-12, 4, 10, 13, 16, 20], symbol: "#5 b9" },
  doms5_9: { intervals: [-12, 4, 8, 10, 14], symbol: "#5 9" },
  doms5_s11: { intervals: [-12, 4, 8, 10, 18], symbol: "#5 #11" },
  doms11_b9: { intervals: [-12, 4, 10, 13, 18], symbol: "#11 b9" },
  m7b5: { intervals: [-12, 3, 6, 10], symbol: "Minor 7 b5" },
  m9b5: { intervals: [-12, 3, 6, 10, 14], symbol: "Minor 9 b5" },
  m11b5: { intervals: [-12, 3, 6, 10, 14, 17], symbol: "Minor 11 b5" },
  dim: { intervals: [-12, 3, 6], symbol: "Dim" },
  dim7: { intervals: [-12, 3, 6, 9], symbol: "Dim 7" },
  dim_maj7: { intervals: [-12, 3, 6, 11], symbol: "Dim maj7" },
  dim7_maj9: { intervals: [-12, 3, 6, 9, 14], symbol: "Dim7 maj9" },
};

export const chordCats = {
  triads: {
    names: ["major", "minor", "diminished", "augmented", "dominant"],
    label: "Triads",
  },
  major_four_note: {
    names: ["major6", "major7", "major2", "major7_s5"],
    label: "Major 4-note",
  },
  major_extensions: {
    names: [
      "major6_9",
      "major9",
      "major9_s11",
      "major9_s5",
      "major13",
      "major7_s9_s11",
    ],
    label: "Major Extensions",
  },
  minor_four_note: {
    names: ["minor6", "minorb6", "minor7", "minormaj7"],
    label: "Minor 4-note",
  },
  minor_extensions: {
    names: ["minor9", "minor11", "minor13"],
    label: "Minor 7 Extensions",
  },
  minor_maj7: {
    names: ["minormaj7", "minormaj9", "minormaj7_add6"],
    label: "Minor maj 7",
  },
  dominant: {
    names: [
      "dominant",
      "domb9",
      "dom9",
      "dom_s11",
      "dom13",
      "dom13_s11",
      "dom13_b9",
    ],
    label: "Dominant",
  },
  dominant_alt: {
    names: [
      "doms9",
      "doms5",
      "doms9_s5",
      "doms5_b9",
      "doms5_9",
      "doms5_s11",
      "doms11_b9",
    ],
    label: "Dominant Altered",
  },
  sus_four_note: {
    names: ["sus4", "sus2", "sus7", "susb9"],
    label: "Sus 4-note",
  },
  sus_extensions: {
    names: [
      "sus9",
      "sus13",
      "sus13_b9",
      "susadd10",
      "sus7_add10",
      "sus7_addm10",
    ],
    label: "Sus Extensions",
  },
  diminished: {
    names: ["dim", "dim7", "dim_maj7", "dim7_maj9"],
    label: "Diminished",
  },
  half_diminished: {
    names: ["m7b5", "m9b5", "m11b5"],
    label: "Half diminished",
  },
};

export function makeChord(intervals, root = null) {
  Tone.start().then(() => {
    // The audio context is now started, you can play sounds here
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
        A3: "A3.mp3",
        A4: "A4.mp3",
        A5: "A5.mp3",
      },

      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        // Get a random root note within the specified octave range
        const rootMidi =
          root !== null ? root : Math.floor(Math.random() * 12) + 39;
        const chord = [];

        // Build the chord based on MIDI note numbers
        intervals.forEach((interval) => {
          const noteMidi = rootMidi + interval + 12;
          chord.push(Tone.Frequency(noteMidi, "midi").toNote());
        });
        console.log(chord);
        sampler.triggerAttackRelease(chord, 2);
      },
    }).toDestination();

    // Connect the sampler to the reverb
    sampler.connect(reverb);
  });
}

// export const chordDictionary = {
//   major: [-12, 4, 7],
//   minor: [-12, 3, 7],
//   dominant: [-12, 4, 7, 10],
//   diminished: [-12, 3, 6],
//   augmented: [-12, 4, 8],
//   major6: [-12, 4, 7, 9],
//   major7: [-12, 4, 7, 11],
//   major2: [-12, 2, 4, 7],
//   major6_9: [-12, 4, 7, 9, 14],
//   major7_s5: [-12, 4, 8, 11],
//   major9: [-12, 4, 7, 11, 14],
//   major9_s11: [-12, 4, 11, 14, 18],
//   major13: [-12, 4, 11, 14, 18, 21],
//   major9_s5: [-12, 4, 8, 11, 14],
//   major7_s9_s11: [-12, 4, 11, 15, 18],
// };
// export const chordSymbols = {
//   major: "Major",
//   minor: "Minor",
//   dominant: "Dominant",
//   diminished: "Diminished",
//   augmented: "Augmented",
//   major6: "Major 6",
//   major7: "Major 7",
//   major2: "Major add 2",
//   major6_9: "Major 6/9",
//   major7_s5: "Major 7 #5",
//   major9: "Major 9",
//   major9_s11: "Major #11",
//   major13: "Major 13",
//   major9_s5: "Major 9 #5",
//   major7_s9_s11: "Major 7 #9 #11",
// };
// export const chordNames = Object.keys(chordDictionary);
// export const chordCats = {
//   triads: ["major", "minor", "diminished", "augmented", "dominant"],
//   major_four_note: ["major6", "major7", "major2", "major7_s5"],
//   major_extensions: [
//     "major6_9",
//     "major9",
//     "major9_s11",
//     "major9_s5",
//     "major13",
//     "major7_s9_s11",
//   ],
// };

// export const chordCatsStrings = {
//   triads: "Triads",
//   major_four_note: "Major 4-note",
//   major_extensions: "Major Extensions",
// };
