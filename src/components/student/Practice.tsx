import { useState } from "react";
import { Upload, Play, Download, Sparkles } from "lucide-react";
import { Hero } from "../Hero";
import { Card } from "../Card";
import { Button } from "../Button";
import { Input, Select } from "../Input";
import { Modal } from "../Modal";
import { StatusChip } from "../Chip";
import { useToast } from "../Toast";
import { motion } from "motion/react";

interface PracticeProps {
  onStartPractice: (practiceId: number) => void;
}

export function Practice({ onStartPractice }: PracticeProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { showToast } = useToast();

  const [practices, setPractices] = useState([
    { id: 1, title: "Calculus Practice", status: "ready", questions: 25, createdAt: "Nov 20, 2025" },
    { id: 2, title: "Physics Review", status: "ready", questions: 30, createdAt: "Nov 22, 2025" },
    { id: 3, title: "Chemistry Self-Test", status: "processing", questions: 20, createdAt: "Nov 28, 2025" },
  ]);

  const [formData, setFormData] = useState({
    file: null as File | null,
    title: "",
    apiKey: "",
    model: "llama-3.3-70b",
    questionLimit: "25",
  });

  const models = [
    { value: "llama-3.3-70b", label: "Llama 3.3 70B (Recommended)" },
    { value: "llama-3.1-8b", label: "Llama 3.1 8B (Fast)" },
    { value: "mixtral-8x7b", label: "Mixtral 8x7B (Balanced)" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleUpload = () => {
    if (!formData.file || !formData.title || !formData.apiKey) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    // Add new practice with processing status
    setPractices([
      {
        id: practices.length + 1,
        title: formData.title,
        status: "processing",
        questions: parseInt(formData.questionLimit),
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      },
      ...practices,
    ]);

    // Simulate processing completion
    setTimeout(() => {
      setPractices((prev) =>
        prev.map((p) =>
          p.id === practices.length + 1 ? { ...p, status: "ready" } : p
        )
      );
      showToast("Practice quiz generated successfully!", "success");
    }, 5000);

    setShowUploadModal(false);
    setFormData({ file: null, title: "", apiKey: "", model: "llama-3.3-70b", questionLimit: "25" });
    showToast("Generating practice quiz...", "info");
  };

  return (
    <div>
      <Hero
        title="Practice Tests"
        description="Upload your own materials to generate practice quizzes for self-study"
        primaryAction={{
          label: "Create Practice Quiz",
          icon: Upload,
          onClick: () => setShowUploadModal(true),
        }}
      />

      <div className="grid gap-6">
        {practices.map((practice, index) => (
          <motion.div
            key={practice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl">{practice.title}</h3>
                    <StatusChip status={practice.status} />
                  </div>
                  <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
                    <span>{practice.questions} questions</span>
                    <span>Created: {practice.createdAt}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {practice.status === "ready" && (
                    <>
                      <Button
                        variant="primary"
                        icon={Play}
                        onClick={() => onStartPractice(practice.id)}
                      >
                        Start Practice
                      </Button>
                      <Button variant="secondary" icon={Download}>
                        Download PDF
                      </Button>
                    </>
                  )}
                  {practice.status === "processing" && (
                    <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
                      <span className="text-sm text-[#F97316]">Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Create Practice Quiz"
        description="Upload study materials to generate a personalized practice quiz"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={Sparkles} onClick={handleUpload}>
              Generate Quiz
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Quiz Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Calculus Practice"
          />

          <div>
            <label className="block mb-2 text-sm text-[#475569]">Upload PDF *</label>
            <div className="glass rounded-xl p-6 border-2 border-dashed border-[#4169E1]/30 hover:border-[#4169E1] transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="practice-file-upload"
              />
              <label htmlFor="practice-file-upload" className="cursor-pointer flex flex-col items-center">
                <Upload size={32} className="text-[#4169E1] mb-2" />
                {formData.file ? (
                  <p className="text-[#4169E1] text-sm">{formData.file.name}</p>
                ) : (
                  <>
                    <p className="text-sm mb-1">Click to upload PDF</p>
                    <p className="text-xs text-[#9CA3AF]">Max 50MB</p>
                  </>
                )}
              </label>
            </div>
          </div>

          <Input
            label="Cerebras API Key *"
            type="password"
            placeholder="csk_..."
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            helperText="Your API key is encrypted and never stored"
          />

          <Select
            label="AI Model"
            options={models}
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          />

          <Input
            label="Question Limit"
            type="number"
            placeholder="25"
            value={formData.questionLimit}
            onChange={(e) => setFormData({ ...formData, questionLimit: e.target.value })}
            helperText="Number of questions to generate"
          />
        </div>
      </Modal>
    </div>
  );
}
