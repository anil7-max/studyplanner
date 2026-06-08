"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Lightbulb,
  Brain,
  FileText,
  MessageSquare,
  Code2,
  Target,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: Brain, label: "Aptitude Tips", prompt: "Give me the top 5 tips to improve my aptitude score quickly" },
  { icon: FileText, label: "Resume Help", prompt: "How should I structure my resume as a fresher for tech companies?" },
  { icon: MessageSquare, label: "Interview Strategy", prompt: "What's the best strategy to prepare for HR interviews in 1 week?" },
  { icon: Code2, label: "DSA Roadmap", prompt: "Give me a 30-day DSA preparation roadmap for placement coding rounds" },
  { icon: Target, label: "Placement Readiness", prompt: "How do I assess if I'm placement-ready? What areas should I focus on?" },
  { icon: Lightbulb, label: "Career Guidance", prompt: "I'm confused between SWE and Data Analyst roles. Help me decide." },
];

/* ─── AI Response Generator (Mock) ─── */
function generateAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("aptitude") || lower.includes("quant")) {
    return `## 🧠 Aptitude Improvement Strategy

Here are my top recommendations to boost your aptitude score:

**1. Master the Fundamentals First**
- Start with Percentage, Ratio, and Average — they appear in 60% of questions
- Don't jump to complex topics until basics are solid

**2. Practice with Timer**
- Set 1-2 minutes per question maximum
- Speed comes from pattern recognition, not calculation speed

**3. Learn Shortcut Techniques**
- Vedic math for multiplication/division
- Percentage to fraction conversions (12.5% = 1/8)
- Use approximation for Data Interpretation

**4. Daily Practice Routine**
- 📌 20 questions/day minimum
- 📌 Focus on 1 topic per day
- 📌 Review mistakes before sleep

**5. Mock Tests Weekly**
- Take at least 2 full-length mock tests per week
- Analyze every wrong answer — understanding errors > solving more

> 💡 **Pro Tip:** Most students fail aptitude not because of difficulty, but time management. Practice speed more than accuracy initially.

Need help with a specific topic? I can create a customized plan!`;
  }

  if (lower.includes("resume") || lower.includes("cv")) {
    return `## 📄 Fresher Resume Guide

Here's how to build an ATS-friendly resume that gets shortlisted:

**Structure (in this order):**
1. **Header** — Name, Email, Phone, LinkedIn, GitHub
2. **Education** — Degree, College, CGPA, Year
3. **Skills** — Categorized (Languages, Frameworks, Tools, Databases)
4. **Projects** (2-3 key projects)
5. **Experience/Internships** (if any)
6. **Certifications**
7. **Achievements**

**Key Rules:**
- ✅ Use action verbs: *Developed, Implemented, Designed, Optimized*
- ✅ Add metrics: *"Improved load time by 40%"*
- ✅ Keep it 1 page for freshers
- ❌ Avoid: *"Worked on"*, *"Helped with"*, *"Responsible for"*
- ❌ No photos, no fancy graphics (ATS can't read them)

**Example Project Description:**
> **E-Commerce Platform** | React.js, Node.js, MongoDB
> Developed a full-stack e-commerce application with user authentication, product catalog, and payment integration. Implemented RESTful APIs serving 500+ daily requests with 99.9% uptime.

Want me to review your resume text? Paste it here!`;
  }

  if (lower.includes("interview") || lower.includes("hr")) {
    return `## 💬 Interview Preparation Strategy

Here's a comprehensive plan for interview success:

**Before the Interview:**
- 📋 Research the company (products, culture, recent news)
- 📋 Prepare STAR method answers for 10 common questions
- 📋 Practice "Tell me about yourself" (2-minute version)
- 📋 Prepare 3 thoughtful questions to ask the interviewer

**The STAR Method:**
- **S**ituation — Set the context
- **T**ask — What was your role/challenge?
- **A**ction — What did YOU specifically do?
- **R**esult — What was the measurable outcome?

**Top 5 Questions to Master:**
1. Tell me about yourself
2. Why should we hire you?
3. What are your strengths and weaknesses?
4. Where do you see yourself in 5 years?
5. Tell me about a challenge you overcame

**During the Interview:**
- 🎯 Maintain eye contact (on camera for virtual)
- 🎯 Use confident body language
- 🎯 Take a pause before answering — it shows thoughtfulness
- 🎯 End answers with "Does that answer your question?"

**Communication Tips:**
- Speak at a moderate pace
- Use structured answers (First... Second... Finally...)
- Avoid filler words (um, uh, like, basically)

Need me to mock-interview you on a specific question?`;
  }

  if (lower.includes("dsa") || lower.includes("coding") || lower.includes("data structure")) {
    return `## 💻 30-Day DSA Roadmap for Placements

**Week 1: Arrays & Strings**
- Day 1-2: Array basics, two pointers, sliding window
- Day 3-4: String manipulation, pattern matching
- Day 5-7: Practice 15 LeetCode Easy/Medium problems

**Week 2: Linked Lists, Stacks & Queues**
- Day 8-9: Linked list operations (reverse, detect cycle)
- Day 10-11: Stack applications (valid parentheses, next greater element)
- Day 12-14: Queue, Deque, practice problems

**Week 3: Trees & Graphs**
- Day 15-16: Binary trees (traversals, BST)
- Day 17-18: Graph basics (BFS, DFS)
- Day 19-21: Practice tree/graph problems

**Week 4: DP, Recursion & Advanced**
- Day 22-23: Recursion and backtracking
- Day 24-26: Dynamic programming (1D and 2D)
- Day 27-28: Greedy algorithms
- Day 29-30: Mixed practice + mock coding test

**Key Patterns to Master:**
1. Two Pointers
2. Sliding Window
3. Binary Search variants
4. BFS/DFS
5. Dynamic Programming (Fibonacci, Knapsack)

> 🎯 **Target:** Solve 100+ problems total (40 Easy, 50 Medium, 10 Hard)

Want me to recommend specific problems for any topic?`;
  }

  if (lower.includes("career") || lower.includes("role") || lower.includes("decide") || lower.includes("confused")) {
    return `## 🎯 Career Decision Framework

Let me help you decide with a structured approach:

**Ask yourself these 5 questions:**

1. **What energizes you more?**
   - Building products → SWE
   - Finding insights from data → Data Analyst
   - Strategy & people → Product Manager
   - Systems & automation → DevOps

2. **What are your strongest skills?**
   - Strong in DSA → SWE
   - Love SQL & statistics → Data Analyst
   - Great communicator → PM
   - Love Linux & cloud → DevOps

3. **Salary expectations?**
   - Highest entry-level packages → SWE
   - Steady growth → Data Analyst
   - High ceiling → PM (long-term)

4. **Work preference?**
   - Deep focused coding → SWE
   - Stakeholder interaction → PM, Data Analyst
   - On-call & operations → DevOps

5. **5-year vision?**
   - Tech lead / Architect → SWE
   - Analytics Manager → Data Analyst
   - VP of Product → PM
   - Cloud Architect → DevOps

**My Recommendation:**
Start with what you're naturally curious about. Skills can be built, but interest sustains motivation through the tough parts.

Would you like a detailed comparison of any two specific roles?`;
  }

  if (lower.includes("placement") || lower.includes("ready")) {
    return `## ✅ Placement Readiness Checklist

Rate yourself on each area (1-10) to assess your readiness:

**Aptitude (Target: 7+/10)**
- [ ] Can solve 20 problems in 30 minutes
- [ ] Comfortable with all major topics
- [ ] Mock test scores consistently above 70%

**Technical Skills (Target: 7+/10)**
- [ ] Solved 100+ DSA problems
- [ ] Can explain OOPS concepts with examples
- [ ] Understand database concepts (SQL, normalization)
- [ ] Know at least one framework well

**Resume (Target: 8+/10)**
- [ ] ATS score above 80
- [ ] 2-3 solid projects with descriptions
- [ ] No grammar or formatting issues
- [ ] All links working (GitHub, LinkedIn)

**Interview (Target: 7+/10)**
- [ ] Can deliver "Tell me about yourself" smoothly
- [ ] Have STAR answers for 10 common questions
- [ ] Comfortable with technical explanation
- [ ] Good body language and communication

**Overall Assessment:**
- 🔴 0-5 average: Need significant preparation
- 🟡 5-7 average: Getting there, focus on weak areas
- 🟢 7-9 average: Placement ready!
- 🏆 9-10 average: You'll have multiple offers

Share your self-assessment and I'll create a personalized improvement plan!`;
  }

  // Default response
  return `## 🤖 Great Question!

I'd be happy to help you with your placement preparation. Here are some areas I can assist with:

- 🧠 **Aptitude** — Topic-wise strategies, shortcuts, practice tips
- 💻 **Coding** — DSA roadmaps, problem recommendations, concept explanations
- 📄 **Resume** — Structure, content, ATS optimization advice
- 💬 **Interviews** — HR, Technical, Behavioral preparation strategies
- 🎯 **Career** — Role comparisons, salary insights, growth paths
- 📅 **Study Planning** — Customized preparation schedules

Could you be more specific about what you'd like help with? For example:
- *"How do I prepare for TCS NQT in 2 weeks?"*
- *"What are the most important DSA topics for placements?"*
- *"Help me prepare for a technical interview at Infosys"*

I'm here to be your personal placement mentor! 🚀`;
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "## 👋 Hi! I'm your AI Placement Mentor\n\nI'm here to help you prepare for placements, guide your career decisions, and answer any questions about aptitude, coding, resumes, interviews, and more.\n\n**Try asking me:**\n- How to improve aptitude scores\n- Resume building tips for freshers\n- Interview preparation strategies\n- DSA study roadmap\n\nOr click one of the quick prompts below to get started! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared! How can I help you prepare for placements? 🚀",
        timestamp: new Date(),
      },
    ]);
  };

  /* Simple markdown-ish renderer */
  function renderContent(content: string) {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h3 key={i} className="text-lg font-bold mb-2 mt-3 first:mt-0">{line.replace("## ", "")}</h3>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-semibold mt-3 mb-1">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.startsWith("- ")) {
        const text = line.replace("- ", "");
        return (
          <div key={i} className="flex items-start gap-2 ml-2 my-0.5">
            <span className="text-primary mt-1.5 text-xs">•</span>
            <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
          </div>
        );
      }
      if (line.startsWith("> ")) {
        return (
          <div key={i} className="border-l-3 border-primary pl-3 my-2 text-muted-foreground italic">
            {line.replace("> ", "")}
          </div>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <div key={i} className="ml-2 my-0.5">
            <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
          </div>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return (
        <p key={i} className="my-0.5">
          <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
        </p>
      );
    });
  }

  return (
    <div className="page-container flex flex-col" style={{ height: "calc(100vh - 7rem)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">🤖 AI Mentor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your personal AI-powered placement guide
          </p>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Clear Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""} chat-bubble-in`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-primary/10"
                      : "gradient-bg"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative group ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary rounded-tl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? renderContent(msg.content) : msg.content}

                  {/* Copy button */}
                  {msg.role === "assistant" && msg.id !== "welcome" && (
                    <button
                      onClick={() => copyMessage(msg.id, msg.content)}
                      className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <><Check className="w-3 h-3" /> Copied</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dot" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dot" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dot" />
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-5 pb-3">
            <div className="flex gap-2 flex-wrap">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(qp.prompt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  <qp.icon className="w-3.5 h-3.5" />
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about placements, career, aptitude..."
            className="flex-1 px-4 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
