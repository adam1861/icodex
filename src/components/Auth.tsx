import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Mail, Lock, User, Building, Globe } from "lucide-react";
import { Button } from "./Button";
import { Input, Select } from "./Input";
import { useToast } from "./Toast";

interface AuthProps {
  mode: "login" | "signup";
  onSubmit: (data: any) => void;
  onToggleMode: () => void;
  onBack: () => void;
}

export function Auth({ mode, onSubmit, onToggleMode, onBack }: AuthProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    school: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (mode === "signup" && !formData.name) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(formData);
  };

  const roleOptions = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "admin", label: "Administrator" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#4169E1] to-[#7C3AED] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#7C3AED] to-[#4169E1] rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={onBack} className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4169E1] to-[#7C3AED] flex items-center justify-center">
              <GraduationCap size={28} className="text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl">ICodex</h1>
              <p className="text-sm text-[#9CA3AF]">Adaptive Learning</p>
            </div>
          </button>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-3xl mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-[#9CA3AF]">
              {mode === "login"
                ? "Sign in to continue your learning journey"
                : "Join thousands of learners using ICodex"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />
                
                <Select
                  label="Role"
                  options={roleOptions}
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  helperText="Select your role in the platform"
                />
              </>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              helperText={mode === "signup" ? "At least 6 characters" : undefined}
            />

            {mode === "signup" && (
              <>
                <Input
                  label="School / Institution (Optional)"
                  type="text"
                  placeholder="Stanford University"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                />

                <Input
                  label="Country (Optional)"
                  type="text"
                  placeholder="United States"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </>
            )}

            <Button type="submit" variant="primary" className="w-full">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onToggleMode}
              className="text-sm text-[#4169E1] hover:underline"
            >
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>

          {mode === "login" && (
            <div className="mt-4 text-center">
              <button className="text-sm text-[#9CA3AF] hover:text-[#475569]">
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 glass rounded-xl p-4"
        >
          <p className="text-sm text-[#9CA3AF] mb-2">Demo Credentials:</p>
          <div className="text-xs text-[#475569] space-y-1">
            <p>Student: student@demo.com / password</p>
            <p>Teacher: teacher@demo.com / password</p>
            <p>Admin: admin@demo.com / password</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
