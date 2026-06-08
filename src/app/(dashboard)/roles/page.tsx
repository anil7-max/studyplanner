"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Code2,
  BarChart3,
  Users,
  Server,
  DollarSign,
  Layers,
  Target,
  CheckCircle2,
  Star,
  ArrowLeft,
  ChevronRight,
  Briefcase,
  TrendingUp,
  Shield,
  Sparkles,
  Award,
  BookOpen,
} from "lucide-react";

interface RoleData {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  salaryRange: { entry: string; mid: string; senior: string };
  interviewRounds: { name: string; desc: string }[];
  skills: { name: string; level: number }[];
  beforeInterview: string[];
  duringInterview: string[];
  afterInterview: string[];
  topPerformers: string[];
  description: string;
}

const roles: RoleData[] = [
  {
    id: "swe",
    title: "Software Engineer",
    icon: Code2,
    color: "from-blue-500 to-blue-600",
    description: "Design, develop, and maintain software applications using modern technologies and best practices.",
    salaryRange: { entry: "₹4-8 LPA", mid: "₹10-20 LPA", senior: "₹25-50+ LPA" },
    interviewRounds: [
      { name: "Online Assessment", desc: "Aptitude + 2-3 coding problems (DSA)" },
      { name: "Technical Round 1", desc: "Data Structures, Algorithms, Problem Solving" },
      { name: "Technical Round 2", desc: "System Design, OOPS, Database concepts" },
      { name: "HR Round", desc: "Cultural fit, salary negotiation, behavioral" },
    ],
    skills: [
      { name: "Data Structures & Algorithms", level: 95 },
      { name: "System Design", level: 80 },
      { name: "OOPS Concepts", level: 90 },
      { name: "Database (SQL/NoSQL)", level: 75 },
      { name: "Version Control (Git)", level: 85 },
      { name: "Problem Solving", level: 95 },
      { name: "Web Frameworks", level: 70 },
      { name: "Operating Systems", level: 65 },
    ],
    beforeInterview: [
      "Practice 200+ LeetCode problems (Easy/Medium focus)",
      "Revise OOPS pillars with real examples",
      "Study system design basics (Load Balancer, Caching, DB sharding)",
      "Prepare your project explanations with architecture details",
      "Research company's tech stack and recent projects",
    ],
    duringInterview: [
      "Think aloud — explain your approach before coding",
      "Ask clarifying questions before jumping to solutions",
      "Start with brute force, then optimize",
      "Handle edge cases explicitly",
      "Write clean, readable code with proper variable names",
    ],
    afterInterview: [
      "Send a thank-you email within 24 hours",
      "Note down questions asked for future reference",
      "Reflect on areas where you struggled",
      "Follow up politely if no response in a week",
    ],
    topPerformers: [
      "Solve at least 1 DSA problem daily without fail",
      "Contribute to open-source projects on GitHub",
      "Build and deploy full-stack side projects",
      "Read engineering blogs from FAANG companies",
      "Practice system design weekly with peers",
      "Maintain a strong LinkedIn with regular tech posts",
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: BarChart3,
    color: "from-emerald-500 to-emerald-600",
    description: "Analyze data to extract insights, create visualizations, and drive data-informed business decisions.",
    salaryRange: { entry: "₹3-6 LPA", mid: "₹8-15 LPA", senior: "₹18-35+ LPA" },
    interviewRounds: [
      { name: "Aptitude/SQL Test", desc: "SQL queries, aptitude, basic statistics" },
      { name: "Technical Round", desc: "SQL, Python/R, Excel, Statistics" },
      { name: "Case Study", desc: "Business problem solving with data" },
      { name: "HR Round", desc: "Communication, cultural fit" },
    ],
    skills: [
      { name: "SQL & Database Querying", level: 95 },
      { name: "Python / R", level: 80 },
      { name: "Excel / Google Sheets", level: 90 },
      { name: "Data Visualization (Tableau/Power BI)", level: 85 },
      { name: "Statistics & Probability", level: 80 },
      { name: "Business Acumen", level: 75 },
      { name: "Communication Skills", level: 85 },
    ],
    beforeInterview: [
      "Master SQL joins, subqueries, window functions, CTEs",
      "Practice data analysis case studies",
      "Build a portfolio with Tableau/Power BI dashboards",
      "Brush up on statistics: mean, median, mode, standard deviation",
      "Prepare examples of insights that drove business decisions",
    ],
    duringInterview: [
      "Explain your analytical thought process clearly",
      "Ask about data quality and business context",
      "Show enthusiasm for uncovering insights from data",
      "Demonstrate storytelling with data",
    ],
    afterInterview: [
      "Send a follow-up with any analysis you promised",
      "Share your portfolio link in the thank-you email",
    ],
    topPerformers: [
      "Build a data analysis portfolio on GitHub/Kaggle",
      "Participate in Kaggle competitions",
      "Learn advanced SQL and window functions",
      "Practice creating executive-level dashboards",
      "Stay updated on industry data trends",
    ],
  },
  {
    id: "pm",
    title: "Product Manager",
    icon: Users,
    color: "from-violet-500 to-purple-500",
    description: "Define product vision, strategy, and roadmap while coordinating between engineering, design, and business teams.",
    salaryRange: { entry: "₹6-10 LPA", mid: "₹15-25 LPA", senior: "₹30-60+ LPA" },
    interviewRounds: [
      { name: "Resume Screening", desc: "Product sense, leadership, impact" },
      { name: "Product Design", desc: "Design a product for a specific user problem" },
      { name: "Estimation/Strategy", desc: "Market sizing, go-to-market strategy" },
      { name: "Behavioral", desc: "Leadership, teamwork, conflict resolution" },
    ],
    skills: [
      { name: "Product Strategy", level: 90 },
      { name: "User Research", level: 85 },
      { name: "Data Analysis", level: 75 },
      { name: "Wireframing / Prototyping", level: 70 },
      { name: "Communication & Stakeholder Mgmt", level: 95 },
      { name: "A/B Testing", level: 70 },
      { name: "Agile/Scrum", level: 85 },
    ],
    beforeInterview: [
      "Practice product design questions (Design X for Y users)",
      "Learn frameworks: RICE, ICE, MoSCoW prioritization",
      "Study successful product case studies",
      "Prepare metrics/KPIs for common product scenarios",
      "Understand the company's product and competitors deeply",
    ],
    duringInterview: [
      "Structure your answers using frameworks",
      "Always start with user needs and pain points",
      "Think about metrics to measure success",
      "Show business and technical awareness",
    ],
    afterInterview: [
      "Send a brief product improvement idea in your thank-you email",
      "Connect with your interviewers on LinkedIn",
    ],
    topPerformers: [
      "Read 'Inspired' by Marty Cagan and 'Cracking the PM Interview'",
      "Build a product teardown blog",
      "Practice estimation questions daily",
      "Network with PMs from top companies",
      "Ship a side project as a PM, not just a builder",
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    icon: Server,
    color: "from-orange-500 to-amber-500",
    description: "Bridge development and operations with CI/CD pipelines, infrastructure automation, and cloud management.",
    salaryRange: { entry: "₹5-8 LPA", mid: "₹12-22 LPA", senior: "₹25-50+ LPA" },
    interviewRounds: [
      { name: "Technical Screening", desc: "Linux, networking, scripting basics" },
      { name: "Hands-On Round", desc: "Docker, Kubernetes, CI/CD pipeline setup" },
      { name: "System Design", desc: "Infrastructure architecture, scaling" },
      { name: "HR Round", desc: "Team collaboration, on-call readiness" },
    ],
    skills: [
      { name: "Linux Administration", level: 90 },
      { name: "Docker & Kubernetes", level: 85 },
      { name: "CI/CD (Jenkins, GitHub Actions)", level: 90 },
      { name: "Cloud (AWS/GCP/Azure)", level: 85 },
      { name: "Infrastructure as Code (Terraform)", level: 75 },
      { name: "Monitoring (Prometheus, Grafana)", level: 70 },
      { name: "Scripting (Bash, Python)", level: 80 },
    ],
    beforeInterview: [
      "Set up a complete CI/CD pipeline for a sample project",
      "Get comfortable with Docker, Kubernetes, and Helm",
      "Learn cloud basics: EC2, S3, RDS, Lambda, VPC",
      "Practice Linux commands and shell scripting",
      "Understand networking: DNS, TCP/IP, Load Balancers",
    ],
    duringInterview: [
      "Draw architecture diagrams when explaining systems",
      "Discuss trade-offs in your infrastructure choices",
      "Show experience with real production incidents",
      "Demonstrate automation mindset",
    ],
    afterInterview: [
      "Share a relevant blog post or infrastructure project",
      "Follow up on any technical discussions from the interview",
    ],
    topPerformers: [
      "Get certified: AWS SAA, CKA, or equivalent",
      "Maintain a home lab or cloud playground",
      "Contribute to DevOps open-source tools",
      "Write post-mortems and documentation religiously",
      "Automate everything that can be automated",
    ],
  },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">🏢 Role Guide</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Salary ranges, interview rounds, skill maps & success strategies for top roles
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedRole ? (
          /* Role Cards */
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {roles.map((role, i) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedRole(role)}
                className="glass-card rounded-2xl p-6 text-left card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <role.icon className="w-7 h-7 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-1">{role.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> {role.salaryRange.entry}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> {role.interviewRounds.length} rounds
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> {role.skills.length} skills
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Role Detail */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to roles
            </button>

            {/* Role Header */}
            <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedRole.color} flex items-center justify-center`}>
                <selectedRole.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{selectedRole.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{selectedRole.description}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Salary Ranges */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-accent" /> Salary Ranges (India)
                </h3>
                <div className="space-y-3">
                  {[
                    { level: "Entry Level (0-2 yrs)", salary: selectedRole.salaryRange.entry, color: "from-blue-500 to-blue-600" },
                    { level: "Mid Level (3-5 yrs)", salary: selectedRole.salaryRange.mid, color: "from-violet-500 to-violet-600" },
                    { level: "Senior (6+ yrs)", salary: selectedRole.salaryRange.senior, color: "from-emerald-500 to-emerald-600" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                      <span className="text-sm">{item.level}</span>
                      <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.salary}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Rounds */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Interview Rounds
                </h3>
                <div className="space-y-3">
                  {selectedRole.interviewRounds.map((round, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{round.name}</div>
                        <div className="text-xs text-muted-foreground">{round.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Map */}
              <div className="glass-card rounded-2xl p-5 lg:col-span-2">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Required Skills
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedRole.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-xs font-semibold text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${selectedRole.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklists */}
              {[
                { title: "Before Interview", items: selectedRole.beforeInterview, icon: BookOpen, color: "text-blue-500" },
                { title: "During Interview", items: selectedRole.duringInterview, icon: Briefcase, color: "text-amber-500" },
                { title: "After Interview", items: selectedRole.afterInterview, icon: TrendingUp, color: "text-accent" },
              ].map((section, si) => (
                <div key={si} className="glass-card rounded-2xl p-5">
                  <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${section.color}`}>
                    <section.icon className="w-4 h-4" /> {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${section.color}`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Top Performers */}
              <div className="glass-card rounded-2xl p-5 lg:col-span-2 border-l-4 border-primary">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> What Top Performers Do
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedRole.topPerformers.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
