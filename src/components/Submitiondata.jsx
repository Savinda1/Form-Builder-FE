import React, { useState } from "react";
import { useGetSubmiFormQuery } from "@/lib/api/api";

export default function SubmissionPage() {
  const { data, error, isLoading } = useGetSubmiFormQuery();
  console.log(data)
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <p className="text-gray-500">Loading submissions...</p>;
  if (error) return <p className="text-red-500">Failed to load submissions.</p>;

  const submissions = data?.submissions || [];

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter((submission) =>
    Object.values(submission.data).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* Left Column: Submission Cards */}
      <div className="w-full md:w-1/2 space-y-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search submissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission) => (
            <div
              key={submission._id}
              onClick={() => setSelectedSubmission(submission)}
              className={`p-4 border rounded-lg cursor-pointer transition ${
                selectedSubmission?._id === submission._id
                  ? "bg-blue-100"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              {Object.entries(submission.data).map(([key, value], i) => (
                <p key={i} className="text-sm text-gray-700 truncate">
                  <strong>{key}:</strong> {String(value)}
                </p>
              ))}
              <p className="text-xs text-gray-400 mt-2">
                Submitted on {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No submissions match your search.</p>
        )}
      </div>

      {/* Right Column: Selected Submission Details */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
        {selectedSubmission ? (
          <div className="p-5 border rounded-xl shadow-md bg-white">
            {Object.entries(selectedSubmission.data).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b py-2">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-600">
                  {typeof value === "object" ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-4">
              Submitted on {new Date(selectedSubmission.createdAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Click on a submission to see details</p>
        )}
      </div>
    </div>
  );
}
