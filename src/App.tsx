import { useState } from "react";
import { Landing } from "./components/Landing";
import { Auth } from "./components/Auth";
import { Shell } from "./components/Shell";
import { ToastProvider, useToast } from "./components/Toast";
import { QuizTaking } from "./components/QuizTaking";

// Admin Components
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminClasses } from "./components/admin/AdminClasses";
import { AdminTests } from "./components/admin/AdminTests";

// Teacher Components
import { TeacherDashboard } from "./components/teacher/TeacherDashboard";
import { QuizStudio } from "./components/teacher/QuizStudio";
import { TeacherTests } from "./components/teacher/TeacherTests";

// Student Components
import { StudentDashboard } from "./components/student/StudentDashboard";
import { AssignedTests } from "./components/student/AssignedTests";
import { Practice } from "./components/student/Practice";

// Shared Components
import { Reports } from "./components/Reports";

type Screen = "landing" | "login" | "signup" | "app" | "quiz";
type Role = "admin" | "teacher" | "student";

function AppContent() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<Role>("student");
  const [userName, setUserName] = useState("John Doe");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTestId, setActiveTestId] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleAuth = (data: any) => {
    // Mock authentication
    const roleMap: Record<string, Role> = {
      "admin@demo.com": "admin",
      "teacher@demo.com": "teacher",
      "student@demo.com": "student",
    };

    const detectedRole = roleMap[data.email] || data.role || "student";
    
    setRole(detectedRole);
    setUserName(data.name || data.email.split("@")[0]);
    setScreen("app");
    setActiveNav("dashboard");
    showToast(`Welcome ${data.name || "back"}!`, "success");
  };

  const handleLogout = () => {
    setScreen("landing");
    setActiveNav("dashboard");
    showToast("Logged out successfully", "info");
  };

  const handleStartTest = (testId: number) => {
    setActiveTestId(testId);
    setScreen("quiz");
  };

  const handleExitQuiz = () => {
    setActiveTestId(null);
    setScreen("app");
    setActiveNav("dashboard");
  };

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (nav === "settings") {
      showToast("Settings page coming soon!", "info");
    }
  };

  // Landing page
  if (screen === "landing") {
    return (
      <Landing
        onLogin={() => {
          setAuthMode("login");
          setScreen("login");
        }}
        onSignup={() => {
          setAuthMode("signup");
          setScreen("signup");
        }}
      />
    );
  }

  // Auth screens
  if (screen === "login" || screen === "signup") {
    return (
      <Auth
        mode={authMode}
        onSubmit={handleAuth}
        onToggleMode={() => {
          const newMode = authMode === "login" ? "signup" : "login";
          setAuthMode(newMode);
          setScreen(newMode);
        }}
        onBack={() => setScreen("landing")}
      />
    );
  }

  // Quiz taking
  if (screen === "quiz" && activeTestId) {
    return <QuizTaking testId={activeTestId} onExit={handleExitQuiz} />;
  }

  // Main app with shell
  return (
    <Shell
      role={role}
      userName={userName}
      activeNav={activeNav}
      onNavClick={handleNavClick}
      onLogout={handleLogout}
    >
      {/* Admin Pages */}
      {role === "admin" && (
        <>
          {activeNav === "dashboard" && <AdminDashboard />}
          {activeNav === "users" && <AdminUsers />}
          {activeNav === "classes" && <AdminClasses />}
          {activeNav === "tests" && <AdminTests />}
          {activeNav === "reports" && <Reports />}
        </>
      )}

      {/* Teacher Pages */}
      {role === "teacher" && (
        <>
          {activeNav === "dashboard" && <TeacherDashboard onNavigate={setActiveNav} />}
          {activeNav === "studio" && <QuizStudio />}
          {activeNav === "tests" && <TeacherTests />}
          {activeNav === "reports" && <Reports />}
        </>
      )}

      {/* Student Pages */}
      {role === "student" && (
        <>
          {activeNav === "dashboard" && (
            <StudentDashboard onNavigate={setActiveNav} onStartTest={handleStartTest} />
          )}
          {activeNav === "assigned" && <AssignedTests onStartTest={handleStartTest} />}
          {activeNav === "practice" && <Practice onStartPractice={handleStartTest} />}
          {activeNav === "reports" && <Reports />}
        </>
      )}
    </Shell>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
