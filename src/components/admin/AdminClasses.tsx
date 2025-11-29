import { useState } from "react";
import { Plus, Users, GraduationCap } from "lucide-react";
import { Hero } from "../Hero";
import { Table } from "../Table";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Input } from "../Input";
import { useToast } from "../Toast";

export function AdminClasses() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { showToast } = useToast();

  const [classes, setClasses] = useState([
    { id: 1, name: "Computer Science 101", teacherCount: 3, studentCount: 45, createdAt: "2025-01-15" },
    { id: 2, name: "Advanced Mathematics", teacherCount: 2, studentCount: 32, createdAt: "2025-01-20" },
    { id: 3, name: "Physics Fundamentals", teacherCount: 2, studentCount: 38, createdAt: "2025-02-01" },
    { id: 4, name: "Chemistry Lab", teacherCount: 1, studentCount: 25, createdAt: "2025-02-10" },
    { id: 5, name: "Biology Studies", teacherCount: 3, studentCount: 41, createdAt: "2025-02-15" },
  ]);

  const [newClass, setNewClass] = useState({
    name: "",
    description: "",
  });

  const handleAddClass = () => {
    if (!newClass.name) {
      showToast("Please enter a class name", "error");
      return;
    }

    setClasses([
      ...classes,
      {
        id: classes.length + 1,
        name: newClass.name,
        teacherCount: 0,
        studentCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    
    setShowAddModal(false);
    setNewClass({ name: "", description: "" });
    showToast("Class created successfully", "success");
  };

  const columns = [
    { key: "name", label: "Class Name" },
    {
      key: "teacherCount",
      label: "Teachers",
      render: (cls: any) => (
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-[#7C3AED]" />
          <span>{cls.teacherCount}</span>
        </div>
      ),
    },
    {
      key: "studentCount",
      label: "Students",
      render: (cls: any) => (
        <div className="flex items-center gap-2">
          <Users size={16} className="text-[#4169E1]" />
          <span>{cls.studentCount}</span>
        </div>
      ),
    },
    { key: "createdAt", label: "Created At" },
    {
      key: "actions",
      label: "Actions",
      render: (cls: any) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Manage
          </Button>
          <Button variant="tertiary" size="sm">
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Hero
        title="Class Management"
        description="Create and manage classes, assign teachers and students"
        primaryAction={{
          label: "Create Class",
          icon: Plus,
          onClick: () => setShowAddModal(true),
        }}
      />

      <Table data={classes} columns={columns} />

      {/* Add Class Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Class"
        description="Add a new class to the platform"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddClass}>
              Create Class
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Class Name *"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            placeholder="e.g., Computer Science 101"
          />
          <Input
            label="Description"
            value={newClass.description}
            onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
            placeholder="Brief description of the class"
          />
        </div>
      </Modal>
    </div>
  );
}
