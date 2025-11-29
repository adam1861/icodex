import { useState } from "react";
import { Upload, Sparkles, Download, FileText, Eye } from "lucide-react";
import { Hero } from "../Hero";
import { Card } from "../Card";
import { Button } from "../Button";
import { Input, TextArea, Select } from "../Input";
import { Stepper, ProgressBar } from "../ProgressBar";
import { useToast } from "../Toast";
import { motion } from "motion/react";

export function QuizStudio() {
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    file: null as File | null,
    apiKey: "",
    model: "llama-3.3-70b",
    questionLimit: "30",
    comment: "",
  });

  const [logs, setLogs] = useState<string[]>([]);

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
    if (!formData.file || !formData.apiKey) {
      showToast("Please upload a PDF and provide API key", "error");
      return;
    }

    setProcessing(true);
    setStep(1);
    setLogs([]);

    // Simulate processing
    const timestamps = [0, 1000, 2500, 4000, 5500, 7000, 8500, 10000];
    const messages = [
      "📄 Uploading PDF document...",
      "✓ PDF uploaded successfully",
      "🔍 Analyzing document structure...",
      "📊 Extracting key concepts and topics...",
      "🤖 Generating adaptive quiz questions...",
      "✨ Applying difficulty balancing...",
      "✓ Quiz generation complete",
      "📦 Preparing download package...",
    ];

    timestamps.forEach((delay, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[index]}`]);
        setProgress(((index + 1) / messages.length) * 100);
        
        if (index === messages.length - 1) {
          setStep(2);
          setProcessing(false);
          showToast("Quiz generated successfully!", "success");
        }
      }, delay);
    });
  };

  const steps = ["Upload & Configure", "Processing", "Ready"];

  return (
    <div>
      <Hero
        title="Quiz Studio"
        description="Upload your course materials and generate adaptive quizzes powered by AI"
        badge={{ label: processing ? "Processing" : "Ready", variant: processing ? "warning" : "success" }}
      />

      {/* Stepper */}
      <div className="mb-8">
        <Stepper steps={steps} currentStep={step} />
      </div>

      {/* Upload Form */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <h3 className="text-xl mb-6">Upload Configuration</h3>
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm text-[#475569]">Course PDF *</label>
                <div className="glass rounded-xl p-8 border-2 border-dashed border-[#4169E1]/30 hover:border-[#4169E1] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload size={40} className="text-[#4169E1] mb-3" />
                    {formData.file ? (
                      <p className="text-[#4169E1]">{formData.file.name}</p>
                    ) : (
                      <>
                        <p className="mb-1">Click to upload PDF</p>
                        <p className="text-sm text-[#9CA3AF]">Maximum file size: 50MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* API Key */}
              <Input
                label="Cerebras API Key *"
                type="password"
                placeholder="csk_..."
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                helperText="Your API key is encrypted and never stored"
              />

              {/* Model Selection */}
              <Select
                label="AI Model *"
                options={models}
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                helperText="Choose the model that best fits your needs"
              />

              {/* Question Limit */}
              <Input
                label="Question Limit *"
                type="number"
                placeholder="30"
                value={formData.questionLimit}
                onChange={(e) => setFormData({ ...formData, questionLimit: e.target.value })}
                helperText="Maximum number of questions to generate"
              />

              {/* Comment */}
              <TextArea
                label="Comment / Notes (Optional)"
                placeholder="Add any special instructions or notes about this test..."
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  icon={Sparkles}
                  onClick={handleUpload}
                  disabled={!formData.file || !formData.apiKey}
                >
                  Generate Quiz
                </Button>
                <Button variant="tertiary">
                  Save Draft
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Processing View */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <h3 className="text-xl mb-6">Processing Quiz</h3>
            
            <ProgressBar progress={progress} className="mb-6" />

            {/* Logs */}
            <div className="glass-dark rounded-xl p-4 bg-[#0F172A] max-h-80 overflow-y-auto">
              <div className="space-y-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-[#E3EBFF]"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Ready View */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                <Sparkles size={24} className="text-[#22C55E]" />
              </div>
              <div>
                <h3 className="text-xl">Quiz Ready!</h3>
                <p className="text-[#9CA3AF]">Your adaptive quiz has been generated successfully</p>
              </div>
            </div>

            {/* Quiz Info */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-[#9CA3AF] mb-1">Questions</p>
                <p className="text-2xl">30</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-[#9CA3AF] mb-1">Difficulty</p>
                <p className="text-2xl">Mixed</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-[#9CA3AF] mb-1">Status</p>
                <p className="text-2xl text-[#22C55E]">Ready</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="primary" icon={Download}>
                Download PDF
              </Button>
              <Button variant="secondary" icon={Download}>
                Download JSON
              </Button>
              <Button variant="tertiary" icon={Eye}>
                Preview Questions
              </Button>
            </div>

            {/* Start Over */}
            <div className="mt-6 pt-6 border-t border-[#1E293B]/10">
              <Button
                variant="tertiary"
                onClick={() => {
                  setStep(0);
                  setProgress(0);
                  setLogs([]);
                  setFormData({ file: null, apiKey: "", model: "llama-3.3-70b", questionLimit: "30", comment: "" });
                }}
              >
                Create Another Quiz
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
