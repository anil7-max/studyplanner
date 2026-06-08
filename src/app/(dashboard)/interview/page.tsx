"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Users,
  Code2,
  Heart,
  Building2,
  ChevronRight,
  Send,
  Sparkles,
  Star,
  CheckCircle2,
  ArrowLeft,
  Lightbulb,
  Target,
  BookOpen,
} from "lucide-react";

interface QuestionItem {
  id: number;
  question: string;
  category: string;
  answer: { situation: string; task: string; action: string; result: string; tips: string[] };
}

const questionBank: QuestionItem[] = [
  // HR
  { id: 1, question: "Tell me about yourself.", category: "HR", answer: { situation: "The interviewer wants a concise professional summary.", task: "Present a structured 2-minute pitch covering education, skills, and career goals.", action: "Start with your educational background, highlight key skills and projects, mention relevant experiences, and end with your career aspirations.", result: "This creates a strong first impression and sets the tone for the interview.", tips: ["Keep it under 2 minutes", "Focus on professional, not personal", "End with why you're excited about this role"] } },
  { id: 2, question: "Why should we hire you?", category: "HR", answer: { situation: "The interviewer is assessing your value proposition.", task: "Demonstrate how your skills align with the job requirements.", action: "Highlight 2-3 key skills that match the job description, mention relevant projects or achievements, and show enthusiasm for the role.", result: "Conveys confidence and shows you've researched the role and company.", tips: ["Be specific with examples", "Show how you'll add value", "Don't be generic"] } },
  { id: 3, question: "What are your strengths and weaknesses?", category: "HR", answer: { situation: "The interviewer evaluates self-awareness.", task: "Share genuine strengths with evidence and a real weakness with improvement steps.", action: "Choose strengths relevant to the role with specific examples. For weakness, pick something genuine but not critical, and explain how you're actively improving.", result: "Shows maturity, self-awareness, and a growth mindset.", tips: ["Avoid cliché weaknesses like 'perfectionist'", "Give concrete examples", "Show improvement steps for weakness"] } },
  { id: 4, question: "Where do you see yourself in 5 years?", category: "HR", answer: { situation: "Evaluating your ambition and commitment.", task: "Show alignment between your career goals and the company's growth.", action: "Express interest in growing within the company, developing expertise in your field, and taking on increasing responsibility.", result: "Demonstrates long-term thinking and commitment to professional growth.", tips: ["Align goals with company trajectory", "Show ambition without seeming unrealistic", "Focus on skill development"] } },
  // Technical
  { id: 5, question: "Explain the difference between REST and GraphQL.", category: "Technical", answer: { situation: "Testing knowledge of API architectures.", task: "Clearly differentiate both approaches with use cases.", action: "REST uses multiple endpoints with fixed data structures. GraphQL uses a single endpoint where clients specify exactly what data they need. REST is simpler and better cached, GraphQL reduces over-fetching.", result: "Shows deep understanding of modern web architecture.", tips: ["Mention pros/cons of each", "Give real-world use cases", "Discuss when to use which"] } },
  { id: 6, question: "What is the difference between TCP and UDP?", category: "Technical", answer: { situation: "Assessing networking fundamentals.", task: "Compare both protocols clearly.", action: "TCP is connection-oriented, reliable, ordered delivery with error checking. UDP is connectionless, faster but unreliable. TCP: web browsing, email. UDP: video streaming, gaming.", result: "Demonstrates strong networking fundamentals.", tips: ["Give practical examples", "Mention the handshake process", "Discuss when speed vs reliability matters"] } },
  { id: 7, question: "Explain SOLID principles with examples.", category: "Technical", answer: { situation: "Evaluating software design knowledge.", task: "Explain each principle with practical examples.", action: "S: Single Responsibility - one class, one job. O: Open/Closed - extend without modifying. L: Liskov Substitution - subtypes replaceable. I: Interface Segregation - specific interfaces. D: Dependency Inversion - depend on abstractions.", result: "Shows strong OOP and design pattern knowledge.", tips: ["Use simple code examples", "Relate to real projects you've built", "Show you apply these in practice"] } },
  // Behavioral
  { id: 8, question: "Tell me about a time you faced a conflict in a team.", category: "Behavioral", answer: { situation: "During a college project, two team members disagreed on the tech stack — one wanted React, the other Angular.", task: "As team lead, I needed to resolve the conflict and keep the project on track.", action: "I organized a meeting where each person presented their reasoning. We evaluated both options against project requirements, deadline, and team familiarity. We chose React based on objective criteria.", result: "The project was completed on time, both members felt heard, and we received the highest grade in class.", tips: ["Stay neutral in your narrative", "Focus on resolution, not blame", "Highlight leadership skills"] } },
  { id: 9, question: "Describe a situation where you failed and what you learned.", category: "Behavioral", answer: { situation: "In my first hackathon, I tried to build an overly ambitious project alone.", task: "I needed to deliver a working prototype in 24 hours.", action: "I underestimated scope, didn't plan properly, and refused to simplify features. The project was incomplete at demo time.", result: "I learned the importance of MVP thinking, proper planning, and scope management. My next hackathon, I planned carefully and won 2nd place.", tips: ["Be genuine about the failure", "Focus more on the learning", "Show growth from the experience"] } },
  // Situational
  { id: 10, question: "Your manager asks you to do something you disagree with. What do you do?", category: "Situational", answer: { situation: "Your manager proposes an approach you believe has technical flaws.", task: "Navigate the disagreement professionally while ensuring the best outcome.", action: "Request a private conversation, present your concerns with data and alternatives. Listen to their perspective — they may have context you don't. If they still want their approach, execute it professionally while documenting your concerns.", result: "Shows professionalism, critical thinking, and ability to disagree constructively while maintaining team harmony.", tips: ["Never challenge authority publicly", "Use data, not emotions", "Accept the final decision gracefully"] } },
  { id: 11, question: "How would you handle a tight deadline with incomplete requirements?", category: "Situational", answer: { situation: "A client project has a 2-week deadline but requirements are vague.", task: "Deliver a quality product despite ambiguity.", action: "Clarify the most critical features, make reasonable assumptions (documented), build an MVP first, get early feedback, iterate. Communicate risks to stakeholders proactively.", result: "Delivers a working product, manages expectations, and demonstrates adaptability.", tips: ["Prioritize ruthlessly", "Document assumptions", "Communicate early and often"] } },
];

