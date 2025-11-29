import { useState } from "react";
import { Play, Target } from "lucide-react";
import { Hero } from "../Hero";
import { Card } from "../Card";
import { Button } from "../Button";
import { StatusChip } from "../Chip";
import { PillFilter } from "../Tabs";
import { motion } from "motion/react";

interface AssignedTestsProps {
  onStartTest: (testId: number) => void;
}

export function AssignedTests({ onStartTest }: AssignedTestsProps) {
  const [filterStatus, setFilterStatus] = useState("all");

  const tests = [
    {
      id: 1,
      title: "Calculus Midterm",
      class: "Advanced Mathematics",
      teacher: "Dr. Sarah Johnson",
      dueDate: "Dec 5, 2025",
      status: "not_started",
      questions: 50,
      timeLimit: 120,
      description: "Comprehensive midterm covering derivatives, integrals, and applications",
    },
    {
      id: 2,
      title: "Physics Quiz 3",
      class: "Physics 101",
      teacher: "Prof. Michael Chen",
      dueDate: "Dec 3, 2025",
      status: "in_progress",
      questions: 30,
      timeLimit: 60,
      progress: 60,
      description: "Motion, forces, and energy concepts",
    },
    {
      id: 3,
      title: "Chemistry Lab Test",
      class: "Chemistry",
      teacher: "Dr. Emma Wilson",
      dueDate: "Dec 8, 2025",
      status: "not_started",
      questions: 40,
      timeLimit: 90,
      description: "Laboratory techniques and chemical reactions",
    },
    {
      id: 4,
      title: "Biology Final",
      class: "Biology Studies",
      teacher: "Prof. David Brown",
      dueDate: "Nov 20, 2025",
      status: "completed",
      questions: 60,
      timeLimit: 150,
      score: 92,
      description: "Comprehensive final exam covering all topics",
    },
    {
      id: 5,
      title: "History Exam",
      class: "World History",
      teacher: "Dr. Lisa Anderson",
      dueDate: "Nov 15, 2025",
      status: "completed",
      questions: 45,
      timeLimit: 90,
      score: 85,
      description: "Ancient civilizations and medieval period",
    },
  ];

  const filteredTests = tests.filter(
    (test) => filterStatus === "all" || test.status === filterStatus
  );

  const statusFilters = [
    { id: "all", label: "All" },
    { id: "not_started", label: "Not Started" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div>
      <Hero
        title="Assigned Tests"
        description="View and take tests assigned by your teachers"
        badge={{
          label: `${tests.filter((t) => t.status !== "completed").length} active tests`,
          variant: "info",
        }}
      />

      <div className="mb-6">
        <PillFilter
          filters={statusFilters}
          activeFilter={filterStatus}
          onChange={setFilterStatus}
        />
      </div>

      <div className="grid gap-6">
        {filteredTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Test Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl mb-1">{test.title}</h3>
                      <p className="text-[#9CA3AF]">{test.description}</p>
                    </div>
                    <StatusChip status={test.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#9CA3AF] mb-1">Class</p>
                      <p className="text-sm">{test.class}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] mb-1">Teacher</p>
                      <p className="text-sm">{test.teacher}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] mb-1">Questions</p>
                      <p className="text-sm">{test.questions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] mb-1">Time Limit</p>
                      <p className="text-sm">{test.timeLimit} min</p>
                    </div>
                  </div>

                  {test.status === "in_progress" && test.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-[#475569]">Progress</p>
                        <p className="text-sm text-[#4169E1]">{test.progress}%</p>
                      </div>
                      <div className="h-2 bg-[#E3EBFF] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#4169E1] to-[#7C3AED]"
                          style={{ width: `${test.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {test.status === "completed" && test.score !== undefined && (
                    <div className="glass rounded-xl p-4 bg-[#22C55E]/5 inline-block">
                      <p className="text-sm text-[#9CA3AF] mb-1">Your Score</p>
                      <p className="text-3xl text-[#22C55E]">{test.score}%</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  {test.status === "not_started" && (
                    <>
                      <Button
                        variant="primary"
                        icon={Play}
                        onClick={() => onStartTest(test.id)}
                      >
                        Start Test
                      </Button>
                      <p className="text-xs text-[#9CA3AF] text-center">
                        Due: {test.dueDate}
                      </p>
                    </>
                  )}
                  {test.status === "in_progress" && (
                    <>
                      <Button
                        variant="primary"
                        icon={Target}
                        onClick={() => onStartTest(test.id)}
                      >
                        Continue
                      </Button>
                      <p className="text-xs text-[#F97316] text-center">
                        Due: {test.dueDate}
                      </p>
                    </>
                  )}
                  {test.status === "completed" && (
                    <Button variant="secondary">View Report</Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
