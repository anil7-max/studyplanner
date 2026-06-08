"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Brain,
  Code2,
  FileText,
  MessageSquare,
  Bot,
  CalendarDays,
  Building2,
  Target,
  ArrowRight,
  Star,
  ChevronDown,
  Play,
  Sparkles,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";



/* ─── Feature Card ─── */
const features = [
  { icon: Brain, title: "AI Aptitude Training", desc: "15+ topics with adaptive quizzes covering Quant, Logical, Verbal & Technical.", color: "from-blue-500 to-cyan-500", href: "/aptitude" },
  { icon: Code2, title: "Coding Preparation", desc: "Practice DSA problems with online compiler, hints, and complexity analysis.", color: "from-violet-500 to-purple-500", href: "/quiz" },
  { icon: FileText, title: "Resume Analyzer", desc: "AI-powered ATS scoring, grammar fixes, keyword optimization & suggestions.", color: "from-emerald-500 to-green-500", href: "/resume" },
  { icon: MessageSquare, title: "Interview Prep", desc: "HR, Technical & Behavioral questions with STAR method model answers.", color: "from-orange-500 to-amber-500", href: "/interview" },
  { icon: Bot, title: "AI Career Mentor", desc: "Personalized career roadmaps, learning paths & placement strategy.", color: "from-pink-500 to-rose-500", href: "/mentor" },
  { icon: CalendarDays, title: "Study Planner", desc: "8-week AI-generated roadmap with daily tasks and progress tracking.", color: "from-indigo-500 to-blue-500", href: "/planner" },
  { icon: Building2, title: "Company Prep", desc: "Dedicated prep pages for TCS, Infosys, Google, Amazon & more.", color: "from-teal-500 to-emerald-500", href: "/roles" },
  { icon: Target, title: "Placement Readiness", desc: "Overall readiness score combining aptitude, coding, resume & interview.", color: "from-red-500 to-orange-500", href: "/dashboard" },
];

const testimonials = [
  { name: "Priya Sharma", role: "SWE at Google", text: "GroHy helped me crack my dream placement. The AI mentor and adaptive quizzes were game-changers!", rating: 5, avatar: "PS" },
  { name: "Rahul Verma", role: "Data Analyst at Amazon", text: "The resume analyzer improved my ATS score from 45 to 92. Got shortlisted by 8 companies!", rating: 5, avatar: "RV" },
  { name: "Sneha Patel", role: "PM at Microsoft", text: "The STAR method interview prep and company-specific guides gave me unshakeable confidence.", rating: 5, avatar: "SP" },
  { name: "Arjun Kumar", role: "DevOps at Flipkart", text: "From zero placement readiness to getting 3 offers. The study planner kept me on track.", rating: 5, avatar: "AK" },
];

const faqs = [
  { q: "Is GroHy free to use?", a: "Yes! We offer a generous free tier with access to all core modules. Premium plans unlock AI-powered features, personalized coaching, and company-specific preparation." },
  { q: "How does the AI Resume Analyzer work?", a: "Our AI analyzes your resume for ATS compatibility, grammar, keyword density, formatting, and professionalism. It provides a detailed score and actionable suggestions for improvement." },
  { q: "Can I prepare for specific companies?", a: "Absolutely! We have dedicated preparation pages for major recruiters including TCS, Infosys, Wipro, Google, Amazon, Microsoft, and many more with their specific hiring patterns." },
  { q: "How accurate are the aptitude questions?", a: "Our question bank is curated from actual placement papers, GeeksforGeeks, IndiaBix, and real interview experiences. Questions are verified by industry professionals." },
  { q: "Does the AI Mentor provide personalized advice?", a: "Yes! The AI Mentor analyzes your skills, CGPA, interests, and career goals to generate personalized career roadmaps, learning paths, and placement strategies." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden">
      {/* ─── Main Page Video Background ─── */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
        <video
          src="/dashboard_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Frosted overlay to ensure all text remains highly readable */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      </div>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">GroHy</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-40 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Placement Preparation Platform
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Crack Your Dream{" "}
            <span className="gradient-text">Placement</span>{" "}
            With AI
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Master Aptitude, Coding, Resume Building, Interviews, and Career
            Skills — all in one intelligent platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            >
              Start Preparing <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => setIsDemoOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-base hover:bg-secondary transition-colors"
            >
              <Play className="w-5 h-5" /> Watch Demo
            </button>
          </motion.div>
        </div>
      </section>



      {/* ─── Features ─── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Everything You Need to{" "}
              <span className="gradient-text">Get Placed</span>
            </motion.h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From aptitude to interviews, we&apos;ve got every aspect of your placement
              preparation covered with AI-powered tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Link key={i} href={feature.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group glass-card rounded-2xl p-6 card-hover cursor-pointer h-full"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="gradient-text">GroHy</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "AI-Powered Learning", desc: "Adaptive questions that match your skill level. AI identifies weak areas and focuses your preparation." },
              { icon: Shield, title: "Industry-Verified Content", desc: "Questions from real placement papers, verified by professionals from top tech companies." },
              { icon: BarChart3, title: "Data-Driven Progress", desc: "Detailed analytics, skill radars, and readiness scores to track your placement journey." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">10,000+</span> Students
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our community says about GroHy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 space-y-4"
              >
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-bg rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Placement Ready?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join 50,000+ students who are already preparing smarter with
                AI-powered tools.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-bold text-base hover:bg-white/90 transition-colors shadow-lg"
              >
                Start Free Preparation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold gradient-text">GroHy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              GroHy — AI-powered placement preparation for students and graduates.
            </p>
          </div>
          {[
            { title: "Product", links: ["Dashboard", "Aptitude", "Resume Analyzer", "Interview Prep"] },
            { title: "Resources", links: ["Study Planner", "Role Guide", "AI Mentor", "Blog"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy Policy"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 GroHy. All rights reserved. Built with ❤️ for students.
        </div>
      </footer>

      {/* ─── Video Modal ─── */}
      {isDemoOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setIsDemoOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black/20 backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsDemoOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all shadow-lg"
            >
              ✕
            </button>
            <video 
              src="/not_on_based_on_this_implement_processed.mp4" 
              controls 
              autoPlay 
              className="w-full h-full object-contain bg-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
