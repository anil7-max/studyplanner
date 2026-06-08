"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BarChart3,
  Target,
  Shield,
  Search,
  Type,
  ArrowRight,
  RotateCcw,
  Loader2,
  Lightbulb,
} from "lucide-react";

/* ─── Analysis Data ─── */
interface AnalysisResult {
  overallScore: number;
  atsScore: number;
  grammarScore: number;
  professionalismScore: number;
  keywordScore: number;
  criticalErrors: string[];
  improvements: string[];
  doneWell: string[];
  suggestions: { before: string; after: string }[];
}

function analyzeResume(text: string): AnalysisResult {
  const wordCount = text.split(/\s+/).length;
  const hasEmail = /\S+@\S+\.\S+/.test(text);
  const hasPhone = /\d{10}|\(\d{3}\)\s?\d{3}-\d{4}/.test(text);
  const hasLinkedIn = /linkedin/i.test(text);
  const hasGithub = /github/i.test(text);
  const hasEducation = /education|university|college|degree|b\.tech|b\.e\.|m\.tech|bsc|msc/i.test(text);
  const hasExperience = /experience|internship|work|project/i.test(text);
  const hasSkills = /skill|technology|proficient|expertise/i.test(text);
  const hasActionVerbs = /developed|designed|implemented|built|created|managed|led|optimized|improved|architected/i.test(text);
  const hasQuantifiable = /\d+%|\d+ users|\d+ clients|\$\d+|increased|decreased|reduced|improved by/i.test(text);
  const weakVerbs = /worked on|helped|assisted|was responsible|did|made/gi;
  const weakVerbCount = (text.match(weakVerbs) || []).length;

  let atsScore = 50;
  let grammarScore = 70;
  let professionalismScore = 60;
  let keywordScore = 40;

  if (hasEmail) atsScore += 8;
  if (hasPhone) atsScore += 7;
  if (hasLinkedIn) { atsScore += 5; keywordScore += 5; }
  if (hasGithub) { atsScore += 5; keywordScore += 5; }
  if (hasEducation) { atsScore += 10; professionalismScore += 10; }
  if (hasExperience) { atsScore += 10; professionalismScore += 10; }
  if (hasSkills) { atsScore += 5; keywordScore += 15; }
  if (hasActionVerbs) { professionalismScore += 10; keywordScore += 10; }
  if (hasQuantifiable) { professionalismScore += 10; keywordScore += 10; }
  if (wordCount > 200) grammarScore += 10;
  if (wordCount > 100 && wordCount < 800) atsScore += 5;
  if (weakVerbCount > 0) { grammarScore -= weakVerbCount * 5; professionalismScore -= weakVerbCount * 3; }

  atsScore = Math.min(100, Math.max(20, atsScore));
  grammarScore = Math.min(100, Math.max(20, grammarScore));
  professionalismScore = Math.min(100, Math.max(20, professionalismScore));
  keywordScore = Math.min(100, Math.max(20, keywordScore));

  const overallScore = Math.round((atsScore + grammarScore + professionalismScore + keywordScore) / 4);

  const criticalErrors: string[] = [];
  const improvements: string[] = [];
  const doneWell: string[] = [];

  if (!hasEmail) criticalErrors.push("Missing email address — recruiters can't contact you");
  if (!hasPhone) criticalErrors.push("No phone number found");
  if (!hasEducation) criticalErrors.push("Education section is missing or unrecognizable");
  if (weakVerbCount > 2) criticalErrors.push(`Found ${weakVerbCount} weak action verbs (e.g., 'worked on', 'helped')`);

  if (!hasLinkedIn) improvements.push("Add your LinkedIn profile URL");
  if (!hasGithub) improvements.push("Include your GitHub profile for technical roles");
  if (!hasQuantifiable) improvements.push("Add quantifiable achievements (numbers, percentages, metrics)");
  if (!hasActionVerbs) improvements.push("Use strong action verbs: Developed, Designed, Implemented, Optimized");
  if (wordCount < 150) improvements.push("Resume seems too brief — add more detail about your projects and skills");
  if (wordCount > 700) improvements.push("Consider condensing — keep it to 1-2 pages max");

  if (hasEmail) doneWell.push("Contact email is present");
  if (hasPhone) doneWell.push("Phone number included");
  if (hasSkills) doneWell.push("Skills section is present");
  if (hasActionVerbs) doneWell.push("Using strong action verbs in descriptions");
  if (hasQuantifiable) doneWell.push("Quantifiable achievements included");
  if (hasEducation) doneWell.push("Education section properly included");

  const suggestions: { before: string; after: string }[] = [];
  if (weakVerbCount > 0) {
    suggestions.push({
      before: "Worked on the company website and helped with backend development.",
      after: "Developed and maintained a full-stack web application using React.js and Node.js, improving page load time by 40%.",
    });
  }
  suggestions.push({
    before: "Made a project using Python for data analysis.",
    after: "Built an automated data pipeline using Python and Pandas, processing 50,000+ records daily with 99.5% accuracy.",
  });

  return { overallScore, atsScore, grammarScore, professionalismScore, keywordScore, criticalErrors, improvements, doneWell, suggestions };
}

