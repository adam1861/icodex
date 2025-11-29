import { useState } from "react";
import { CheckCircle, FileText, Download } from "lucide-react";
import { Hero } from "../Hero";
import { Table } from "../Table";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Select } from "../Input";
import { StatusChip } from "../Chip";
import { Tabs } from "../Tabs";
import { useToast } from "../Toast";

export function AdminTests() {
  const [activeTab, setActiveTab] = useState("pending");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const { showToast } = useToast();

  const [pendingTests, setPendingTests] = useState([
    { id: 1, title: "Calculus Midterm", owner: "Dr. Sarah Johnson", questionLimit: 50, comment: "Please review for difficulty", status: "pending" },
    { id: 2, title: "Physics Quiz 3", owner: "Prof. Michael Chen", questionLimit: 30, comment: "", status: "pending" },
    { id: 3, title: "Chemistry Lab Test", owner: "Dr. Emma Wilson", questionLimit: 40, comment: "Focus on practical applications", status: "pending" },
  ]);

  const [approvedTests, setApprovedTests] = useState([
    { id: 4, title: "Biology Final", owner: "Prof. David Brown", questionLimit: 60, assignedClass: "Biology Studies", status: "approved" },
    { id: 5, title: "Math Quiz 1", owner: "Dr. Lisa Anderson", questionLimit: 25, assignedClass: "Advanced Mathematics", status: "approved" },
  ]);

  const [selectedClass, setSelectedClass] = useState("");

  const handleApprove = () => {
    if (!selectedClass) {
      showToast("Please select a class", "error");
      return;
    }

    const test = pendingTests.find((t) => t.id === selectedTest?.id);
    if (test) {
      setApprovedTests([
        ...approvedTests,
        { ...test, status: "approved", assignedClass: selectedClass },
      ]);
      setPendingTests(pendingTests.filter((t) => t.id !== selectedTest?.id));
      showToast("Test approved and assigned", "success");
      setShowApproveModal(false);
      setSelectedTest(null);
      setSelectedClass("");
    }
  };

  const classes = [
    { value: "", label: "Select a class" },
    { value: "cs101", label: "Computer Science 101" },
    { value: "math", label: "Advanced Mathematics" },
    { value: "physics", label: "Physics Fundamentals" },
    { value: "chemistry", label: "Chemistry Lab" },
    { value: "biology", label: "Biology Studies" },
  ];

  const pendingColumns = [
    { key: "title", label: "Test Title" },
    { key: "owner", label: "Created By" },
    { key: "questionLimit", label: "Questions" },
    { key: "comment", label: "Comment" },
    {
      key: "status",
      label: "Status",
      render: (test: any) => <StatusChip status="pending" />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (test: any) => (
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={CheckCircle}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTest(test);
              setShowApproveModal(true);
            }}
          >
            Approve
          </Button>
          <Button variant="tertiary" size="sm">
            Preview
          </Button>
        </div>
      ),
    },
  ];

  const approvedColumns = [
    { key: "title", label: "Test Title" },
    { key: "owner", label: "Created By" },
    { key: "questionLimit", label: "Questions" },
    { key: "assignedClass", label: "Assigned To" },
    {
      key: "status",
      label: "Status",
      render: (test: any) => <StatusChip status="approved" />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (test: any) => (
        <Button variant="secondary" size="sm" icon={Download}>
          Download
        </Button>
      ),
    },
  ];

  const tabs = [
    { id: "pending", label: "Pending", count: pendingTests.length },
    { id: "approved", label: "Approved", count: approvedTests.length },
  ];

  return (
    <div>
      <Hero
        title="Test Management"
        description="Review and approve teacher-submitted tests, assign to classes"
      />

      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "pending" ? (
        <Table data={pendingTests} columns={pendingColumns} />
      ) : (
        <Table data={approvedTests} columns={approvedColumns} />
      )}

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => {
          setShowApproveModal(false);
          setSelectedTest(null);
          setSelectedClass("");
        }}
        title="Approve & Assign Test"
        description={`Approve "${selectedTest?.title}" and assign it to a class`}
        footer={
          <>
            <Button
              variant="tertiary"
              onClick={() => {
                setShowApproveModal(false);
                setSelectedTest(null);
                setSelectedClass("");
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" icon={CheckCircle} onClick={handleApprove}>
              Approve & Assign
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="glass rounded-xl p-4 bg-[#E3EBFF]/30">
            <p className="text-sm text-[#9CA3AF] mb-1">Test Details</p>
            <p className="mb-1">{selectedTest?.title}</p>
            <p className="text-sm text-[#9CA3AF]">
              {selectedTest?.questionLimit} questions · by {selectedTest?.owner}
            </p>
            {selectedTest?.comment && (
              <p className="text-sm text-[#475569] mt-2 italic">"{selectedTest.comment}"</p>
            )}
          </div>
          <Select
            label="Assign to Class *"
            options={classes}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            helperText="Select which class should have access to this test"
          />
        </div>
      </Modal>
    </div>
  );
}
