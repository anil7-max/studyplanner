"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Calculator,
  Percent,
  TrendingUp,
  Ratio,
  BarChart3,
  Clock,
  Gauge,
  Dice5,
  Shuffle,
  PieChart,
  Network,
  Lock,
  Armchair,
  Compass,
  BookOpen,
  Pen,
  Languages,
  Search,
  Sparkles,
  ArrowRight,
  Bot,
  Target,
  ChevronRight,
  ExternalLink,
  Code2,
  Terminal,
} from "lucide-react";

const categories = ["All", "Quantitative", "Logical", "Verbal", "Technical"];

interface TopicData {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  progress: number;
  strength: "Beginner" | "Intermediate" | "Advanced";
  questionsTotal: number;
  questionsAttempted: number;
  color: string;
  description: string;
  readings?: { title: string; url: string; source: string }[];
}

const topics: TopicData[] = [
  { 
    id: "number-systems", title: "Number Systems", category: "Quantitative", icon: Calculator, progress: 72, strength: "Intermediate", questionsTotal: 120, questionsAttempted: 86, color: "from-blue-500 to-blue-600", description: "HCF, LCM, divisibility, prime numbers, remainders",
    readings: [
      { title: "Number Systems Guide", url: "https://www.geeksforgeeks.org/number-system-and-base-conversions/", source: "GeeksforGeeks" },
      { title: "Practice Problems", url: "https://www.indiabix.com/aptitude/problems-on-numbers/", source: "IndiaBix" }
    ]
  },
  { 
    id: "percentage", title: "Percentage", category: "Quantitative", icon: Percent, progress: 85, strength: "Advanced", questionsTotal: 80, questionsAttempted: 68, color: "from-emerald-500 to-emerald-600", description: "Percentage change, successive %, population problems",
    readings: [
      { title: "Percentage Formulas & Tricks", url: "https://aptitude-test.com/percentage.html", source: "Aptitude-Test" },
      { title: "Percentage Questions", url: "https://www.indiabix.com/aptitude/percentage/", source: "IndiaBix" }
    ]
  },
  { 
    id: "profit-loss", title: "Profit & Loss", category: "Quantitative", icon: TrendingUp, progress: 60, strength: "Intermediate", questionsTotal: 90, questionsAttempted: 54, color: "from-amber-500 to-amber-600", description: "Cost price, selling price, discount, markup",
    readings: [
      { title: "Profit and Loss Concepts", url: "https://www.geeksforgeeks.org/profit-and-loss/", source: "GeeksforGeeks" },
      { title: "Aptitude Exercises", url: "https://www.indiabix.com/aptitude/profit-and-loss/", source: "IndiaBix" }
    ]
  },
  { 
    id: "ratio-proportion", title: "Ratio & Proportion", category: "Quantitative", icon: Ratio, progress: 45, strength: "Beginner", questionsTotal: 75, questionsAttempted: 34, color: "from-violet-500 to-violet-600", description: "Ratios, proportions, mixtures, alligation",
    readings: [
      { title: "Ratio & Proportion Notes", url: "https://www.codingshuttle.com/", source: "CodingShuttle" },
      { title: "Practice Questions", url: "https://www.indiabix.com/aptitude/ratio-and-proportion/", source: "IndiaBix" }
    ]
  },
  { 
    id: "average", title: "Average", category: "Quantitative", icon: BarChart3, progress: 90, strength: "Advanced", questionsTotal: 60, questionsAttempted: 54, color: "from-cyan-500 to-cyan-600", description: "Weighted average, age problems, running average",
    readings: [
      { title: "Average Formulae & Shortcuts", url: "https://www.geeksforgeeks.org/average/", source: "GeeksforGeeks" }
    ]
  },
  { 
    id: "time-work", title: "Time & Work", category: "Quantitative", icon: Clock, progress: 55, strength: "Intermediate", questionsTotal: 100, questionsAttempted: 55, color: "from-orange-500 to-orange-600", description: "Pipes & cisterns, efficiency, alternate working",
    readings: [
      { title: "Time and Work Concepts", url: "https://aptitude-test.com/time-and-work.html", source: "Aptitude-Test" },
      { title: "Time and Work Problems", url: "https://www.indiabix.com/aptitude/time-and-work/", source: "IndiaBix" }
    ]
  },
  { 
    id: "time-speed", title: "Time, Speed & Distance", category: "Quantitative", icon: Gauge, progress: 38, strength: "Beginner", questionsTotal: 110, questionsAttempted: 42, color: "from-red-500 to-red-600", description: "Trains, boats, relative speed, circular motion",
    readings: [
      { title: "Speed, Distance and Time", url: "https://www.geeksforgeeks.org/speed-distance-and-time/", source: "GeeksforGeeks" },
      { title: "Trains Problems", url: "https://www.indiabix.com/aptitude/problems-on-trains/", source: "IndiaBix" }
    ]
  },
  { 
    id: "probability", title: "Probability", category: "Quantitative", icon: Dice5, progress: 50, strength: "Intermediate", questionsTotal: 70, questionsAttempted: 35, color: "from-pink-500 to-pink-600", description: "Basic probability, conditional, Bayes theorem",
    readings: [
      { title: "Probability Basics", url: "https://www.geeksforgeeks.org/probability-in-maths/", source: "GeeksforGeeks" },
      { title: "Probability Questions", url: "https://www.indiabix.com/aptitude/probability/", source: "IndiaBix" }
    ]
  },
  { 
    id: "permutation", title: "Permutation & Combination", category: "Quantitative", icon: Shuffle, progress: 30, strength: "Beginner", questionsTotal: 85, questionsAttempted: 26, color: "from-indigo-500 to-indigo-600", description: "Arrangements, selections, circular permutation",
    readings: [
      { title: "Permutation and Combination", url: "https://www.indiabix.com/aptitude/permutation-and-combination/", source: "IndiaBix" }
    ]
  },
  { 
    id: "data-interpretation", title: "Data Interpretation", category: "Quantitative", icon: PieChart, progress: 65, strength: "Intermediate", questionsTotal: 95, questionsAttempted: 62, color: "from-teal-500 to-teal-600", description: "Tables, bar graphs, pie charts, line graphs",
    readings: [
      { title: "Data Interpretation Tricks", url: "https://www.geeksforgeeks.org/data-interpretation/", source: "GeeksforGeeks" },
      { title: "DI Practice", url: "https://www.indiabix.com/data-interpretation/table-charts/", source: "IndiaBix" }
    ]
  },
  { 
    id: "blood-relations", title: "Blood Relations", category: "Logical", icon: Network, progress: 78, strength: "Advanced", questionsTotal: 60, questionsAttempted: 47, color: "from-rose-500 to-rose-600", description: "Family tree, coded relations, generation gaps",
    readings: [
      { title: "Blood Relations Logical Reasoning", url: "https://www.indiabix.com/logical-reasoning/blood-relation-test/", source: "IndiaBix" }
    ]
  },
  { 
    id: "coding-decoding", title: "Coding & Decoding", category: "Logical", icon: Lock, progress: 82, strength: "Advanced", questionsTotal: 70, questionsAttempted: 57, color: "from-sky-500 to-sky-600", description: "Letter coding, number coding, mixed coding",
    readings: [
      { title: "Coding and Decoding", url: "https://www.geeksforgeeks.org/coding-decoding/", source: "GeeksforGeeks" }
    ]
  },
  { 
    id: "seating", title: "Seating Arrangement", category: "Logical", icon: Armchair, progress: 42, strength: "Beginner", questionsTotal: 80, questionsAttempted: 34, color: "from-fuchsia-500 to-fuchsia-600", description: "Linear, circular, rectangular seating puzzles",
    readings: [
      { title: "Seating Arrangement Concepts", url: "https://www.indiabix.com/logical-reasoning/seating-arrangement/", source: "IndiaBix" }
    ]
  },
  { 
    id: "direction", title: "Direction Sense", category: "Logical", icon: Compass, progress: 88, strength: "Advanced", questionsTotal: 50, questionsAttempted: 44, color: "from-lime-500 to-lime-600", description: "Distance, direction, shadow-based problems",
    readings: [
      { title: "Direction Sense Test", url: "https://www.geeksforgeeks.org/direction-sense-test/", source: "GeeksforGeeks" }
    ]
  },
  { 
    id: "reading-comp", title: "Reading Comprehension", category: "Verbal", icon: BookOpen, progress: 70, strength: "Intermediate", questionsTotal: 100, questionsAttempted: 70, color: "from-yellow-500 to-yellow-600", description: "Passages, inference, tone, main idea",
    readings: [
      { title: "Reading Comprehension Tips", url: "https://www.indiabix.com/verbal-ability/comprehension/", source: "IndiaBix" }
    ]
  },
  // New topics with questionsAttempted: 0 so their readings are initially hidden
  { 
    id: "simple-compound-interest", title: "Simple & Compound Interest", category: "Quantitative", icon: Calculator, progress: 0, strength: "Beginner", questionsTotal: 65, questionsAttempted: 0, color: "from-blue-400 to-blue-500", description: "Interest calculation, rate, time, principal, installments",
    readings: [
      { title: "Simple Interest Basics", url: "https://www.indiabix.com/aptitude/simple-interest/", source: "IndiaBix" },
      { title: "Compound Interest Formulas", url: "https://www.geeksforgeeks.org/compound-interest/", source: "GeeksforGeeks" }
    ]
  },
  { 
    id: "mensuration", title: "Mensuration", category: "Quantitative", icon: Target, progress: 0, strength: "Beginner", questionsTotal: 80, questionsAttempted: 0, color: "from-emerald-400 to-emerald-500", description: "Area, perimeter, volume, surface area of 2D & 3D shapes",
    readings: [
      { title: "Mensuration Formulas", url: "https://aptitude-test.com/mensuration.html", source: "Aptitude-Test" },
      { title: "Volume & Surface Area", url: "https://www.indiabix.com/aptitude/volume-and-surface-area/", source: "IndiaBix" }
    ]
  },
  { 
    id: "syllogism", title: "Syllogism", category: "Logical", icon: Brain, progress: 0, strength: "Beginner", questionsTotal: 55, questionsAttempted: 0, color: "from-rose-400 to-rose-500", description: "Statements and conclusions, Venn diagrams, logical deduction",
    readings: [
      { title: "Syllogism Concepts", url: "https://www.geeksforgeeks.org/syllogism/", source: "GeeksforGeeks" },
      { title: "Syllogism Practice", url: "https://www.indiabix.com/logical-reasoning/syllogism/", source: "IndiaBix" }
    ]
  },
  { 
    id: "sentence-correction", title: "Sentence Correction", category: "Verbal", icon: Pen, progress: 0, strength: "Beginner", questionsTotal: 90, questionsAttempted: 0, color: "from-yellow-400 to-yellow-500", description: "Grammar, syntax, subject-verb agreement, modifiers",
    readings: [
      { title: "Sentence Correction Rules", url: "https://www.indiabix.com/verbal-ability/sentence-correction/", source: "IndiaBix" },
      { title: "Grammar Basics", url: "https://www.codingshuttle.com/", source: "CodingShuttle" }
    ]
  },
  { 
    id: "synonyms-antonyms", title: "Synonyms & Antonyms", category: "Verbal", icon: Languages, progress: 0, strength: "Beginner", questionsTotal: 150, questionsAttempted: 0, color: "from-amber-400 to-amber-500", description: "Vocabulary building, similar and opposite meanings",
    readings: [
      { title: "Synonyms Practice", url: "https://www.indiabix.com/verbal-ability/synonyms/", source: "IndiaBix" },
      { title: "Antonyms Practice", url: "https://www.indiabix.com/verbal-ability/antonyms/", source: "IndiaBix" }
    ]
  },
  { 
    id: "data-structures", title: "Data Structures", category: "Technical", icon: Code2, progress: 0, strength: "Beginner", questionsTotal: 120, questionsAttempted: 0, color: "from-blue-500 to-indigo-500", description: "Arrays, Linked Lists, Trees, Graphs, Hash Tables",
    readings: [
      { title: "Data Structures Tutorial", url: "https://www.geeksforgeeks.org/data-structures/", source: "GeeksforGeeks" },
      { title: "DS Practice", url: "https://www.indiabix.com/technical/data-structures/", source: "IndiaBix" }
    ]
  },
  { 
    id: "algorithms", title: "Algorithms", category: "Technical", icon: Terminal, progress: 0, strength: "Beginner", questionsTotal: 100, questionsAttempted: 0, color: "from-violet-500 to-purple-500", description: "Sorting, Searching, Dynamic Programming, Greedy",
    readings: [
      { title: "Algorithms Tutorial", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/", source: "GeeksforGeeks" }
    ]
  },
  { 
    id: "dbms", title: "DBMS", category: "Technical", icon: Target, progress: 0, strength: "Beginner", questionsTotal: 85, questionsAttempted: 0, color: "from-emerald-500 to-teal-500", description: "SQL, Normalization, Transactions, Concurrency",
    readings: [
      { title: "DBMS Concepts", url: "https://www.geeksforgeeks.org/dbms/", source: "GeeksforGeeks" },
      { title: "Database Questions", url: "https://www.indiabix.com/database/questions-and-answers/", source: "IndiaBix" }
    ]
  },
  { 
    id: "operating-systems", title: "Operating Systems", category: "Technical", icon: Brain, progress: 0, strength: "Beginner", questionsTotal: 75, questionsAttempted: 0, color: "from-rose-500 to-pink-500", description: "Processes, Threads, Memory Management, Deadlocks",
    readings: [
      { title: "OS Tutorial", url: "https://www.geeksforgeeks.org/operating-systems/", source: "GeeksforGeeks" }
    ]
  }
];

function getStrengthColor(strength: string) {
  switch (strength) {
    case "Advanced": return "text-accent bg-accent/10";
    case "Intermediate": return "text-amber-500 bg-amber-500/10";
    default: return "text-red-400 bg-red-400/10";
  }
}

export default function AptitudePage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = topics.filter((t) => {
    const matchCat = active === "All" || t.category === active;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🧠 Aptitude Topics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Master 15 topics across Quantitative, Logical & Verbal reasoning
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics..."
            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Topic Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card rounded-2xl p-5 card-hover group"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <topic.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStrengthColor(topic.strength)}`}>
                {topic.strength}
              </span>
            </div>

            {/* Title & description */}
            <h3 className="text-base font-semibold mb-1">{topic.title}</h3>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
              {topic.description}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">
                  {topic.questionsAttempted}/{topic.questionsTotal} questions
                </span>
                {topic.questionsAttempted > 0 && (
                  <span className="text-xs font-semibold">{topic.progress}%</span>
                )}
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${topic.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.progress}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/quiz?topic=${topic.id}`}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Target className="w-3.5 h-3.5" /> Practice
              </Link>
              <Link
                href={`/mentor?topic=${topic.title}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
              >
                <Bot className="w-3.5 h-3.5" /> Ask AI
              </Link>
            </div>

            {/* Preparation Readings (Only shown if questionsAttempted > 0) */}
            {topic.questionsAttempted > 0 && topic.readings && topic.readings.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Preparation Readings
                </p>
                <ul className="space-y-2">
                  {topic.readings.map((reading, idx) => (
                    <li key={idx}>
                      <a 
                        href={reading.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-start gap-1.5 text-xs text-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 mt-0.5" />
                        <span>
                          <span className="font-medium">{reading.title}</span>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">{reading.source}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No topics found matching your search.</p>
        </div>
      )}
    </div>
  );
}
