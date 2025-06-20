"use client";

import { useRef, useState } from "react";
import TypingText from "@/components/TypingText";

export default function ResumeForm() {
    const resumeRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        skills: "",
        experience: "",
        projects: "",
    });

    const [showExperience, setShowExperience] = useState(false);
    const [showProjects, setShowProjects] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAISuggestion = async () => {
        if (!formData.role) {
            alert("Please enter a role first.");
            return;
        }

        const res = await fetch("/api/suggest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: formData.role }),
        });

        const data = await res.json();
        if (data.error) return alert(data.error);

        const { skills, experience, projects } = data;

        setShowExperience(false);
        setShowProjects(false);

        setFormData((prev) => ({
            ...prev,
            skills,
            experience,
            projects,
        }));
    };




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleDownloadPDF();
    };
    const handleDownloadPDF = async () => {
        if (typeof window !== "undefined" && resumeRef.current) {
            const html2pdf = (await import("html2pdf.js")).default;

            const opt = {
                margin: [0.4, 0.4],
                filename: "resume.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 1.5 },
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            };

            html2pdf().set(opt).from(resumeRef.current).save();
        }
    };
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-start justify-center gap-6 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-600 p-6">
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-3xl p-6 space-y-6 max-w-lg w-full"
                aria-label="Resume Builder Form"
            >
                <h1 className="text-3xl font-extrabold text-center text-gray-900">Resume Builder</h1>

                <div className="flex flex-col sm:flex-row gap-6">
                    {["firstName", "lastName"].map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            value={formData[field as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            className="flex-1 p-3 border rounded-md bg-white text-black border-gray-300"
                        />
                    ))}
                </div>

                {["email", "role"].map((field) => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full p-3 border rounded-md bg-white text-black border-gray-300"
                    />
                ))}

                {["skills", "experience", "projects"].map((field) => (
                    <textarea
                        key={field}
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full p-3 border rounded-md bg-white text-black border-gray-300"
                        rows={3}
                    ></textarea>
                ))}

                <button
                    type="submit"
                    className="w-full py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                >
                    📄 Generate & Download Resume
                </button>

                <button
                    type="button"
                    onClick={handleAISuggestion}
                    className="w-full py-2 rounded-xl mt-2 text-indigo-700 border border-indigo-500 bg-white hover:bg-indigo-50 font-semibold transition"
                >
                    💡 Suggest with AI
                </button>
            </form>

            {/* Resume Preview for PDF */}
            <div
                ref={resumeRef}
                className="bg-white p-4 text-black max-w-[700px] w-full"
                style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    maxHeight: "auto",
                    overflow: "visible",
                }}
            >
                <h2 className="text-2xl font-bold mb-4">📄 Resume Preview</h2>

                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Role:</strong> {formData.role}</p>

                <div className="mb-2">
                    <strong>Skills:</strong>{" "}
                    {formData.skills && (
                        <TypingText
                            text={formData.skills}
                            onTypingDone={() => setShowExperience(true)}
                        />
                    )}
                </div>

                <div className="mb-2">
                    <strong>Experience:</strong>{" "}
                    {showExperience && formData.experience && (
                        <TypingText
                            text={formData.experience}
                            onTypingDone={() => setShowProjects(true)}
                        />
                    )}
                </div>

                <div className="mb-2">
                    <strong>Projects:</strong>{" "}
                    {showProjects && formData.projects && (
                        <TypingText text={formData.projects} />
                    )}
                </div>
            </div>
        </div>
    );
}