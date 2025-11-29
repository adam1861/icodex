import { motion } from "motion/react";
import { Users, GraduationCap, FileText, TrendingUp } from "lucide-react";
import { Hero } from "../Hero";
import { StatCard } from "../Card";

export function AdminDashboard() {
  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: "1,247",
      trend: { value: "+12% this month", positive: true },
      iconColor: "#4169E1",
    },
    {
      icon: GraduationCap,
      label: "Active Classes",
      value: "84",
      trend: { value: "+5 new", positive: true },
      iconColor: "#7C3AED",
    },
    {
      icon: FileText,
      label: "Tests Created",
      value: "532",
      trend: { value: "+28 this week", positive: true },
      iconColor: "#22C55E",
    },
    {
      icon: TrendingUp,
      label: "Avg. Performance",
      value: "87%",
      trend: { value: "+3.2%", positive: true },
      iconColor: "#F97316",
    },
  ];

  const recentActivity = [
    { user: "Sarah Johnson", action: "created a new test", time: "2 minutes ago", type: "test" },
    { user: "Michael Chen", action: "added 15 students to Class A", time: "15 minutes ago", type: "class" },
    { user: "Emma Wilson", action: "completed Calculus Quiz", time: "1 hour ago", type: "completion" },
    { user: "Admin Team", action: "approved 3 pending tests", time: "2 hours ago", type: "approval" },
  ];

  return (
    <div>
      <Hero
        title="Admin Dashboard"
        description="Monitor system performance, manage users, and oversee all platform activities"
        badge={{ label: "System Healthy", variant: "success" }}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-[#E3EBFF]/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "test"
                      ? "bg-[#4169E1]/10 text-[#4169E1]"
                      : activity.type === "class"
                      ? "bg-[#7C3AED]/10 text-[#7C3AED]"
                      : activity.type === "completion"
                      ? "bg-[#22C55E]/10 text-[#22C55E]"
                      : "bg-[#F97316]/10 text-[#F97316]"
                  }`}
                >
                  {activity.user.charAt(0)}
                </div>
                <div>
                  <p className="text-sm">
                    <span>{activity.user}</span>{" "}
                    <span className="text-[#9CA3AF]">{activity.action}</span>
                  </p>
                  <p className="text-xs text-[#9CA3AF]">{activity.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
