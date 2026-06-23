import { useState } from 'react';
import { motion } from 'motion/react';
import {
  UploadCloud,
  CheckCircle,
  FileText as FileTextIcon
} from "lucide-react";

interface Props {
  onUploadComplete?: () => void;
}


export default function ResumeScreening({ onUploadComplete }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [result, setResult] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState("");

 const handleUpload = async () => {
  if (selectedFiles.length === 0) {
    alert("Please select resumes");
    return;
  }

  if (!jobDescription.trim()) {
    alert("Please enter Job Description");
    return;
  }

  setIsUploading(true);

  const formData = new FormData();

  selectedFiles.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("jd_text", jobDescription);

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/analyze_resume",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);

    setResult(data);
    setComplete(true);

    if (onUploadComplete) {
      onUploadComplete();
    }
  } catch (error) {
    console.error(error);
    alert("Failed to analyze resumes");
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div className="h-full w-full bg-slate-50 text-slate-900 overflow-y-auto">
      <div className="max-w-[1000px] mx-auto p-8 space-y-8">

        <div>
          <h1 className="text-3xl font-semibold mb-2">
            Resume Screening
          </h1>

          <p className="text-slate-500">
            Upload a resume and get AI-powered analysis.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-10 min-h-[400px] flex flex-col items-center justify-center">

          {!complete && (
            <>
              <div className="h-20 w-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <UploadCloud className="h-8 w-8 text-blue-600" />
              </div>

              <h2 className="text-xl font-medium mb-2">
                Upload Resume
              </h2>

              <p className="text-slate-500 mb-6">
                Select a PDF resume to analyze.
              </p>

              <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste Job Description here..."
          className="w-full max-w-xl border border-slate-300 rounded-xl p-4 mb-6"
          rows={6}
          />

              <label className="cursor-pointer">
  <div className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition">
    Choose Resume
    </div>

            <input
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files){
                  setSelectedFiles(Array.from(e.target.files));
                }
              }}
            />
          </label>

          {selectedFiles.length > 0 && (
  <div className="mt-4 space-y-2">
    {selectedFiles.map((file, index) => (
      <div
        key={index}
        className="flex items-center gap-2 text-sm text-slate-600"
      >
        <FileTextIcon className="h-4 w-4" />
        {file.name}
      </div>
    ))}
  </div>
)}

<button
  onClick={handleUpload}
  disabled={isUploading || selectedFiles.length === 0}
  className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 transition"
>
  {isUploading ? "Analyzing..." : "Analyze Resume"}
</button>
            </>
          )}

          {complete && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-2xl"
            >
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-emerald-700" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-center mb-6">
                Analysis Complete
              </h2>

              <div className="bg-slate-50 border rounded-xl p-6 space-y-3">

                <div className="space-y-4">
                {result.map((candidate: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-white"
                  >
                    <p>
                      <strong>Name:</strong> {candidate.name}
                    </p>

                    <p>
                      <strong>Email:</strong> {candidate.email}
                    </p>

                    <p>
                      <strong>Phone:</strong> {candidate.phone}
                    </p>

                    <p>
                      <strong>Keyword Score:</strong> {candidate.keyword_score}
                    </p>

                    <p>
                      <strong>Semantic Score:</strong> {candidate.semantic_score}
                    </p>

                    <p>
                      <strong>Final Score:</strong> {candidate.final_score}
                    </p>

                    <p>
                      <strong>Recommendation:</strong> {candidate.recommendation}
                    </p>
                    <div className="mt-3">
                    <strong>AI Summary:</strong>
                    <p className="mt-2 text-slate-600 whitespace-pre-line">
                      {candidate.summary?.replace(/\*\*/g, "")}
                    </p>
                  </div>
                  </div>
                ))}
              </div>
                

              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setComplete(false);
                    setResult(null);
                    setSelectedFiles([]);
                    setJobDescription("");
                  }}
                  className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-100"
                >
                  Analyze Another Resume
                </button>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}