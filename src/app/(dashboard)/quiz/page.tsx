"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ChevronRight,
  Zap,
  Trophy,
  Brain,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

/* ─── Question Bank (Mock AI) ─── */
interface Question {
  id: number;
  topic: string;
  difficulty: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questionBank: Question[] = [
  { id: 1, topic: "percentage", difficulty: "Easy", question: "If a number is increased by 20% and then decreased by 20%, the net change is:", options: ["No change", "4% decrease", "4% increase", "2% decrease"], correctIndex: 1, explanation: "Let the number be 100. After 20% increase = 120. After 20% decrease of 120 = 120 × 0.8 = 96. Net change = (96-100)/100 = -4%. So 4% decrease." },
  { id: 2, topic: "percentage", difficulty: "Medium", question: "A shopkeeper marks his goods 30% above cost price and gives a 10% discount. His profit percentage is:", options: ["17%", "20%", "15%", "18%"], correctIndex: 0, explanation: "Let CP = 100. MP = 130. After 10% discount, SP = 130 × 0.9 = 117. Profit = 17%." },
  { id: 3, topic: "percentage", difficulty: "Hard", question: "If the price of sugar rises by 25%, by how much percent must a family reduce consumption to maintain expenditure?", options: ["25%", "20%", "15%", "30%"], correctIndex: 1, explanation: "Reduction = (25/125) × 100 = 20%. Using formula: r/(100+r) × 100 = 25/125 × 100 = 20%." },
  { id: 4, topic: "number-systems", difficulty: "Easy", question: "The HCF of 12, 18, and 24 is:", options: ["6", "4", "8", "12"], correctIndex: 0, explanation: "12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. HCF = 2¹ × 3¹ = 6." },
  { id: 5, topic: "number-systems", difficulty: "Medium", question: "What is the remainder when 2^100 is divided by 3?", options: ["0", "1", "2", "Cannot determine"], correctIndex: 1, explanation: "2¹ mod 3 = 2, 2² mod 3 = 1, 2³ mod 3 = 2, 2⁴ mod 3 = 1. Pattern repeats with period 2. Since 100 is even, 2^100 mod 3 = 1." },
  { id: 6, topic: "profit-loss", difficulty: "Easy", question: "An article bought for ₹500 is sold for ₹600. The profit percentage is:", options: ["10%", "15%", "20%", "25%"], correctIndex: 2, explanation: "Profit = 600 - 500 = 100. Profit% = (100/500) × 100 = 20%." },
  { id: 7, topic: "profit-loss", difficulty: "Medium", question: "A man sells two articles for ₹99 each. On one he gains 10% and on the other he loses 10%. His net gain/loss is:", options: ["1% loss", "1% gain", "No profit no loss", "2% loss"], correctIndex: 0, explanation: "When SP is same and profit% = loss%, there's always a loss. Loss% = (10/10)² = 1% loss." },
  { id: 8, topic: "time-work", difficulty: "Easy", question: "A can do a work in 10 days and B can do it in 15 days. In how many days can they do it together?", options: ["5 days", "6 days", "7 days", "8 days"], correctIndex: 1, explanation: "A's rate = 1/10, B's rate = 1/15. Combined = 1/10 + 1/15 = 5/30 = 1/6. Together = 6 days." },
  { id: 9, topic: "time-speed", difficulty: "Medium", question: "A train 150m long passes a pole in 15 seconds. What is its speed in km/hr?", options: ["36 km/hr", "54 km/hr", "10 km/hr", "72 km/hr"], correctIndex: 0, explanation: "Speed = 150/15 = 10 m/s = 10 × (18/5) = 36 km/hr." },
  { id: 10, topic: "probability", difficulty: "Easy", question: "A coin is tossed 3 times. What is the probability of getting at least one head?", options: ["7/8", "3/8", "1/2", "5/8"], correctIndex: 0, explanation: "P(at least 1 head) = 1 - P(no heads) = 1 - (1/2)³ = 1 - 1/8 = 7/8." },
  { id: 11, topic: "blood-relations", difficulty: "Easy", question: "Pointing to a photo, Arun said 'He is the son of the only son of my grandfather.' Who is the person in photo?", options: ["Father", "Brother", "Cousin", "Uncle"], correctIndex: 1, explanation: "Only son of grandfather = Arun's father. Son of Arun's father = Arun or his brother. Since Arun says 'He', it's his brother." },
  { id: 12, topic: "coding-decoding", difficulty: "Medium", question: "If COMPUTER is coded as DPNQVUFS, then MACHINE is coded as:", options: ["NBDIJOF", "NBJDIJOF", "NBDIJOE", "OBDIJOF"], correctIndex: 0, explanation: "Each letter is shifted by +1. M→N, A→B, C→D, H→I, I→J, N→O, E→F. MACHINE → NBDIJOF." },
  { id: 13, topic: "average", difficulty: "Easy", question: "The average of 5 numbers is 20. If one number is removed, the average becomes 15. What is the removed number?", options: ["40", "35", "30", "25"], correctIndex: 0, explanation: "Sum of 5 numbers = 100. Sum of 4 numbers = 60. Removed number = 100 - 60 = 40." },
  { id: 14, topic: "ratio-proportion", difficulty: "Medium", question: "If A:B = 2:3 and B:C = 4:5, then A:B:C is:", options: ["8:12:15", "2:3:5", "4:6:15", "8:12:10"], correctIndex: 0, explanation: "Make B common: A:B = 2:3 = 8:12, B:C = 4:5 = 12:15. So A:B:C = 8:12:15." },
  { id: 15, topic: "reading-comp", difficulty: "Easy", question: "The primary purpose of a topic sentence in a paragraph is to:", options: ["Summarize the conclusion", "State the main idea", "Provide an example", "Create suspense"], correctIndex: 1, explanation: "A topic sentence introduces the main idea or claim of a paragraph, guiding the reader about what follows." },
  { id: 16, topic: "data-structures", difficulty: "Easy", question: "Which data structure follows the LIFO principle?", options: ["Queue", "Stack", "Tree", "Graph"], correctIndex: 1, explanation: "Stack follows Last-In-First-Out (LIFO) where the last element added is the first one to be removed." },
  { id: 17, topic: "data-structures", difficulty: "Medium", question: "What is the worst-case time complexity of searching in a Binary Search Tree (BST)?", options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"], correctIndex: 2, explanation: "In a skewed BST (where every node has only right or left child), it behaves like a linked list. So worst case is O(n)." },
  { id: 18, topic: "algorithms", difficulty: "Medium", question: "Which of the following sorting algorithms has the best average-case time complexity?", options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"], correctIndex: 3, explanation: "Merge Sort has an average and worst-case time complexity of O(n log n), which is better than the O(n²) of Bubble, Insertion, and Selection sorts." },
  { id: 19, topic: "algorithms", difficulty: "Hard", question: "Dijkstra's Algorithm is used to find:", options: ["Shortest path in unweighted graphs", "Minimum Spanning Tree", "Shortest path in weighted graphs with positive weights", "Strongly connected components"], correctIndex: 2, explanation: "Dijkstra's finds the shortest path from a source to all other vertices in a weighted graph without negative edge weights." },
  { id: 20, topic: "dbms", difficulty: "Easy", question: "Which command is used to remove all records from a table while keeping its structure intact?", options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"], correctIndex: 2, explanation: "TRUNCATE removes all rows from a table and resets auto-increment counters, but the table structure remains. DROP removes the table entirely." },
  { id: 21, topic: "dbms", difficulty: "Medium", question: "What is the purpose of normalization in a database?", options: ["To encrypt data", "To reduce data redundancy", "To backup the database", "To index queries"], correctIndex: 1, explanation: "Normalization is the process of organizing data to minimize redundancy and dependency by separating data into multiple related tables." },
  { id: 22, topic: "operating-systems", difficulty: "Medium", question: "What occurs when two or more processes are waiting indefinitely for an event that can be caused only by one of the waiting processes?", options: ["Starvation", "Deadlock", "Paging", "Thrashing"], correctIndex: 1, explanation: "This is the exact definition of a Deadlock in operating systems." },
  { id: 23, topic: "operating-systems", difficulty: "Hard", question: "Which page replacement algorithm suffers from Belady's Anomaly?", options: ["LRU", "Optimal", "FIFO", "MRU"], correctIndex: 2, explanation: "Belady's Anomaly occurs in First-In-First-Out (FIFO) where increasing the number of page frames results in an increase in the number of page faults." },
  { id: 24, topic: "simple-compound-interest", difficulty: "Easy", question: "What is the simple interest on ₹10,000 at 5% per annum for 3 years?", options: ["₹1,000", "₹1,200", "₹1,500", "₹1,800"], correctIndex: 2, explanation: "SI = (P × R × T) / 100 = (10000 × 5 × 3) / 100 = ₹1500." },
  { id: 25, topic: "simple-compound-interest", difficulty: "Medium", question: "A sum doubles itself in 8 years at simple interest. The rate of interest is:", options: ["10%", "12.5%", "15%", "8%"], correctIndex: 1, explanation: "Let sum = P. Amount = 2P, so SI = P. Time = 8. R = (SI × 100) / (P × T) = (P × 100) / (P × 8) = 100/8 = 12.5%." },
  { id: 26, topic: "mensuration", difficulty: "Easy", question: "The perimeter of a rectangle is 40 cm and its length is 12 cm. What is its breadth?", options: ["6 cm", "8 cm", "10 cm", "12 cm"], correctIndex: 1, explanation: "Perimeter = 2(L + B) -> 40 = 2(12 + B) -> 20 = 12 + B -> B = 8 cm." },
  { id: 27, topic: "syllogism", difficulty: "Medium", question: "Statements: All cats are dogs. Some dogs are birds. Conclusion I: Some cats are birds. Conclusion II: Some birds are dogs.", options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"], correctIndex: 1, explanation: "From 'Some dogs are birds', we can deduce 'Some birds are dogs' (conversion). However, we cannot establish a definite relationship between cats and birds. So only II follows." },
  { id: 28, topic: "sentence-correction", difficulty: "Easy", question: "Choose the correct sentence:", options: ["He don't like to play cricket.", "He doesn't likes to play cricket.", "He doesn't like to play cricket.", "He don't likes to play cricket."], correctIndex: 2, explanation: "'He' is third-person singular, so 'does not' (doesn't) is used. After 'doesn't', the base form of the verb 'like' is required without 's'." },
  { id: 29, topic: "synonyms-antonyms", difficulty: "Easy", question: "What is the synonym of 'ABUNDANT'?", options: ["Scarce", "Plentiful", "Rare", "Deficient"], correctIndex: 1, explanation: "'Abundant' means existing or available in large quantities, which is synonymous with 'Plentiful'." },
  { id: 30, topic: "synonyms-antonyms", difficulty: "Medium", question: "What is the antonym of 'EPHEMERAL'?", options: ["Transient", "Permanent", "Fleeting", "Short-lived"], correctIndex: 1, explanation: "'Ephemeral' means lasting for a very short time. Its exact opposite is 'Permanent'." }
];

const topicOptions = [
  { value: "all", label: "All Topics" },
  { value: "percentage", label: "Percentage" },
  { value: "number-systems", label: "Number Systems" },
  { value: "profit-loss", label: "Profit & Loss" },
  { value: "time-work", label: "Time & Work" },
  { value: "time-speed", label: "Time, Speed & Distance" },
  { value: "probability", label: "Probability" },
  { value: "blood-relations", label: "Blood Relations" },
  { value: "coding-decoding", label: "Coding & Decoding" },
  { value: "average", label: "Average" },
  { value: "ratio-proportion", label: "Ratio & Proportion" },
  { value: "reading-comp", label: "Reading Comprehension" },
  { value: "data-structures", label: "Data Structures" },
  { value: "algorithms", label: "Algorithms" },
  { value: "dbms", label: "DBMS" },
  { value: "operating-systems", label: "Operating Systems" },
  { value: "simple-compound-interest", label: "Simple & Compound Interest" },
  { value: "mensuration", label: "Mensuration" },
  { value: "syllogism", label: "Syllogism" },
  { value: "sentence-correction", label: "Sentence Correction" },
  { value: "synonyms-antonyms", label: "Synonyms & Antonyms" },
];

const difficultyOptions = ["All", "Easy", "Medium", "Hard"];

export default function QuizPage() {
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("All");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [usedIds, setUsedIds] = useState<number[]>([]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const generateQuestion = useCallback(() => {
    let pool = questionBank.filter((q) => !usedIds.includes(q.id));
    if (topic !== "all") pool = pool.filter((q) => q.topic === topic);
    if (difficulty !== "All") pool = pool.filter((q) => q.difficulty === difficulty);

    if (pool.length === 0) {
      // Reset used IDs if we've exhausted the pool
      setUsedIds([]);
      pool = questionBank.filter((q) => {
        const matchTopic = topic === "all" || q.topic === topic;
        const matchDiff = difficulty === "All" || q.difficulty === difficulty;
        return matchTopic && matchDiff;
      });
    }

    if (pool.length === 0) return;

    const q = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(q);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimer(0);
    setIsRunning(true);
    setUsedIds((prev) => [...prev, q.id]);
  }, [topic, difficulty, usedIds]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setIsRunning(false);
    setTotalAttempted((t) => t + 1);
    if (index === currentQuestion!.correctIndex) {
      setCorrect((c) => c + 1);
    } else {
      setWrong((w) => w + 1);
    }
  };

  const resetSession = () => {
    setCorrect(0);
    setWrong(0);
    setTotalAttempted(0);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimer(0);
    setIsRunning(false);
    setUsedIds([]);
  };

  const accuracy = totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🎯 Practice Quiz
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-generated adaptive MCQs — test your knowledge and track accuracy
          </p>
        </div>
        <button
          onClick={resetSession}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset Session
        </button>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{totalAttempted}</div>
          <div className="text-xs text-muted-foreground mt-1">Attempted</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent flex items-center justify-center gap-1">
            <CheckCircle2 className="w-5 h-5" /> {correct}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Correct</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-destructive flex items-center justify-center gap-1">
            <XCircle className="w-5 h-5" /> {wrong}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Wrong</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">{accuracy}%</div>
          <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-card rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="px-4 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {topicOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="flex gap-2">
            {difficultyOptions.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  difficulty === d
                    ? d === "Easy" ? "bg-green-500/20 text-green-500" :
                      d === "Medium" ? "bg-amber-500/20 text-amber-500" :
                      d === "Hard" ? "bg-red-500/20 text-red-500" :
                      "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={generateQuestion}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Sparkles className="w-4 h-4" /> Generate Question
        </button>
      </div>

      {/* Question Area */}
      <AnimatePresence mode="wait">
        {currentQuestion ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card rounded-2xl p-6 space-y-6"
          >
            {/* Question Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  currentQuestion.difficulty === "Easy" ? "bg-green-500/10 text-green-500" :
                  currentQuestion.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" :
                  "bg-red-500/10 text-red-500"
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {currentQuestion.topic.replace("-", " ")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="tabular-nums font-medium">{formatTime(timer)}</span>
              </div>
            </div>

            {/* Question */}
            <h2 className="text-lg font-semibold leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentQuestion.correctIndex;
                const isAnswered = selectedAnswer !== null;

                let optionClass = "border-border hover:border-primary/50 hover:bg-primary/5";
                if (isAnswered) {
                  if (isCorrect) optionClass = "border-accent bg-accent/10 answer-correct";
                  else if (isSelected) optionClass = "border-destructive bg-destructive/10 answer-wrong";
                  else optionClass = "border-border opacity-60";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={isAnswered}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${optionClass}`}
                  >
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold shrink-0 ${
                      isAnswered && isCorrect ? "border-accent text-accent" :
                      isAnswered && isSelected ? "border-destructive text-destructive" :
                      "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 text-sm">{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-2 text-sm text-primary font-medium mb-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showExplanation ? "Hide" : "Show"} Explanation
                </button>
                {showExplanation && (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </div>
                )}
                <button
                  onClick={generateQuestion}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Next Question <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-16 text-center space-y-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Ready to Test Your Knowledge?</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Select a topic and difficulty level, then click &quot;Generate Question&quot; to start your adaptive quiz session.
            </p>
            <button
              onClick={generateQuestion}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <Sparkles className="w-4 h-4" /> Generate First Question
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
