"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Plus,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Trash2,
  Target,
  Clock,
  BookOpen,
  Trophy,
} from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface Week {
  id: number;
  title: string;
  phase: string;
  color: string;
  tasks: Task[];
}

const defaultWeeks: Week[] = [
  {
    id: 1, title: "Week 1", phase: "Foundation", color: "from-blue-500 to-blue-600",
    tasks: [
      { id: "w1t1", text: "Complete Number Systems basics (HCF, LCM, Divisibility)", done: false },
      { id: "w1t2", text: "Solve 20 Percentage problems", done: false },
      { id: "w1t3", text: "Start Profit & Loss fundamentals", done: false },
      { id: "w1t4", text: "Set up resume draft — contact info and education", done: false },
      { id: "w1t5", text: "Take baseline aptitude assessment", done: false },
    ],
  },
  {
    id: 2, title: "Week 2", phase: "Core Aptitude", color: "from-violet-500 to-violet-600",
    tasks: [
      { id: "w2t1", text: "Complete Ratio & Proportion and Average", done: false },
      { id: "w2t2", text: "Practice Time & Work problems (30 questions)", done: false },
      { id: "w2t3", text: "Start Logical Reasoning — Blood Relations", done: false },
      { id: "w2t4", text: "Add Skills and Projects sections to resume", done: false },
      { id: "w2t5", text: "Practice 1 mock aptitude test", done: false },
    ],
  },
  {
    id: 3, title: "Week 3", phase: "Logical + Verbal", color: "from-emerald-500 to-emerald-600",
    tasks: [
      { id: "w3t1", text: "Complete Coding-Decoding and Seating Arrangement", done: false },
      { id: "w3t2", text: "Practice Direction Sense problems", done: false },
      { id: "w3t3", text: "Start Reading Comprehension daily practice", done: false },
      { id: "w3t4", text: "Complete Time Speed Distance problems", done: false },
      { id: "w3t5", text: "Analyze resume with AI — fix critical errors", done: false },
    ],
  },
  {
    id: 4, title: "Week 4", phase: "Advanced Quant", color: "from-amber-500 to-amber-600",
    tasks: [
      { id: "w4t1", text: "Complete Probability and Permutation-Combination", done: false },
      { id: "w4t2", text: "Practice Data Interpretation (tables & graphs)", done: false },
      { id: "w4t3", text: "Take full-length aptitude mock test", done: false },
      { id: "w4t4", text: "Review weak areas from mock test results", done: false },
      { id: "w4t5", text: "Practice verbal ability — Grammar & Vocabulary", done: false },
    ],
  },
  {
    id: 5, title: "Week 5", phase: "Interview Prep Start", color: "from-pink-500 to-pink-600",
    tasks: [
      { id: "w5t1", text: "Prepare answers for top 10 HR questions (STAR method)", done: false },
      { id: "w5t2", text: "Practice 'Tell me about yourself' — record and review", done: false },
      { id: "w5t3", text: "Study 5 Technical interview questions daily", done: false },
      { id: "w5t4", text: "Finalize resume — get peer review", done: false },
      { id: "w5t5", text: "Research target companies (2-3 companies)", done: false },
    ],
  },
  {
    id: 6, title: "Week 6", phase: "Mock Interviews", color: "from-cyan-500 to-cyan-600",
    tasks: [
      { id: "w6t1", text: "Complete 3 full mock interviews (HR + Technical)", done: false },
      { id: "w6t2", text: "Practice behavioral questions with STAR method", done: false },
      { id: "w6t3", text: "Study company-specific interview patterns", done: false },
      { id: "w6t4", text: "Work on communication and body language", done: false },
      { id: "w6t5", text: "Take advanced aptitude test — target 80%+", done: false },
    ],
  },
  {
    id: 7, title: "Week 7", phase: "Deep Practice", color: "from-orange-500 to-orange-600",
    tasks: [
      { id: "w7t1", text: "Solve 50+ aptitude questions from weak topics", done: false },
      { id: "w7t2", text: "Practice 2 mock interviews with timer", done: false },
      { id: "w7t3", text: "Perfect your project explanations (2-minute pitch)", done: false },
      { id: "w7t4", text: "Before/During/After interview checklist review", done: false },
      { id: "w7t5", text: "Final resume polish — ATS score target 90+", done: false },
    ],
  },
  {
    id: 8, title: "Week 8", phase: "Final Sprint 🏁", color: "from-red-500 to-red-600",
    tasks: [
      { id: "w8t1", text: "Full-length aptitude mock test — analyze results", done: false },
      { id: "w8t2", text: "Final mock interview round — get feedback", done: false },
      { id: "w8t3", text: "Prepare interview day checklist (documents, dress code)", done: false },
      { id: "w8t4", text: "Review all STAR method answers one more time", done: false },
      { id: "w8t5", text: "Relax, stay confident — you're placement ready! 🎉", done: false },
    ],
  },
];

