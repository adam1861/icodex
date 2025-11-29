import { motion } from "motion/react";
import { Upload, Sparkles, FileText, BarChart3 } from "lucide-react";
import { Hero } from "../Hero";
import { StatCard, Card } from "../Card";
import { Button } from "../Button";

interface TeacherDashboardProps {
  onNavigate: (page: string) => void;
}

export function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  const stats = [
    {
      icon: FileText,
      label: "Tests Created",
      value: "24",
      trend: { value: "+3 this week", positive: true },
      iconColor: "#4169E1",
    },
    {
      icon: Sparkles,
      label: "Tests Processing",
      value: "2",
      iconColor: "#F97316",
    },
    {
      icon: FileText,
      label: "Tests Ready",
      value: "18",
      iconColor: "#22C55E",
    },
    {
      icon: BarChart3,
      label: "Avg. Student Score",
      value: "84%",
      trend: { value: "+5% improvement", positive: true },
      iconColor: "#7C3AED",
    },
  ];

  const quickActions = [
    {
      title: "Quiz Studio",
      description: "Upload PDFs and generate adaptive quizzes with AI",
      icon: Sparkles,
      color: "#4169E1",
      action: () => onNavigate("studio"),
    },
    {
      title: "My Tests",
      description: "View and manage all your created tests",
      icon: FileText,
      color: "#7C3AED",
      action: () => onNavigate("tests"),
    },
    {
      title: "Reports",
      description: "Analyze student performance and progress",
      icon: BarChart3,
      color: "#22C55E",
      action: () => onNavigate("reports"),
    },
  ];

  return (
    <div>
      <Hero
        title="Teacher Dashboard"
        description="Create adaptive quizzes, track student progress, and manage your tests"
        primaryAction={{
          label: "Upload New Test",
          icon: Upload,
          onClick: () => onNavigate("studio"),
        }}
        badge={{ label: "2 tests processing", variant: "warning" }}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover onClick={action.action}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${action.color}20, ${action.color}10)`,
                    }}
                  >
                    <Icon size={24} style={{ color: action.color }} />
                  </div>
                  <h4 className="text-lg mb-2">{action.title}</h4>
                  <p className="text-sm text-[#9CA3AF] mb-4">{action.description}</p>
                  <Button variant="tertiary" size="sm">
                    Go to {action.title}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Tests */}
      <Card>
        <h3 className="text-xl mb-4">Recent Tests</h3>
        <div className="space-y-3">
          {[
            { title: "Calculus Midterm", status: "ready", questions: 50, date: "Nov 25, 2025" },
            { title: "Physics Quiz 3", status: "processing", questions: 30, date: "Nov 28, 2025" },
            { title: "Chemistry Lab Test", status: "ready", questions: 40, date: "Nov 20, 2025" },
          ].map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-[#E3EBFF]/30 transition-colors cursor-pointer"
            >
              <div>
                <p className="mb-1">{test.title}</p>
                <p className="text-sm text-[#9CA3AF]">
                  {test.questions} questions · {test.date}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  test.status === "ready"
                    ? "bg-[#22C55E]/10 text-[#22C55E]"
                    : "bg-[#F97316]/10 text-[#F97316]"
                }`}
              >
                {test.status}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
