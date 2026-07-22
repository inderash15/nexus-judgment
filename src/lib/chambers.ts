export type Chamber = {
  id: number;
  name: string;
  title: string;
  sigil: string;
  question: string;
  options: string[];
  answer: number;
  hint: string;
};

export const CHAMBERS: Chamber[] = [
  {
    id: 1,
    name: "Chamber of Logic",
    title: "The First Trial",
    sigil: "◈",
    question:
      "A sealed door bears three switches. Only one opens the passage; the others release the void. The Guardian tells you: 'The truthful switch is not the first, and not adjacent to the liar.' Which do you choose?",
    options: ["Switch I", "Switch II", "Switch III", "None — refuse the trial"],
    answer: 2,
    hint: "Position matters. Adjacency is the key.",
  },
  {
    id: 2,
    name: "Chamber of Cipher",
    title: "The Second Trial",
    sigil: "◊",
    question:
      "Etched on the wall: KHOOR ZRUOG. The Guardian whispers, 'The letters have drifted three steps forward in the alphabet.' What was the original phrase?",
    options: ["HELLO WORLD", "HEART WORTH", "HIDDEN WORDS", "HOLLOW WOUND"],
    answer: 0,
    hint: "Shift each letter three places back.",
  },
  {
    id: 3,
    name: "Chamber of Numbers",
    title: "The Third Trial",
    sigil: "△",
    question:
      "A sequence pulses on the floor: 2, 6, 12, 20, 30, ?. Complete the pattern to unseal the gate.",
    options: ["36", "40", "42", "44"],
    answer: 2,
    hint: "The difference between terms grows by two each step.",
  },
  {
    id: 4,
    name: "Chamber of Code",
    title: "The Fourth Trial",
    sigil: "⌘",
    question:
      "Which of these will run in O(log n) time for a sorted array of length n?",
    options: [
      "Bubble sort",
      "Binary search",
      "Linear scan",
      "Depth-first traversal",
    ],
    answer: 1,
    hint: "Halving the search space each step.",
  },
  {
    id: 5,
    name: "Chamber of Vision",
    title: "The Fifth Trial",
    sigil: "◉",
    question:
      "In machine sight, which technique lets a model attend to any position in a sequence in a single step?",
    options: [
      "Recurrent gating",
      "Convolutional stride",
      "Self-attention",
      "Pooling",
    ],
    answer: 2,
    hint: "It powers the modern transformer.",
  },
  {
    id: 6,
    name: "Chamber of Shadows",
    title: "The Sixth Trial",
    sigil: "☾",
    question:
      "The Guardian raises a shield: 'A breach relies on user input landing where it should not.' Which defense stops SQL injection at its root?",
    options: [
      "Client-side validation only",
      "Parameterized queries",
      "Hiding error messages",
      "Renaming the tables",
    ],
    answer: 1,
    hint: "The database must never see input as code.",
  },
  {
    id: 7,
    name: "Chamber of the Final Seal",
    title: "The Seventh Trial",
    sigil: "✦",
    question:
      "The Guardian steps aside. 'To join the Thirty, name the force that binds every trial you have passed.' What is the answer?",
    options: ["Speed", "Fear", "Curiosity", "Luck"],
    answer: 2,
    hint: "It is what brought you here.",
  },
];
