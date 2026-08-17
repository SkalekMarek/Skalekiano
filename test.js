const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const CHORD_DICT = {
  "0,4,7": "",
  "0,3,7": "m",
  "0,3,6": "dim",
  "0,4,8": "aug",
  "0,4,7,10": "7",
  "0,4,7,11": "maj7",
  "0,3,7,10": "m7",
  "0,3,6,10": "m7b5",
  "0,3,6,9": "dim7",
  "0,2,7": "sus2",
  "0,5,7": "sus4",
  "0,4,7,14": "add9",
  "0,3,7,14": "m(add9)",
  "0,4,7,9": "6",
  "0,3,7,9": "m6"
};

function testChord(midiNotes) {
  const active = midiNotes.sort((a,b) => a - b);
  if (active.length < 2) return "";
  
  let bestMatch = "";
  for (let i = 0; i < active.length; i++) {
    const rootMidi = active[i];
    const rootName = NOTES[rootMidi % 12];
    
    const intervals = [];
    active.forEach(midi => {
      let diff = (midi - rootMidi) % 12;
      if (diff < 0) diff += 12;
      if (!intervals.includes(diff)) intervals.push(diff);
    });
    intervals.sort((a,b) => a - b);
    
    const pattern = intervals.join(',');
    if (CHORD_DICT[pattern] !== undefined) {
      let chordName = rootName + CHORD_DICT[pattern];
      if (active[0] % 12 !== rootMidi % 12) {
          chordName += "/" + NOTES[active[0] % 12];
      }
      bestMatch = chordName;
      break;
    }
  }
  return bestMatch;
}

console.log("A, C, E ->", testChord([57, 60, 64]));
console.log("C, E, G ->", testChord([60, 64, 67]));
