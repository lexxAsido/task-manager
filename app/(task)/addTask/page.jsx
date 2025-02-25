"use client"
import Link from "next/link";
import { useState } from "react";

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const AddTask = ({ tasks, setTasks }) => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          priority,
          fromDate,
          toDate,
          completed: false,
        }),
      });
      const data = await res.json();
      setTasks([data, ...tasks]);
      setTitle("");
      setDescription("");
      setFromDate("");
      setToDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
        <Link href="/">
            Home
        </Link>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
        

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Create New Task</h2>

        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a title"
            className="w-full p-2 border rounded-md mb-2"
            />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short bio"
            className="w-full p-2 border rounded-md"
            ></textarea>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Priority</h3>
          <div className="flex flex-col space-y-2">
            {["Low", "Medium", "High", "Urgent"].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={priority === level}
                  onChange={(e) => setPriority(e.target.value)}
                  className="accent-blue-500"
                  />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4 p-3 border rounded-md">
          <h3 className="text-sm font-semibold mb-2">Set Timeline</h3>
          <div className="flex flex-col space-y-2">
            <label>
              From:
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                />
            </label>
            <label>
              To:
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                />
            </label>
          </div>
        </div>

        <button
          onClick={addTask}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={loading}
          >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </div>
     
            </section>
  );
};

export default AddTask;
