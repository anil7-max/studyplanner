"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Zap,
  Heart,
  Flame,
  Trophy,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Crown,
  Target,
  Shield,
  TrendingUp,
  Medal,
  Lightbulb,
} from "lucide-react";

/* ─── Question Bank ─── */
interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
  explanation: string;
}

const questionBank: Question[] = [
  { id: 1, topic: "Percentage", question: "If a number is increased by 20% and then decreased by 20%, the net change is:", options: ["No change", "4% decrease", "4% increase", "2% decrease"], correctIndex: 1, explanation: "Let the number be 100. After 20% increase = 120. After 20% decrease of 120 = 120 × 0.8 = 96. Net change = (96-100)/100 = -4%. So 4% decrease." },
  { id: 2, topic: "Profit & Loss", question: "A shopkeeper marks his goods 30% above cost price and gives a 10% discount. His profit percentage is:", options: ["17%", "20%", "15%", "18%"], correctIndex: 0, explanation: "Let CP = 100. MP = 130. After 10% discount, SP = 130 × 0.9 = 117. Profit = 17%." },
  { id: 3, topic: "Percentage", question: "If the price of sugar rises by 25%, by how much percent must a family reduce consumption to maintain expenditure?", options: ["25%", "20%", "15%", "30%"], correctIndex: 1, explanation: "Reduction = (25/125) × 100 = 20%. Using formula: r/(100+r) × 100 = 25/125 × 100 = 20%." },
  { id: 4, topic: "Number Systems", question: "The HCF of 12, 18, and 24 is:", options: ["6", "4", "8", "12"], correctIndex: 0, explanation: "12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. HCF = 2¹ × 3¹ = 6." },
  { id: 5, topic: "Number Systems", question: "What is the remainder when 2^100 is divided by 3?", options: ["0", "1", "2", "Cannot determine"], correctIndex: 1, explanation: "2¹ mod 3 = 2, 2² mod 3 = 1, 2³ mod 3 = 2, 2⁴ mod 3 = 1. Pattern repeats with period 2. Since 100 is even, 2^100 mod 3 = 1." },
  { id: 6, topic: "Profit & Loss", question: "An article bought for ₹500 is sold for ₹600. The profit percentage is:", options: ["10%", "15%", "20%", "25%"], correctIndex: 2, explanation: "Profit = 600 - 500 = 100. Profit% = (100/500) × 100 = 20%." },
  { id: 7, topic: "Profit & Loss", question: "A man sells two articles for ₹99 each. On one he gains 10% and on the other he loses 10%. His net gain/loss is:", options: ["1% loss", "1% gain", "No profit no loss", "2% loss"], correctIndex: 0, explanation: "When SP is same and profit% = loss%, there's always a loss. Loss% = (10/10)² = 1% loss." },
  { id: 8, topic: "Time & Work", question: "A can do a work in 10 days and B can do it in 15 days. In how many days can they do it together?", options: ["5 days", "6 days", "7 days", "8 days"], correctIndex: 1, explanation: "A's rate = 1/10, B's rate = 1/15. Combined = 1/10 + 1/15 = 5/30 = 1/6. Together = 6 days." },
  { id: 9, topic: "Speed & Distance", question: "A train 150m long passes a pole in 15 seconds. What is its speed in km/hr?", options: ["36 km/hr", "54 km/hr", "10 km/hr", "72 km/hr"], correctIndex: 0, explanation: "Speed = 150/15 = 10 m/s = 10 × (18/5) = 36 km/hr." },
  { id: 10, topic: "Probability", question: "A coin is tossed 3 times. What is the probability of getting at least one head?", options: ["7/8", "3/8", "1/2", "5/8"], correctIndex: 0, explanation: "P(at least 1 head) = 1 - P(no heads) = 1 - (1/2)³ = 1 - 1/8 = 7/8." },
  { id: 11, topic: "Blood Relations", question: "Pointing to a photo, Arun said 'He is the son of the only son of my grandfather.' Who is the person in photo?", options: ["Father", "Brother", "Cousin", "Uncle"], correctIndex: 1, explanation: "Only son of grandfather = Arun's father. Son of Arun's father = Arun or his brother. Since Arun says 'He', it's his brother." },
  { id: 12, topic: "Coding-Decoding", question: "If COMPUTER is coded as DPNQVUFS, then MACHINE is coded as:", options: ["NBDIJOF", "NBJDIJOF", "NBDIJOE", "OBDIJOF"], correctIndex: 0, explanation: "Each letter is shifted by +1. M→N, A→B, C→D, H→I, I→J, N→O, E→F. MACHINE → NBDIJOF." },
  { id: 13, topic: "Average", question: "The average of 5 numbers is 20. If one number is removed, the average becomes 15. What is the removed number?", options: ["40", "35", "30", "25"], correctIndex: 0, explanation: "Sum of 5 numbers = 100. Sum of 4 numbers = 60. Removed number = 100 - 60 = 40." },
  { id: 14, topic: "Ratio", question: "If A:B = 2:3 and B:C = 4:5, then A:B:C is:", options: ["8:12:15", "2:3:5", "4:6:15", "8:12:10"], correctIndex: 0, explanation: "Make B common: A:B = 2:3 = 8:12, B:C = 4:5 = 12:15. So A:B:C = 8:12:15." },
  { id: 15, topic: "Verbal", question: "The primary purpose of a topic sentence in a paragraph is to:", options: ["Summarize the conclusion", "State the main idea", "Provide an example", "Create suspense"], correctIndex: 1, explanation: "A topic sentence introduces the main idea or claim of a paragraph, guiding the reader about what follows." },
  { id: 16, topic: "Data Structures", question: "Which data structure follows the LIFO principle?", options: ["Queue", "Stack", "Tree", "Graph"], correctIndex: 1, explanation: "Stack follows Last-In-First-Out (LIFO) where the last element added is the first one to be removed." },
  { id: 17, topic: "Data Structures", question: "What is the worst-case time complexity of searching in a Binary Search Tree (BST)?", options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"], correctIndex: 2, explanation: "In a skewed BST (where every node has only right or left child), it behaves like a linked list. So worst case is O(n)." },
  { id: 18, topic: "Algorithms", question: "Which of the following sorting algorithms has the best average-case time complexity?", options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"], correctIndex: 3, explanation: "Merge Sort has an average and worst-case time complexity of O(n log n), which is better than the O(n²) of Bubble, Insertion, and Selection sorts." },
  { id: 19, topic: "Algorithms", question: "Dijkstra's Algorithm is used to find:", options: ["Shortest path in unweighted graphs", "Minimum Spanning Tree", "Shortest path in weighted graphs with positive weights", "Strongly connected components"], correctIndex: 2, explanation: "Dijkstra's finds the shortest path from a source to all other vertices in a weighted graph without negative edge weights." },
  { id: 20, topic: "DBMS", question: "Which command is used to remove all records from a table while keeping its structure intact?", options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"], correctIndex: 2, explanation: "TRUNCATE removes all rows from a table and resets auto-increment counters, but the table structure remains. DROP removes the table entirely." },
  { id: 21, topic: "DBMS", question: "What is the purpose of normalization in a database?", options: ["To encrypt data", "To reduce data redundancy", "To backup the database", "To index queries"], correctIndex: 1, explanation: "Normalization is the process of organizing data to minimize redundancy and dependency by separating data into multiple related tables." },
  { id: 22, topic: "Operating Systems", question: "What occurs when two or more processes are waiting indefinitely for an event that can be caused only by one of the waiting processes?", options: ["Starvation", "Deadlock", "Paging", "Thrashing"], correctIndex: 1, explanation: "This is the exact definition of a Deadlock in operating systems." },
  { id: 23, topic: "Operating Systems", question: "Which page replacement algorithm suffers from Belady's Anomaly?", options: ["LRU", "Optimal", "FIFO", "MRU"], correctIndex: 2, explanation: "Belady's Anomaly occurs in First-In-First-Out (FIFO) where increasing the number of page frames results in an increase in the number of page faults." },
  { id: 24, topic: "Interest", question: "What is the simple interest on ₹10,000 at 5% per annum for 3 years?", options: ["₹1,000", "₹1,200", "₹1,500", "₹1,800"], correctIndex: 2, explanation: "SI = (P × R × T) / 100 = (10000 × 5 × 3) / 100 = ₹1500." },
  { id: 25, topic: "Interest", question: "A sum doubles itself in 8 years at simple interest. The rate of interest is:", options: ["10%", "12.5%", "15%", "8%"], correctIndex: 1, explanation: "Let sum = P. Amount = 2P, so SI = P. Time = 8. R = (SI × 100) / (P × T) = (P × 100) / (P × 8) = 100/8 = 12.5%." }
];

/* ─── Difficulty Config ─── */
const difficultyConfig = {
  Easy: { timePerQuestion: 30, xpMultiplier: 1, label: "Easy", color: "from-emerald-500 to-green-500", icon: Shield, desc: "30 seconds, 1x XP" },
  Medium: { timePerQuestion: 30, xpMultiplier: 1.5, label: "Medium", color: "from-amber-500 to-orange-500", icon: Target, desc: "30 seconds, 1.5x XP" },
  Hard: { timePerQuestion: 30, xpMultiplier: 2.5, label: "Hard", color: "from-red-500 to-rose-500", icon: Flame, desc: "30 seconds, 2.5x XP" },
} as const;

type Difficulty = keyof typeof difficultyConfig;

/* ─── Leaderboard Entry ─── */
interface LeaderboardEntry {
  score: number;
  accuracy: number;
  streak: number;
  xp: number;
  difficulty: Difficulty;
  date: string;
}

const LEADERBOARD_KEY = "grohy-quiz-challenge-leaderboard";

function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries.slice(0, 10)));
}

