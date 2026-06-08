"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Bell,
  Search,
  X,
  CheckCircle2,
  BookOpen,
  Trophy,
  MessageSquare,
  Target,
  Flame,
  Star,
  Mail,
  ExternalLink,
  Check,
  Trash2,
  Menu,
} from "lucide-react";

/* ─── Notification Data ─── */
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ElementType;
  color: string;
  type: "achievement" | "reminder" | "tip" | "update";
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "🔥 12-Day Streak!",
    message: "You've maintained a 12-day study streak. Keep it up to unlock the Gold Badge!",
    time: "2 min ago",
    read: false,
    icon: Flame,
    color: "text-orange-500 bg-orange-500/10",
    type: "achievement",
  },
  {
    id: "n2",
    title: "Resume Score Improved",
    message: "Your ATS resume score has increased from 72 to 88. Great progress on keyword optimization!",
    time: "1 hour ago",
    read: false,
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-500/10",
    type: "achievement",
  },
  {
    id: "n3",
    title: "Daily Study Reminder",
    message: "You haven't completed today's aptitude practice. 10 questions are waiting for you.",
    time: "3 hours ago",
    read: false,
    icon: BookOpen,
    color: "text-primary bg-primary/10",
    type: "reminder",
  },
  {
    id: "n4",
    title: "New Quiz Available",
    message: "A new Probability & Statistics quiz has been added. Test your skills now!",
    time: "5 hours ago",
    read: true,
    icon: Target,
    color: "text-violet-500 bg-violet-500/10",
    type: "update",
  },
  {
    id: "n5",
    title: "Interview Tip of the Day",
    message: "Use the STAR method to structure your behavioral answers. Practice 'Tell me about a time...' questions.",
    time: "8 hours ago",
    read: true,
    icon: MessageSquare,
    color: "text-amber-500 bg-amber-500/10",
    type: "tip",
  },
  {
    id: "n6",
    title: "Weekly Goal Achieved!",
    message: "You've completed your weekly goal of solving 50 aptitude questions. New badge unlocked! 🏆",
    time: "1 day ago",
    read: true,
    icon: Trophy,
    color: "text-yellow-500 bg-yellow-500/10",
    type: "achievement",
  },
  {
    id: "n7",
    title: "Leaderboard Update",
    message: "You ranked #3 in this week's Quiz Challenge. Keep pushing to reach #1!",
    time: "2 days ago",
    read: true,
    icon: Star,
    color: "text-primary bg-primary/10",
    type: "update",
  },
];

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-background/90 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-5">
      {/* Left side: Menu toggle & Search */}
      <div className="flex items-center flex-1 gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-1.5 rounded-md hover:bg-secondary text-muted-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-1.5 bg-secondary/70 rounded-md text-sm text-foreground placeholder:text-muted-foreground border border-transparent focus:border-primary/30 focus:bg-background transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 ml-4">
        {/* Email link */}
        <a
          href="mailto:notifications@grohy.app"
          className="p-2 rounded-md hover:bg-secondary transition-colors"
          title="Send via Email"
        >
          <Mail className="w-[18px] h-[18px] text-muted-foreground" />
        </a>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
            }}
            className="relative p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <Bell className={`w-[18px] h-[18px] transition-colors ${unreadCount > 0 ? "text-foreground" : "text-muted-foreground"}`} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-96 max-h-[520px] notification-panel notification-enter flex flex-col overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors group border-b border-border/50 last:border-0 ${
                        notif.read
                          ? "hover:bg-secondary/50"
                          : "bg-primary/[0.03] hover:bg-primary/[0.06]"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notif.color}`}>
                        <notif.icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm leading-snug ${notif.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>
                        <span className="text-[11px] text-muted-foreground/70 mt-1 block">
                          {notif.time}
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notif.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-secondary transition-all shrink-0 self-start"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-secondary/30">
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear all
                  </button>
                  <a
                    href="mailto:notifications@grohy.app?subject=GroHy%20Notification%20Settings"
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" /> Email Preferences
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-[18px] h-[18px] text-yellow-500" />
            ) : (
              <Moon className="w-[18px] h-[18px] text-muted-foreground" />
            )}
          </button>
        )}

        {/* User avatar */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-xs font-semibold cursor-pointer ml-1">
          A
        </div>
      </div>
    </header>
  );
}
