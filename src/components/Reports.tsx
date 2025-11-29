import { useState } from "react";
import { Download, Eye, BarChart3 } from "lucide-react";
import { Hero } from "./Hero";
import { Card } from "./Card";
import { Button } from "./Button";
import { PillFilter } from "./Tabs";
import { motion } from "motion/react";

export function Reports() {
  const [filterType, setFilterType] = useState("all");

  const reports = [
    {
      id: 1,
      title: "Calculus Midterm Report",
      type: "test",
      date: "Nov 25, 2025",
      score: 92,
      questions: 50,
      timeSpent: 98,
      strengths: ["Derivatives", "Limits"],
      weaknesses: ["Integration"],
    },
    {
      id: 2,
      title: "Physics Quiz 3 Analysis",
      type: "test",
      date: "Nov 22, 2025",
      score: 88,
      questions: 30,
      timeSpent: 45,
      strengths: ["Kinematics", "Forces"],
      weaknesses: ["Energy"],
    },
    {
      id: 3,
      title: "Chemistry Practice Summary",
      type: "practice",
      date: "Nov 20, 2025",
      score: 85,
      questions: 25,
      timeSpent: 38,
      strengths: ["Chemical Reactions"],
      weaknesses: ["Periodic Table", "Bonding"],
    },
    {
      id: 4,
      title: "Biology Final Report",
      type: "test",
      date: "Nov 18, 2025",
      score: 94,
      questions: 60,
      timeSpent: 112,
      strengths: ["Cell Biology", "Genetics", "Evolution"],
      weaknesses: [],
    },
  ];

  const filteredReports = reports.filter(
    (report) => filterType === "all" || report.type === filterType
  );

  const filters = [
    { id: "all", label: "All Reports" },
    { id: "test", label: "Tests" },
    { id: "practice", label: "Practice" },
  ];

  return (
    <div>
      <Hero
        title="Performance Reports"
        description="View detailed analytics of your test and practice performance"
      />

      <div className="mb-6">
        <PillFilter filters={filters} activeFilter={filterType} onChange={setFilterType} />
      </div>

      <div className="grid gap-6">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Report Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl mb-1">{report.title}</h3>
                      <p className="text-sm text-[#9CA3AF]">{report.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        report.type === "test"
                          ? "bg-[#4169E1]/10 text-[#4169E1]"
                          : "bg-[#7C3AED]/10 text-[#7C3AED]"
                      }`}
                    >
                      {report.type}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="glass rounded-xl p-3">
                      <p className="text-xs text-[#9CA3AF] mb-1">Score</p>
                      <p
                        className="text-2xl"
                        style={{
                          color: report.score >= 90 ? "#22C55E" : report.score >= 80 ? "#4169E1" : "#F97316",
                        }}
                      >
                        {report.score}%
                      </p>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <p className="text-xs text-[#9CA3AF] mb-1">Questions</p>
                      <p className="text-2xl">{report.questions}</p>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <p className="text-xs text-[#9CA3AF] mb-1">Time</p>
                      <p className="text-2xl">{report.timeSpent}m</p>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#9CA3AF] mb-2">Strengths</p>
                      <div className="flex flex-wrap gap-1">
                        {report.strengths.map((strength) => (
                          <span
                            key={strength}
                            className="px-2 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-xs"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] mb-2">Areas to Improve</p>
                      <div className="flex flex-wrap gap-1">
                        {report.weaknesses.length > 0 ? (
                          report.weaknesses.map((weakness) => (
                            <span
                              key={weakness}
                              className="px-2 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs"
                            >
                              {weakness}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#9CA3AF]">None - Great work!</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="w-full lg:w-48 glass rounded-xl p-4 flex flex-col items-center justify-center">
                  <BarChart3 size={48} className="text-[#4169E1] mb-2" />
                  <p className="text-xs text-[#9CA3AF] text-center mb-3">Performance Breakdown</p>
                  <div className="flex gap-2 w-full">
                    <Button variant="primary" size="sm" icon={Eye}>
                      View
                    </Button>
                    <Button variant="secondary" size="sm" icon={Download}>
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
