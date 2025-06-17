"use client";
import { useState } from "react";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    skills: "",
    experience: "",
    projects: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-3xl p-6 space-y-6 max-w-lg w-full"
        aria-label="Resume Builder Form"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Resume Builder
        </h1>

        <div className="flex flex-col sm:flex-row gap-6">
          {(["firstName", "lastName"] as (keyof typeof formData)[]).map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="flex-1 p-3 border rounded-md bg-white text-black border-gray-300"
            />
          ))}

        </div>

        {(["email", "role"] as (keyof typeof formData)[]).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-3 border rounded-md bg-white text-black border-gray-300"
          />
        ))}

        {(["skills", "experience", "projects"] as (keyof typeof formData)[]).map((field) => (
          <textarea
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-3 border rounded-md bg-white text-black border-gray-300"
            rows={3}
          ></textarea>
        ))}


        <button
          type="submit"
          className="w-full py-3 rounded-2xl text-white font-semibold
                    bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600
                    hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700
                    transition-all duration-300 shadow-lg"
        >
          Generate Resume
        </button>
      </form>
    </div>
  );
}

