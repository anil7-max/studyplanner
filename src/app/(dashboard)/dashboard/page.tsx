"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Target,
  FileText,
  MessageSquare,
  Code2,
  Brain,
  CalendarDays,
  Bot,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  Lightbulb,
  BarChart3,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";

/* ─── Data ─── */
const progressData = [
  { week: "W1", score: 25 },
  { week: "W2", score: 32 },
  { week: "W3", score: 45 },
  { week: "W4", score: 52 },
  { week: "W5", score: 61 },
  { week: "W6", score: 68 },
  { week: "W7", score: 75 },
  { week: "W8", score: 82 },
];

const radarData = [
  { skill: "Aptitude", value: 72 },
  { skill: "Coding", value: 65 },
  { skill: "Resume", value: 88 },
  { skill: "Interview", value: 58 },
  { skill: "Communication", value: 70 },
  { skill: "Technical", value: 60 },
];

const weeklyData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 4.5 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 5.0 },
  { day: "Sat", hours: 6.0 },
  { day: "Sun", hours: 4.0 },
];

const dailyTasks = [
  { task: "Complete 10 aptitude questions", done: true },
  { task: "Solve 2 coding problems", done: true },
  { task: "Review resume feedback", done: false },
  { task: "Practice 1 mock interview", done: false },
  { task: "Read communication tips", done: false },
];

const weeklyGoals = [
  { goal: "Finish Percentage topic", progress: 80 },
  { goal: "Build portfolio project", progress: 45 },
  { goal: "Complete 3 mock interviews", progress: 33 },
  { goal: "Update resume sections", progress: 90 },
];

const quickActions = [
  { icon: Brain, label: "Practice Aptitude", href: "/aptitude", color: "from-blue-500 to-cyan-500" },
  { icon: Target, label: "Take Quiz", href: "/quiz", color: "from-violet-500 to-purple-500" },
  { icon: FileText, label: "Analyze Resume", href: "/resume", color: "from-emerald-500 to-green-500" },
  { icon: MessageSquare, label: "Interview Prep", href: "/interview", color: "from-orange-500 to-amber-500" },
  { icon: Bot, label: "Ask AI Mentor", href: "/mentor", color: "from-pink-500 to-rose-500" },
  { icon: CalendarDays, label: "Study Plan", href: "/planner", color: "from-indigo-500 to-blue-500" },
];

const tips = [
  "💡 Start your day with 10 aptitude questions to warm up your brain!",
  "💡 Use the STAR method for every behavioral question — Situation, Task, Action, Result.",
  "💡 Your resume should have quantifiable achievements, not just job descriptions.",
  "💡 Practice coding problems in the morning when your mind is fresh.",
  "💡 Research the company culture before your interview — it shows genuine interest.",
];

/* ─── Circular Progress ─── */
function CircularProgress({ value, size = 120, label }: { value: number; size?: number; label: string }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 71 ? "#22C55E" : value >= 41 ? "#F59E0B" : "#EF4444";
  const status = value >= 91 ? "Industry Ready" : value >= 71 ? "Placement Ready" : value >= 41 ? "Intermediate" : "Beginner";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth="8" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground" style={{ color }}>{status}</div>
      </div>
    </div>
  );
}

/* ─── Score Widget ─── */
function ScoreWidget({ icon: Icon, label, score, color, trend }: { icon: React.ElementType; label: string; score: number; color: string; trend: string }) {
  return (
    <div className="glass-card rounded-xl p-4 card-hover">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-accent font-medium flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {trend}
        </span>
      </div>
      <div className="text-2xl font-bold mb-1">{score}%</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [todayTip, setTodayTip] = React.useState(tips[0]);

  React.useEffect(() => {
    setTodayTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <div className="page-container space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track your placement readiness and keep building momentum.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-500">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-semibold">12 Day Streak 🔥</span>
          </div>
        </div>
      </div>

      {/* Daily Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-4 flex items-center gap-3 border-l-4 border-primary"
      >
        <Lightbulb className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm">{todayTip}</p>
      </motion.div>

      {/* Placement Readiness + Score Widgets */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Readiness Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 glass-card rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <CircularProgress value={68} label="Placement Readiness" />
        </motion.div>

        {/* Score Widgets */}
        <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreWidget icon={FileText} label="Resume Score" score={88} color="from-emerald-500 to-green-500" trend="+12%" />
          <ScoreWidget icon={Brain} label="Aptitude Score" score={72} color="from-blue-500 to-cyan-500" trend="+8%" />
          <ScoreWidget icon={Code2} label="Coding Score" score={65} color="from-violet-500 to-purple-500" trend="+15%" />
          <ScoreWidget icon={MessageSquare} label="Interview Score" score={58} color="from-orange-500 to-amber-500" trend="+5%" />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Learning Progress
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#2563EB" }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Skill Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" /> Skill Radar
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar
                dataKey="value"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Weekly Activity
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="hours" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row: Tasks, Goals, Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" /> Daily Tasks
          </h3>
          <div className="space-y-3">
            {dailyTasks.map((t, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={t.done}
                  className="w-4 h-4 rounded border-border accent-accent"
                />
                <span className={`text-sm ${t.done ? "line-through text-muted-foreground" : ""} group-hover:text-primary transition-colors`}>
                  {t.task}
                </span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Weekly Goals
          </h3>
          <div className="space-y-4">
            {weeklyGoals.map((g, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm">{g.goal}</span>
                  <span className="text-xs font-medium text-muted-foreground">{g.progress}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${g.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <a.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-center">{a.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
