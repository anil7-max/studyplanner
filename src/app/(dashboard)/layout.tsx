"use client";

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="ml-[240px] sidebar-transition min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-5 px-6">{children}</main>
      </div>
    </div>
  );
}
