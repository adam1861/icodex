import { useState } from "react";
import { UserPlus, Trash2, Search } from "lucide-react";
import { Hero } from "../Hero";
import { Table } from "../Table";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Input, Select } from "../Input";
import { Chip } from "../Chip";
import { useToast } from "../Toast";
import { PillFilter } from "../Tabs";

export function AdminUsers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast } = useToast();

  const [users, setUsers] = useState([
    { id: 1, name: "Sarah Johnson", email: "sarah.j@school.edu", role: "student", school: "Stanford", country: "USA", status: "active" },
    { id: 2, name: "Michael Chen", email: "m.chen@school.edu", role: "teacher", school: "MIT", country: "USA", status: "active" },
    { id: 3, name: "Emma Wilson", email: "emma.w@school.edu", role: "student", school: "Harvard", country: "USA", status: "active" },
    { id: 4, name: "David Brown", email: "d.brown@school.edu", role: "admin", school: "Stanford", country: "USA", status: "active" },
    { id: 5, name: "Lisa Anderson", email: "lisa.a@school.edu", role: "teacher", school: "MIT", country: "USA", status: "active" },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    school: "",
    country: "",
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setUsers([
      ...users,
      {
        id: users.length + 1,
        ...newUser,
        status: "active",
      },
    ]);
    
    setShowAddModal(false);
    setNewUser({ name: "", email: "", password: "", role: "student", school: "", country: "" });
    showToast("User added successfully", "success");
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((u) => u.id !== userId));
    showToast("User deleted", "info");
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (user: any) => (
        <Chip
          variant={
            user.role === "admin" ? "error" :
            user.role === "teacher" ? "secondary" : "primary"
          }
          size="sm"
        >
          {user.role}
        </Chip>
      ),
    },
    { key: "school", label: "School" },
    { key: "country", label: "Country" },
    {
      key: "actions",
      label: "Actions",
      render: (user: any) => (
        <Button
          variant="destructive"
          size="sm"
          icon={Trash2}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteUser(user.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const roleFilters = [
    { id: "all", label: "All Users" },
    { id: "student", label: "Students" },
    { id: "teacher", label: "Teachers" },
    { id: "admin", label: "Admins" },
  ];

  return (
    <div>
      <Hero
        title="User Management"
        description="Add, edit, and manage all platform users across roles"
        primaryAction={{
          label: "Add User",
          icon: UserPlus,
          onClick: () => setShowAddModal(true),
        }}
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <PillFilter
            filters={roleFilters}
            activeFilter={filterRole}
            onChange={setFilterRole}
          />
        </div>
        <div className="w-full md:w-80">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <Table data={filteredUsers} columns={columns} />

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        description="Create a new user account"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name *"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="John Doe"
          />
          <Input
            label="Email *"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="john@example.com"
          />
          <Input
            label="Password *"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="••••••••"
          />
          <Select
            label="Role *"
            options={[
              { value: "student", label: "Student" },
              { value: "teacher", label: "Teacher" },
              { value: "admin", label: "Administrator" },
            ]}
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
          <Input
            label="School / Institution"
            value={newUser.school}
            onChange={(e) => setNewUser({ ...newUser, school: e.target.value })}
            placeholder="Stanford University"
          />
          <Input
            label="Country"
            value={newUser.country}
            onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
            placeholder="United States"
          />
        </div>
      </Modal>
    </div>
  );
}