const STORAGE_KEY = "placementpro-planner";

export default function PlannerPage() {
  const [weeks, setWeeks] = useState<Week[]>(defaultWeeks);
  const [expanded, setExpanded] = useState<number[]>([1]);
  const [newTasks, setNewTasks] = useState<Record<number, string>>({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWeeks(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks));
  }, [weeks]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleTask = (weekId: number, taskId: string) => {
    setWeeks((prev) =>
      prev.map((w) =>
        w.id === weekId
          ? {
              ...w,
              tasks: w.tasks.map((t) =>
                t.id === taskId ? { ...t, done: !t.done } : t
              ),
            }
          : w
      )
    );
  };

  const addTask = (weekId: number) => {
    const text = newTasks[weekId]?.trim();
    if (!text) return;
    setWeeks((prev) =>
      prev.map((w) =>
        w.id === weekId
          ? {
              ...w,
              tasks: [
                ...w.tasks,
                { id: `w${weekId}t${Date.now()}`, text, done: false },
              ],
            }
          : w
      )
    );
    setNewTasks((prev) => ({ ...prev, [weekId]: "" }));
  };

  const removeTask = (weekId: number, taskId: string) => {
    setWeeks((prev) =>
      prev.map((w) =>
        w.id === weekId
          ? { ...w, tasks: w.tasks.filter((t) => t.id !== taskId) }
          : w
      )
    );
  };

  const getWeekProgress = (week: Week) => {
    if (week.tasks.length === 0) return 0;
    return Math.round(
      (week.tasks.filter((t) => t.done).length / week.tasks.length) * 100
    );
  };

  const totalTasks = weeks.reduce((a, w) => a + w.tasks.length, 0);
  const completedTasks = weeks.reduce(
    (a, w) => a + w.tasks.filter((t) => t.done).length,
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">📅 Study Planner</h1>
          <p className="text-sm text-muted-foreground mt-1">
            8-week roadmap to placement readiness — track daily progress
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 text-center">
          <CalendarDays className="w-5 h-5 text-primary mx-auto mb-1" />
          <div className="text-2xl font-bold">8</div>
          <div className="text-xs text-muted-foreground">Weeks</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <Target className="w-5 h-5 text-violet-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{totalTasks}</div>
          <div className="text-xs text-muted-foreground">Total Tasks</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <CheckCircle2 className="w-5 h-5 text-accent mx-auto mb-1" />
          <div className="text-2xl font-bold">{completedTasks}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{overallProgress}%</div>
          <div className="text-xs text-muted-foreground">Progress</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Overall Progress</span>
          <span className="text-sm font-bold text-primary">{overallProgress}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-bg"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Weekly Sections */}
      <div className="space-y-4">
        {weeks.map((week, i) => {
          const progress = getWeekProgress(week);
          const isExpanded = expanded.includes(week.id);

          return (
            <motion.div
              key={week.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Week Header */}
              <button
                onClick={() => toggleExpand(week.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-secondary/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${week.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {week.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{week.title}</h3>
                    <span className="text-xs text-muted-foreground">— {week.phase}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden max-w-xs">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${week.color}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {week.tasks.filter((t) => t.done).length}/{week.tasks.length} • {progress}%
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Tasks */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-5 pb-5 space-y-2"
                >
                  {week.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 group"
                    >
                      <button
                        onClick={() => toggleTask(week.id, task.id)}
                        className="shrink-0"
                      >
                        {task.done ? (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        )}
                      </button>
                      <span
                        className={`flex-1 text-sm ${
                          task.done ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.text}
                      </span>
                      <button
                        onClick={() => removeTask(week.id, task.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                      </button>
                    </div>
                  ))}

                  {/* Add Task */}
                  <div className="flex gap-2 mt-3">
                    <input
                      value={newTasks[week.id] || ""}
                      onChange={(e) =>
                        setNewTasks((prev) => ({
                          ...prev,
                          [week.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => e.key === "Enter" && addTask(week.id)}
                      placeholder="Add a custom task..."
                      className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      onClick={() => addTask(week.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
