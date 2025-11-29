import { motion } from "motion/react";
import { GraduationCap, Sparkles, Target, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./Button";

interface LandingProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function Landing({ onLogin, onSignup }: LandingProps) {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Upload course materials and let our AI generate adaptive quizzes tailored to your curriculum.",
    },
    {
      icon: Target,
      title: "Adaptive Testing",
      description: "Smart question selection that adapts to student performance and learning patterns.",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Reports",
      description: "Detailed analytics on student progress, strengths, weaknesses, and improvement areas.",
    },
  ];

  const benefits = [
    "Unlimited quiz generation from PDF materials",
    "Real-time progress tracking and analytics",
    "Multi-role support for students, teachers, and admins",
    "Secure and scalable platform",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
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

      {/* Header */}
      <nav className="relative z-10 glass border-b border-[#1E293B]/10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4169E1] to-[#7C3AED] flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl">ICodex</h1>
              <p className="text-xs text-[#9CA3AF]">Adaptive Learning</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="tertiary" onClick={onLogin}>
              Login
            </Button>
            <Button variant="primary" onClick={onSignup}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4169E1]/10 text-[#4169E1] mb-6"
          >
            <Sparkles size={16} />
            <span className="text-sm">AI-Powered Adaptive Quizzes</span>
          </motion.div>
          
          <h1 className="text-6xl mb-6">
            Transform Learning with
            <br />
            <span className="bg-gradient-to-r from-[#4169E1] to-[#7C3AED] bg-clip-text text-transparent">
              Intelligent Assessments
            </span>
          </h1>
          
          <p className="text-xl text-[#475569] mb-8 max-w-3xl mx-auto">
            ICodex uses advanced AI to generate personalized quizzes from your course materials, 
            adapting to each student's learning journey in real-time.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={onSignup}>
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" onClick={onLogin}>
              Sign In
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="glass rounded-2xl p-6 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4169E1]/20 to-[#7C3AED]/20 flex items-center justify-center mb-4">
                    <Icon size={28} className="text-[#4169E1]" />
                  </div>
                  <h3 className="text-xl mb-2">{feature.title}</h3>
                  <p className="text-[#475569]">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl mb-4">Why Choose ICodex?</h2>
              <p className="text-[#475569] mb-6">
                Our platform combines cutting-edge AI with proven educational methodologies 
                to create an unparalleled learning experience.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                    <p className="text-[#475569]">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-xl p-6 bg-gradient-to-br from-[#4169E1]/10 to-[#7C3AED]/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">Quiz Generation</span>
                  <span className="text-2xl">99.8%</span>
                </div>
                <div className="h-2 bg-[#E3EBFF] rounded-full overflow-hidden">
                  <div className="h-full w-[99.8%] bg-gradient-to-r from-[#4169E1] to-[#7C3AED]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">Student Satisfaction</span>
                  <span className="text-2xl">4.9/5</span>
                </div>
                <div className="h-2 bg-[#E3EBFF] rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-gradient-to-r from-[#22C55E] to-[#16A34A]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">Performance Improvement</span>
                  <span className="text-2xl">+47%</span>
                </div>
                <div className="h-2 bg-[#E3EBFF] rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-[#7C3AED] to-[#9333EA]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-[#1E293B]/10 mt-20">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center text-[#9CA3AF]">
          <p>© 2025 ICodex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