const manualChecklist = [
  "Resume is 1-2 pages maximum",
  "Contact info is at the top (Email, Phone, LinkedIn, GitHub)",
  "Education section includes CGPA/GPA and graduation date",
  "Skills are categorized (Programming, Frameworks, Tools)",
  "Each project has a clear description with tech stack",
  "Used action verbs (Developed, Implemented, Designed)",
  "Included quantifiable achievements (%, numbers, metrics)",
  "No spelling or grammatical errors",
  "Consistent formatting and font throughout",
  "Saved as PDF with a professional filename",
];

function ScoreRing({ score, label, size = 80 }: { score: number; label: string; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 80 ? "#22C55E" : score >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{score}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function ResumePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>(new Array(10).fill(false));

  const handleAnalyze = () => {
    if (text.trim().length < 30) return;
    setAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeResume(text));
      setAnalyzing(false);
    }, 1500);
  };

  const toggleCheck = (i: number) => {
    setChecklist((prev) => { const n = [...prev]; n[i] = !n[i]; return n; });
  };

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">📄 Resume Analyzer</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paste your resume text and get AI-powered ATS scoring, feedback & suggestions
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Input */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <label className="text-sm font-semibold mb-3 block">Paste Your Resume Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your entire resume text here...&#10;&#10;Include your name, contact info, education, skills, projects, experience, and achievements."
              className="w-full h-64 p-4 bg-secondary rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">{text.split(/\s+/).filter(Boolean).length} words</span>
              <button
                onClick={handleAnalyze}
                disabled={text.trim().length < 30 || analyzing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
              >
                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {analyzing ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          </div>

          {/* Manual Checklist */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" /> 10-Point Resume Checklist
            </h3>
            <div className="space-y-2.5">
              {manualChecklist.map((item, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checklist[i]}
                    onChange={() => toggleCheck(i)}
                    className="w-4 h-4 mt-0.5 rounded accent-accent shrink-0"
                  />
                  <span className={`text-sm ${checklist[i] ? "line-through text-muted-foreground" : ""} group-hover:text-primary transition-colors`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {checklist.filter(Boolean).length}/10 completed
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Scores */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" /> Resume Scores
                  </h3>
                  <div className="flex flex-wrap justify-center gap-6">
                    <ScoreRing score={result.overallScore} label="Overall" size={100} />
                    <ScoreRing score={result.atsScore} label="ATS" />
                    <ScoreRing score={result.grammarScore} label="Grammar" />
                    <ScoreRing score={result.professionalismScore} label="Professional" />
                    <ScoreRing score={result.keywordScore} label="Keywords" />
                  </div>
                </div>

                {/* Critical Errors */}
                {result.criticalErrors.length > 0 && (
                  <div className="glass-card rounded-2xl p-5 border-l-4 border-destructive">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-destructive">
                      <XCircle className="w-4 h-4" /> Critical Issues ({result.criticalErrors.length})
                    </h3>
                    <div className="space-y-2">
                      {result.criticalErrors.map((e, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-destructive shrink-0">❌</span>
                          <span>{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Improvements */}
                {result.improvements.length > 0 && (
                  <div className="glass-card rounded-2xl p-5 border-l-4 border-amber-500">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-amber-500">
                      <AlertTriangle className="w-4 h-4" /> Improvements Needed ({result.improvements.length})
                    </h3>
                    <div className="space-y-2">
                      {result.improvements.map((e, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-amber-500 shrink-0">⚠️</span>
                          <span>{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Done Well */}
                {result.doneWell.length > 0 && (
                  <div className="glass-card rounded-2xl p-5 border-l-4 border-accent">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-accent">
                      <CheckCircle2 className="w-4 h-4" /> Done Well ({result.doneWell.length})
                    </h3>
                    <div className="space-y-2">
                      {result.doneWell.map((e, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-accent shrink-0">✅</span>
                          <span>{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Suggestions */}
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" /> AI Suggestions
                  </h3>
                  <div className="space-y-4">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="space-y-2">
                        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 text-sm">
                          <span className="text-xs font-semibold text-destructive block mb-1">❌ Before:</span>
                          {s.before}
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 text-sm">
                          <span className="text-xs font-semibold text-accent block mb-1">✅ After:</span>
                          {s.after}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-16 text-center space-y-4 h-full flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Paste Your Resume</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Paste your resume text on the left and click &quot;Analyze Resume&quot; to get a detailed AI-powered analysis with scores and suggestions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