const categories = [
  { id: "HR", label: "HR Interview", icon: Users, color: "from-blue-500 to-blue-600", count: 4 },
  { id: "Technical", label: "Technical", icon: Code2, color: "from-violet-500 to-purple-500", count: 3 },
  { id: "Behavioral", label: "Behavioral", icon: Heart, color: "from-pink-500 to-rose-500", count: 2 },
  { id: "Situational", label: "Situational", icon: Building2, color: "from-amber-500 to-orange-500", count: 2 },
];

export default function InterviewPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);
  const [customQuestion, setCustomQuestion] = useState("");
  const [customAnswer, setCustomAnswer] = useState<QuestionItem["answer"] | null>(null);

  const filteredQuestions = activeCategory
    ? questionBank.filter((q) => q.category === activeCategory)
    : [];

  const handleCustomSubmit = () => {
    if (!customQuestion.trim()) return;
    setCustomAnswer({
      situation: "You've been asked this question in an interview setting to evaluate your thinking and communication skills.",
      task: "Provide a clear, structured response that demonstrates your competence and self-awareness.",
      action: `For "${customQuestion}", structure your answer using the STAR method. Start with context, explain what was needed, describe specific actions you took, and quantify the outcome. Practice delivering this in under 2 minutes with natural confidence.`,
      result: "A well-structured STAR response shows interviewers you can communicate clearly, think critically, and deliver results.",
      tips: [
        "Keep your answer under 2 minutes",
        "Use specific examples from your experience",
        "Quantify results wherever possible",
        "Practice out loud before the interview",
        "End on a positive, forward-looking note",
      ],
    });
  };

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">💬 Interview Prep</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Master HR, Technical, Behavioral & Situational questions with STAR method answers
        </p>
      </div>

      {/* Custom Question */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> Ask Your Own Question
        </h3>
        <div className="flex gap-3">
          <input
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
            placeholder="Type any interview question..."
            className="flex-1 px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={handleCustomSubmit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" /> Get Answer
          </button>
        </div>

        {/* Custom Answer */}
        <AnimatePresence>
          {customAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <STARAnswer answer={customAnswer} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Cards */}
      {!selectedQuestion && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`glass-card rounded-2xl p-5 text-left card-hover group ${
                activeCategory === cat.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{cat.label}</h3>
              <p className="text-xs text-muted-foreground">{cat.count} questions</p>
            </motion.button>
          ))}
        </div>
      )}

      {/* Question List */}
      <AnimatePresence mode="wait">
        {activeCategory && !selectedQuestion && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {activeCategory} Questions
            </h3>
            {filteredQuestions.map((q, i) => (
              <motion.button
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedQuestion(q)}
                className="w-full glass-card rounded-xl p-4 flex items-center justify-between text-left hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium">{q.question}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Selected Question Detail */}
        {selectedQuestion && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <button
              onClick={() => setSelectedQuestion(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to questions
            </button>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {selectedQuestion.category}
                </span>
              </div>
              <h2 className="text-lg font-semibold mb-6">{selectedQuestion.question}</h2>
              <STARAnswer answer={selectedQuestion.answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function STARAnswer({ answer }: { answer: QuestionItem["answer"] }) {
  const starSteps = [
    { letter: "S", label: "Situation", content: answer.situation, color: "bg-blue-500" },
    { letter: "T", label: "Task", content: answer.task, color: "bg-amber-500" },
    { letter: "A", label: "Action", content: answer.action, color: "bg-violet-500" },
    { letter: "R", label: "Result", content: answer.result, color: "bg-accent" },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        <Star className="w-4 h-4 text-yellow-500" /> STAR Method Answer
      </h4>
      <div className="space-y-3">
        {starSteps.map((step, i) => (
          <motion.div
            key={step.letter}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3"
          >
            <div className={`w-8 h-8 rounded-lg ${step.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
              {step.letter}
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-0.5">{step.label}</div>
              <p className="text-sm leading-relaxed">{step.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      {answer.tips.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <h5 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" /> Pro Tips
          </h5>
          <ul className="space-y-1">
            {answer.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
