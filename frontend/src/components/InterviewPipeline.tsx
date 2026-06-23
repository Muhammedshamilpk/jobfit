import { useState, useEffect } from "react";

export default function InterviewPipeline() {
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/candidates")
      .then((res) => res.json())
      .then(setCandidates)
      .catch(console.error);
  }, []);

  const shortlistedCandidates = candidates.filter(
    (candidate) =>
      candidate.recommendation === "Strong Match" ||
      candidate.recommendation === "Consider"
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Interview Pipeline
      </h1>

      {shortlistedCandidates.length === 0 ? (
        <div className="bg-white border rounded-xl p-6 text-slate-500">
          No candidates shortlisted yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-5 bg-slate-100 p-4 font-semibold text-slate-700">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Score</div>
            <div>Status</div>
          </div>

          {/* Rows */}
          {shortlistedCandidates.map((candidate, index) => (
            <div
              key={index}
              className="grid grid-cols-[1.2fr_2fr_1.5fr_0.8fr_1fr] p-3 border-t hover:bg-slate-50 text-sm"
            >
              <div>{candidate.name}</div>

              <div className="truncate">
                {candidate.email}
              </div>

              <div>{candidate.phone}</div>

              <div>{candidate.final_score}</div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    candidate.recommendation === "Strong Match"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {candidate.recommendation}
                </span>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}