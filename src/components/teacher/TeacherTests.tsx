import { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import { Hero } from "../Hero";
import { Table } from "../Table";
import { Button } from "../Button";
import { StatusChip } from "../Chip";
import { PillFilter } from "../Tabs";

export function TeacherTests() {
  const [filterStatus, setFilterStatus] = useState("all");

  const tests = [
    { id: 1, title: "Calculus Midterm", status: "ready", questionLimit: 50, createdAt: "Nov 25, 2025" },
    { id: 2, title: "Physics Quiz 3", status: "processing", questionLimit: 30, createdAt: "Nov 28, 2025" },
    { id: 3, title: "Chemistry Lab Test", status: "ready", questionLimit: 40, createdAt: "Nov 20, 2025" },
    { id: 4, title: "Biology Assessment", status: "pending", questionLimit: 45, createdAt: "Nov 27, 2025" },
    { id: 5, title: "Math Practice Set", status: "ready", questionLimit: 25, createdAt: "Nov 22, 2025" },
    { id: 6, title: "History Exam", status: "failed", questionLimit: 60, createdAt: "Nov 26, 2025" },
  ];

  const filteredTests = tests.filter(
    (test) => filterStatus === "all" || test.status === filterStatus
  );

  const statusFilters = [
    { id: "all", label: "All Tests" },
    { id: "ready", label: "Ready", color: "#22C55E" },
    { id: "processing", label: "Processing", color: "#F97316" },
    { id: "pending", label: "Pending Review", color: "#F97316" },
    { id: "failed", label: "Failed", color: "#EF4444" },
  ];

  const columns = [
    { key: "title", label: "Test Title" },
    {
      key: "status",
      label: "Status",
      render: (test: any) => <StatusChip status={test.status} />,
    },
    {
      key: "questionLimit",
      label: "Questions",
      render: (test: any) => <span>{test.questionLimit}</span>,
    },
    { key: "createdAt", label: "Created At" },
    {
      key: "actions",
      label: "Actions",
      render: (test: any) => (
        <div className="flex gap-2">
          {test.status === "ready" && (
            <>
              <Button variant="primary" size="sm" icon={Download}>
                Download
              </Button>
              <Button variant="secondary" size="sm" icon={Eye}>
                Preview
              </Button>
            </>
          )}
          {test.status === "processing" && (
            <Button variant="tertiary" size="sm">
              View Logs
            </Button>
          )}
          {test.status === "failed" && (
            <Button variant="secondary" size="sm">
              Retry
            </Button>
          )}
          {test.status === "pending" && (
            <Button variant="tertiary" size="sm">
              View Status
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Hero
        title="My Tests"
        description="View and manage all your created tests and their processing status"
      />

      <div className="mb-6">
        <PillFilter
          filters={statusFilters}
          activeFilter={filterStatus}
          onChange={setFilterStatus}
        />
      </div>

      <Table data={filteredTests} columns={columns} />
    </div>
  );
}
