"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Brain,
  Target,
  Gamepad2,
  FileText,
  MessageSquare,
  Building2,
  CalendarDays,
  Bot,
  ChevronsLeft,
  ChevronsRight,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/aptitude", label: "Aptitude Topics", icon: Brain },
  { href: "/quiz", label: "Practice Quiz", icon: Target },
  { href: "/quiz-challenge", label: "Quiz Challenge", icon: Gamepad2 },
  { href: "/resume", label: "Resume Analyzer", icon: FileText },
  { href: "/interview", label: "Interview Prep", icon: MessageSquare },
  { href: "/roles", label: "Role Guide", icon: Building2 },
  { href: "/planner", label: "Study Planner", icon: CalendarDays },
  { href: "/mentor", label: "AI Mentor", icon: Bot },
];

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar-bg border-r border-sidebar-border flex flex-col select-none transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        collapsed ? "md:w-[56px]" : "md:w-[240px]",
        "w-[240px]" // Always 240px on mobile
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2.5 h-14 border-b border-sidebar-border shrink-0",
        collapsed ? "px-2 justify-center" : "px-3.5"
      )}>
        <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">
              GroHy
            </h1>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className={cn(
        "flex-1 overflow-y-auto py-2 space-y-0.5",
        collapsed ? "px-1.5" : "px-2"
      )}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 768 && onClose) onClose();
              }}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-sidebar-active text-primary font-semibold"
                  : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-primary rounded-r-full" />
              )}
              <item.icon
                className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {!collapsed && (
                <span className="whitespace-nowrap truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse button - hidden on mobile */}
      <div className="border-t border-sidebar-border p-2 shrink-0 hidden md:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors",
            collapsed ? "px-1" : "px-2.5"
          )}
        >
          {collapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronsLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
