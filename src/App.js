import "./App.css";
import * as Tone from "tone";

// const synth = new Tone.PolySynth().toDestination();
const reverb = new Tone.Reverb(2).toDestination();

function getRandomRoot() {
  // Choose a random note name (e.g., "C", "D", "E", etc.)
  const noteNames = ["C", "D", "E", "F", "G", "A", "B"];
  const randomNoteName =
    noteNames[Math.floor(Math.random() * noteNames.length)];

  // Combine the note name and octave to create the random root note
  return randomNoteName + 2;
}

function playSynth() {
  const sampler = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => {
      // Get a random root note within the specified octave range
      const rootMidi = Math.floor(Math.random() * 12) + 40; // Random MIDI note number within an octave range
      // Define the intervals for a major chord using MIDI note numbers
      const intervals = [0, 4, 7, 11, 14];

      // Create an array to store the chord notes as MIDI note numbers
      const chord = [];

      // Build the chord based on MIDI note numbers
      intervals.forEach((interval) => {
        const noteMidi = rootMidi + interval;
        chord.push(Tone.Frequency(noteMidi, "midi").toNote());
      });
      console.log(chord);
      sampler.triggerAttackRelease(chord, 2);
    },
  }).toDestination();

  // Connect the sampler to the reverb
  sampler.connect(reverb);
}

function App() {
  return (
    <div id="wrapper">
      <button id="button" onClick={playSynth}>
        Click me
      </button>
    </div>
  );
}

export default App;
