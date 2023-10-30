import * as Tone from "tone";

// const synth = new Tone.PolySynth().toDestination();
const reverb = new Tone.Reverb(2).toDestination();
export const chordDictionary = {
  major: [-12, 4, 7],
  minor: [-12, 3, 7],
  dominant: [-12, 4, 7, 10],
  diminished: [-12, 3, 6],
  augmented: [-12, 4, 8],
  major6: [-12, 4, 7, 9],
  major7: [-12, 4, 7, 11],
  major2: [-12, 2, 4, 7],
  major6_9: [-12, 4, 7, 9, 14],
  major7_s5: [-12, 4, 8, 11],
  major9: [-12, 4, 7, 11, 14],
  major9_s11: [-12, 4, 11, 14, 18],
  major13: [-12, 4, 11, 14, 18, 21],
  major9_s5: [-12, 4, 8, 11, 14],
  major7_s9_s11: [-12, 4, 11, 15, 18],
};
export const chordSymbols = {
  major: "Major",
  minor: "Minor",
  dominant: "Dominant",
  diminished: "Diminished",
  augmented: "Augmented",
  major6: "Major 6",
  major7: "Major 7",
  major2: "Major add 2",
  major6_9: "Major 6/9",
  major7_s5: "Major 7 #5",
  major9: "Major 9",
  major9_s11: "Major #11",
  major13: "Major 13",
  major9_s5: "Major 9 #5",
  major7_s9_s11: "Major 7 #9 #11",
};
export const chordNames = Object.keys(chordDictionary);

export const chordCats = {
  triads: ["major", "minor", "diminished", "augmented", "dominant"],
  major_four_note: ["major6", "major7", "major2", "major7_s5"],
  major_extensions: [
    "major6_9",
    "major9",
    "major9_s11",
    "major9_s5",
    "major13",
    "major7_s9_s11",
  ],
};

export const chordCatsStrings = {
  triads: "Triads",
  major_four_note: "Major 4-note",
  major_extensions: "Major Extensions",
};

export function makeChord(intervals, root = null) {
  Tone.start().then(() => {
    // The audio context is now started, you can play sounds here
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        // Get a random root note within the specified octave range
        const rootMidi =
          root !== null ? root : Math.floor(Math.random() * 12) + 35;
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
