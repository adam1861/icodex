import { motion } from "motion/react";
import { Target, BookOpen, BarChart3, Trophy } from "lucide-react";
import { Hero } from "../Hero";
import { StatCard, Card } from "../Card";
import { Button } from "../Button";
import { StatusChip } from "../Chip";

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
  onStartTest: (testId: number) => void;
}

export function StudentDashboard({ onNavigate, onStartTest }: StudentDashboardProps) {
  const stats = [
    {
      icon: Target,
      label: "Assigned Tests",
      value: "5",
      trend: { value: "2 in progress", positive: true },
      iconColor: "#4169E1",
    },
    {
      icon: Trophy,
      label: "Completed",
      value: "12",
      trend: { value: "87% avg score", positive: true },
      iconColor: "#22C55E",
    },
    {
      icon: BookOpen,
      label: "Practice Tests",
      value: "8",
      iconColor: "#7C3AED",
    },
    {
      icon: BarChart3,
      label: "Overall Progress",
      value: "84%",
      trend: { value: "+5% this month", positive: true },
      iconColor: "#F97316",
    },
  ];

  const assignedTests = [
    { id: 1, title: "Calculus Midterm", class: "Advanced Math", dueDate: "Dec 5, 2025", status: "not_started", questions: 50 },
    { id: 2, title: "Physics Quiz 3", class: "Physics 101", dueDate: "Dec 3, 2025", status: "in_progress", questions: 30, progress: 60 },
    { id: 3, title: "Chemistry Lab Test", class: "Chemistry", dueDate: "Dec 8, 2025", status: "not_started", questions: 40 },
  ];

  const recentScores = [
    { test: "Biology Final", score: 92, date: "Nov 20, 2025", trend: "up" },
    { test: "Math Quiz 5", score: 88, date: "Nov 18, 2025", trend: "up" },
    { test: "History Exam", score: 85, date: "Nov 15, 2025", trend: "down" },
  ];

  return (
    <div>
      <Hero
        title="Student Dashboard"
        description="Track your assigned tests, practice quizzes, and academic progress"
        primaryAction={{
          label: "View Assigned Tests",
          icon: Target,
          onClick: () => onNavigate("assigned"),
        }}
        secondaryAction={{
          label: "Start Practice",
          icon: BookOpen,
          onClick: () => onNavigate("practice"),
        }}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Assigned Tests */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl">Assigned Tests</h3>
            <Button variant="tertiary" size="sm" onClick={() => onNavigate("assigned")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {assignedTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="mb-1">{test.title}</p>
                    <p className="text-sm text-[#9CA3AF]">
                      {test.class} · {test.questions} questions
                    </p>
                  </div>
                  <StatusChip status={test.status} />
                </div>
                
                {test.status === "in_progress" && test.progress && (
                  <div className="mb-3">
                    <div className="h-1.5 bg-[#E3EBFF] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4169E1] to-[#7C3AED]"
                        style={{ width: `${test.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-1">{test.progress}% complete</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#9CA3AF]">Due: {test.dueDate}</p>
                  <Button
                    variant={test.status === "in_progress" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => onStartTest(test.id)}
                  >
                    {test.status === "in_progress" ? "Continue" : "Start Test"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Recent Scores */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl">Recent Scores</h3>
            <Button variant="tertiary" size="sm" onClick={() => onNavigate("reports")}>
              View Reports
            </Button>
          </div>
          <div className="space-y-3">
            {recentScores.map((score, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-[#E3EBFF]/30 transition-colors"
              >
                <div className="flex-1">
                  <p className="mb-1">{score.test}</p>
                  <p className="text-sm text-[#9CA3AF]">{score.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {score.score}%
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      score.score >= 90
                        ? "bg-[#22C55E]/10 text-[#22C55E]"
                        : score.score >= 80
                        ? "bg-[#4169E1]/10 text-[#4169E1]"
                        : "bg-[#F97316]/10 text-[#F97316]"
                    }`}
                  >
                    {score.trend === "up" ? "↑" : "→"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
