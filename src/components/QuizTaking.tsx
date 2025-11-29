import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, CheckCircle, Trophy, TrendingUp, TrendingDown, Download } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";

interface QuizTakingProps {
  testId: number;
  onExit: () => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  topic: string;
}

export function QuizTaking({ testId, onExit }: QuizTakingProps) {
  const [phase, setPhase] = useState<"quiz" | "completion">("quiz");
  const [currentSet, setCurrentSet] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(7200); // 120 minutes in seconds
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);

  // Mock questions - in real app, these would come from API
  const questions: Question[] = [
    {
      id: 1,
      text: "What is the derivative of f(x) = x²?",
      options: ["x", "2x", "x²", "2x²"],
      correctAnswer: 1,
      topic: "Derivatives",
    },
    {
      id: 2,
      text: "Which of the following is a vector quantity?",
      options: ["Speed", "Distance", "Velocity", "Time"],
      correctAnswer: 2,
      topic: "Vectors",
    },
    {
      id: 3,
      text: "What is the molecular formula for water?",
      options: ["H₂O", "CO₂", "O₂", "H₂O₂"],
      correctAnswer: 0,
      topic: "Chemistry",
    },
    {
      id: 4,
      text: "What is the integral of f(x) = 2x?",
      options: ["x", "x²", "2x²", "x² + C"],
      correctAnswer: 3,
      topic: "Integrals",
    },
    {
      id: 5,
      text: "Newton's first law is also known as?",
      options: ["Law of Gravity", "Law of Inertia", "Law of Motion", "Law of Acceleration"],
      correctAnswer: 1,
      topic: "Physics",
    },
    {
      id: 6,
      text: "What is the atomic number of Carbon?",
      options: ["4", "6", "8", "12"],
      correctAnswer: 1,
      topic: "Chemistry",
    },
  ];

  const questionsPerSet = 3;
  const totalSets = Math.ceil(questions.length / questionsPerSet);
  const currentQuestions = questions.slice(
    currentSet * questionsPerSet,
    (currentSet + 1) * questionsPerSet
  );

  // Timer
  useEffect(() => {
    if (phase === "quiz") {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [phase]);

  // Hide keyboard hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowKeyboardHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (phase === "quiz" && ["1", "2", "3", "4"].includes(e.key)) {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < currentQuestions[0].options.length) {
          handleAnswer(currentQuestions[0].id, optionIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [phase, currentQuestions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleNext = () => {
    if (currentSet < totalSets - 1) {
      setCurrentSet(currentSet + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setPhase("completion");
  };

  const calculateResults = () => {
    const answered = Object.keys(answers).length;
    const correct = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correct / questions.length) * 100);

    const topicPerformance: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q) => {
      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { correct: 0, total: 0 };
      }
      topicPerformance[q.topic].total++;
      if (answers[q.id] === q.correctAnswer) {
        topicPerformance[q.topic].correct++;
      }
    });

    const strengths = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct / perf.total >= 0.7)
      .map(([topic]) => topic);

    const weaknesses = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct / perf.total < 0.7)
      .map(([topic]) => topic);

    return { answered, correct, score, strengths, weaknesses, topicPerformance };
  };

  if (phase === "completion") {
    const results = calculateResults();

    return (
      <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
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
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full blur-3xl"
          />
        </div>

        {/* Confetti Effect */}
        {results.score >= 80 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5,
                  ease: "linear",
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#4169E1", "#7C3AED", "#22C55E", "#F97316"][
                    Math.floor(Math.random() * 4)
                  ],
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-3xl"
        >
          <Card>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center mx-auto mb-4"
              >
                <Trophy size={48} className="text-white" />
              </motion.div>
              <h1 className="text-4xl mb-2">Quiz Completed!</h1>
              <p className="text-lg text-[#9CA3AF]">
                Great work! Here's your performance summary
              </p>
            </div>

            {/* Score Card */}
            <div className="glass rounded-2xl p-8 mb-6 text-center">
              <p className="text-[#9CA3AF] mb-2">Your Score</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
                className="text-6xl mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: results.score >= 90 ? "#22C55E" : results.score >= 80 ? "#4169E1" : "#F97316",
                }}
              >
                {results.score}%
              </motion.p>
              <p className="text-[#9CA3AF]">
                {results.correct} out of {questions.length} questions correct
              </p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-[#22C55E]" />
                  <h3 className="text-lg">Strengths</h3>
                </div>
                {results.strengths.length > 0 ? (
                  <div className="space-y-2">
                    {results.strengths.map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-[#22C55E]" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#9CA3AF]">Keep practicing to build strengths!</p>
                )}
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown size={20} className="text-[#F97316]" />
                  <h3 className="text-lg">Areas to Improve</h3>
                </div>
                {results.weaknesses.length > 0 ? (
                  <div className="space-y-2">
                    {results.weaknesses.map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] text-xs">
                          !
                        </span>
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#9CA3AF]">Excellent work across all topics!</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <Button variant="primary" icon={Download}>
                Download Report
              </Button>
              <Button variant="secondary" onClick={onExit}>
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const progress = ((currentSet + 1) / totalSets) * 100;
  const answeredInSet = currentQuestions.filter((q) => answers[q.id] !== undefined).length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="glass border-b border-[#1E293B]/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-xl">Test #{testId}</h2>
          <div className="flex items-center gap-2 text-[#9CA3AF]">
            <Clock size={18} />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <Button variant="tertiary" icon={X} onClick={onExit}>
          Exit
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="glass border-b border-[#1E293B]/10 px-8 py-4">
        <ProgressBar progress={progress} showLabel={false} />
        <p className="text-sm text-[#9CA3AF] mt-2 text-center">
          Question Set {currentSet + 1} of {totalSets}
        </p>
      </div>

      {/* Keyboard Hint */}
      <AnimatePresence>
        {showKeyboardHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass mx-8 mt-4 p-3 rounded-xl"
          >
            <p className="text-sm text-center text-[#9CA3AF]">
              💡 <span className="text-[#4169E1]">Pro tip:</span> Use keyboard shortcuts (1, 2, 3, 4) to select answers quickly
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {currentQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4169E1]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#4169E1]">{question.id}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full bg-[#E3EBFF] text-xs text-[#475569]">
                        {question.topic}
                      </span>
                    </div>
                    <p className="text-lg">{question.text}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <motion.button
                      key={optionIndex}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(question.id, optionIndex)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        answers[question.id] === optionIndex
                          ? "bg-[#4169E1] text-white shadow-lg shadow-blue-500/30"
                          : "glass hover:bg-[#E3EBFF]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                            answers[question.id] === optionIndex
                              ? "bg-white/20 text-white"
                              : "bg-[#E3EBFF] text-[#475569]"
                          }`}
                        >
                          {optionIndex + 1}
                        </div>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="glass border-t border-[#1E293B]/10 p-6 flex items-center justify-between">
        <div className="text-sm text-[#9CA3AF]">
          {answeredInSet} of {currentQuestions.length} answered in this set
        </div>
        <div className="flex gap-3">
          {currentSet < totalSets - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={answeredInSet < currentQuestions.length}
            >
              Next 3 Questions
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