/* ─── Confetti Particle ─── */
function ConfettiEffect() {
  const colors = ["#2563EB", "#7C3AED", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4", "#EC4899"];
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 1.5 + Math.random() * 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 6 + Math.random() * 8;
        const rotation = Math.random() * 360;
        return (
          <motion.div
            key={i}
            initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ y: "110vh", opacity: 0, rotate: rotation + 720, scale: 0.3 }}
            transition={{ duration, delay, ease: "easeIn" }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Main Component ─── */
export default function QuizChallengePage() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [usedIds, setUsedIds] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState<"correct" | "wrong" | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load leaderboard on mount
  useEffect(() => {
    setLeaderboard(loadLeaderboard());
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing" || selectedAnswer !== null) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Time's up — treat as wrong answer
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, currentQuestion, selectedAnswer]);

  const handleTimeUp = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(-1); // -1 means time expired
    setAnswerFeedback("wrong");
    setStreak(0);
    setLives((l) => l - 1);
    setTotalAnswered((t) => t + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    if (lives <= 0) {
      endGame();
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = useCallback(() => {
    const config = difficultyConfig[difficulty];
    let pool = questionBank.filter((q) => !usedIds.includes(q.id));
    if (pool.length === 0) {
      setUsedIds([]);
      pool = [...questionBank];
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(q);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
    setTimeLeft(config.timePerQuestion);
    setUsedIds((prev) => [...prev, q.id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, usedIds]);

  const startGame = () => {
    setGameState("playing");
    setLives(5);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setXp(0);
    setTotalAnswered(0);
    setTotalCorrect(0);
    setUsedIds([]);
    setIsNewHighScore(false);
    setShowConfetti(false);
    setAnswerFeedback(null);

    const config = difficultyConfig[difficulty];
    const pool = [...questionBank];
    const q = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(q);
    setSelectedAnswer(null);
    setTimeLeft(config.timePerQuestion);
    setUsedIds([q.id]);
  };

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState("gameover");

    // Check leaderboard
    const board = loadLeaderboard();
    const entry: LeaderboardEntry = {
      score,
      accuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
      streak: bestStreak,
      xp,
      difficulty,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };

    const isHigh = board.length < 10 || score > (board[board.length - 1]?.score ?? 0);
    if (isHigh && score > 0) {
      const newBoard = [...board, entry].sort((a, b) => b.score - a.score).slice(0, 10);
      saveLeaderboard(newBoard);
      setLeaderboard(newBoard);
      setIsNewHighScore(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      setLeaderboard(board);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, totalAnswered, totalCorrect, bestStreak, xp, difficulty]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(index);
    setTotalAnswered((t) => t + 1);

    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      setAnswerFeedback("correct");
      const config = difficultyConfig[difficulty];
      const streakBonus = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;
      const pointsEarned = Math.round(10 * config.xpMultiplier * streakBonus);
      const xpEarned = Math.round(15 * config.xpMultiplier + streak * 5);

      setScore((s) => s + pointsEarned);
      setXp((x) => x + xpEarned);
      setStreak((s) => {
        const newStreak = s + 1;
        setBestStreak((b) => Math.max(b, newStreak));
        return newStreak;
      });
      setTotalCorrect((c) => c + 1);
    } else {
      setAnswerFeedback("wrong");
      setStreak(0);
      setLives((l) => l - 1);
    }
  };

  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const level = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100;

  const config = difficultyConfig[difficulty];
  const timerPercent = currentQuestion ? (timeLeft / config.timePerQuestion) * 100 : 100;
  const timerColor = timerPercent > 50 ? "bg-emerald-500" : timerPercent > 25 ? "bg-amber-500" : "bg-red-500";

  /* ─── MENU SCREEN ─── */
  if (gameState === "menu") {
    return (
      <div className="page-container space-y-6">
        {showConfetti && <ConfettiEffect />}

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🎮 Quiz Challenge
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Test your knowledge in an intense timed quiz! Earn XP, build streaks, and climb the leaderboard.
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Select Difficulty
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {(Object.keys(difficultyConfig) as Difficulty[]).map((d) => {
              const cfg = difficultyConfig[d];
              const isActive = difficulty === d;
              return (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`glass-card rounded-2xl p-5 text-left card-hover group transition-all ${
                    isActive ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cfg.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <cfg.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{cfg.label}</h3>
                  <p className="text-xs text-muted-foreground">{cfg.desc}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    XP Multiplier: <span className="font-semibold text-foreground">{cfg.xpMultiplier}x</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Rules */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Heart, label: "5 Lives", desc: "Wrong answer or timeout loses a life", color: "text-red-500" },
              { icon: Flame, label: "Streaks", desc: "Consecutive correct answers = bonus XP", color: "text-orange-500" },
              { icon: Star, label: "XP System", desc: "Earn XP to level up and track growth", color: "text-yellow-500" },
              { icon: Trophy, label: "Leaderboard", desc: "Top 10 scores saved locally", color: "text-primary" },
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                <rule.icon className={`w-5 h-5 mt-0.5 shrink-0 ${rule.color}`} />
                <div>
                  <div className="text-sm font-semibold">{rule.label}</div>
                  <div className="text-xs text-muted-foreground">{rule.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-primary to-violet-600 text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-shadow"
          >
            <Gamepad2 className="w-6 h-6" /> Start Challenge
          </motion.button>
        </div>

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" /> Leaderboard
            </h2>
            <div className="space-y-2">
              {leaderboard.map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                    i === 0 ? "bg-yellow-500/10" : i === 1 ? "bg-gray-300/10" : i === 2 ? "bg-amber-700/10" : "bg-secondary/30"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    {i === 0 ? (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    ) : i === 1 ? (
                      <Medal className="w-5 h-5 text-gray-400" />
                    ) : i === 2 ? (
                      <Medal className="w-5 h-5 text-amber-700" />
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{entry.score} pts</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        entry.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-500" :
                        entry.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {entry.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {entry.accuracy}% accuracy · {entry.streak} best streak · {entry.xp} XP
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{entry.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─── PLAYING SCREEN ─── */
  if (gameState === "playing" && currentQuestion) {
    return (
      <div className="page-container space-y-5">
        {/* Top Bar: Lives, Score, Streak, Level */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Lives */}
          <div className="glass-card rounded-xl p-3 flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 transition-all ${
                    i < lives ? "text-red-500 fill-red-500" : "text-muted-foreground/30"
                  } ${i === lives && answerFeedback === "wrong" ? "animate-ping" : ""}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">Lives</span>
          </div>

          {/* Score */}
          <div className="glass-card rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-primary">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>

          {/* Streak */}
          <div className="glass-card rounded-xl p-3 flex items-center justify-center gap-2">
            <Flame className={`w-5 h-5 ${streak >= 3 ? "text-orange-500 animate-pulse" : "text-muted-foreground/40"}`} />
            <div>
              <div className={`text-lg font-bold ${streak >= 5 ? "text-orange-500" : streak >= 3 ? "text-amber-500" : ""}`}>
                {streak}
              </div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </div>
            {streak >= 3 && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-500 font-bold">
                {streak >= 5 ? "3x" : "2x"}
              </span>
            )}
          </div>

          {/* Level / XP */}
          <div className="glass-card rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold">Lvl {level}</span>
              <span className="text-xs text-muted-foreground">{xp} XP</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="glass-card rounded-xl p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timerPercent <= 25 ? "text-red-500 animate-pulse" : "text-muted-foreground"}`} />
              <span className="text-sm font-semibold tabular-nums">
                {timeLeft}s
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Q{totalAnswered + 1} · {currentQuestion.topic}
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${timerColor} transition-colors`}
              animate={{ width: `${timerPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className={`glass-card rounded-2xl p-6 space-y-5 ${
              answerFeedback === "wrong" ? "answer-wrong" : ""
            }`}
          >
            {/* Question */}
            <h2 className="text-lg font-semibold leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="grid sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentQuestion.correctIndex;
                const isAnswered = selectedAnswer !== null;

                let optionClass = "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]";
                if (isAnswered) {
                  if (isCorrect) optionClass = "border-emerald-500 bg-emerald-500/10 scale-[1.02]";
                  else if (isSelected || selectedAnswer === -1) optionClass = "border-red-500 bg-red-500/10";
                  else optionClass = "border-border opacity-50";
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.02 } : undefined}
                    whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${optionClass}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      isAnswered && isCorrect ? "bg-emerald-500 text-white" :
                      isAnswered && (isSelected || selectedAnswer === -1) && !isCorrect ? "bg-red-500 text-white" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {isAnswered && isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                       isAnswered && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                       String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 text-sm font-medium">{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback overlay & Explanation */}
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  {/* Feedback Banner */}
                  {answerFeedback === "correct" && (
                    <div className="flex items-center gap-2 text-emerald-500 font-bold mb-4 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                      <CheckCircle2 className="w-5 h-5" />
                      Correct! +{Math.round(10 * config.xpMultiplier * (streak >= 5 ? 3 : streak >= 3 ? 2 : 1))} pts
                      {streak >= 3 && <Flame className="w-4 h-4 text-orange-500" />}
                    </div>
                  )}
                  {answerFeedback === "wrong" && (
                    <div className="flex items-center gap-2 text-red-500 font-bold mb-4 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                      <XCircle className="w-5 h-5" />
                      {selectedAnswer === -1 ? "Time's up!" : "Wrong!"} -1 ❤️
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm leading-relaxed text-foreground flex gap-3 items-start">
                    <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-primary mb-1">Explanation</p>
                      <p>{currentQuestion.explanation}</p>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
                    className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  >
                    {lives <= 0 ? "Finish Game" : "Continue"} <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  /* ─── GAME OVER SCREEN ─── */
  return (
    <div className="page-container space-y-6">
      {showConfetti && <ConfettiEffect />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 text-center space-y-6"
      >
        {/* Title */}
        <div>
          {isNewHighScore ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/20 text-yellow-500 font-bold text-sm mb-4"
            >
              <Crown className="w-5 h-5" /> New High Score!
            </motion.div>
          ) : null}
          <h1 className="text-3xl font-bold">Game Over!</h1>
          <p className="text-muted-foreground mt-1">
            {score >= 100 ? "Incredible performance! 🏆" :
             score >= 50 ? "Great job! Keep practicing! 🌟" :
             "Good effort! You'll do better next time! 💪"}
          </p>
        </div>

        {/* Score Display */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-block"
        >
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center mx-auto shadow-2xl shadow-primary/30">
            <div className="w-32 h-32 rounded-full bg-background flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold">{score}</span>
              <span className="text-xs text-muted-foreground">points</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="text-2xl font-bold text-foreground">{totalAnswered}</div>
            <div className="text-xs text-muted-foreground">Questions</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="text-2xl font-bold text-emerald-500">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5" /> {bestStreak}
            </div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
              <Star className="w-5 h-5" /> {xp}
            </div>
            <div className="text-xs text-muted-foreground">XP Earned</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="glass-card rounded-xl p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                {level}
              </div>
              <span className="text-sm font-semibold">Level {level}</span>
            </div>
            <span className="text-xs text-muted-foreground">{levelProgress}/100 XP to next level</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-violet-600 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-shadow"
          >
            <RotateCcw className="w-5 h-5" /> Play Again
          </motion.button>
          <button
            onClick={() => {
              setGameState("menu");
              setShowConfetti(false);
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
          >
            <ArrowRight className="w-5 h-5" /> Back to Menu
          </button>
        </div>
      </motion.div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" /> Leaderboard
          </h2>
          <div className="space-y-2">
            {leaderboard.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                  i === 0 ? "bg-yellow-500/10" : i === 1 ? "bg-gray-300/10" : i === 2 ? "bg-amber-700/10" : "bg-secondary/30"
                } ${entry.score === score && entry.date === new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                  ? "ring-2 ring-primary"
                  : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  {i === 0 ? (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  ) : i === 1 ? (
                    <Medal className="w-5 h-5 text-gray-400" />
                  ) : i === 2 ? (
                    <Medal className="w-5 h-5 text-amber-700" />
                  ) : (
                    <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{entry.score} pts</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      entry.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-500" :
                      entry.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" :
                      "bg-red-500/10 text-red-500"
                    }`}>
                      {entry.difficulty}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.accuracy}% accuracy · {entry.streak} best streak · {entry.xp} XP
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{entry.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
