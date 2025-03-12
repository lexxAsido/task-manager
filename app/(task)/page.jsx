"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL + "?_limit=5");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-blue-500";
      case "Low":
      default:
        return "bg-green-500";
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen p-4">
      <div className="bg-black text-white py-3 text-center">
        <p className="animate-marquee">
          This Task Manager is created by Asido Alexandar
        </p>
      </div>

      <div className="flex flex-col items-center mt-10">
        <div className="flex w-full items-center">
          <Link
            href="/addTask"
            className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition ml-60"
          >
            <IoMdAdd className="text-2xl" />
            <p className="text-sm font-semibold">Add New Task</p>
          </Link>
        </div>
        <div className="w-full border mt-2 flex items-center gap-5 py-3">
          <h2 className="ml-60">All Tasks</h2>
          <MdKeyboardArrowDown />
        </div>

        <div className="w-full md:w-[89rem] p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between p-3 border-b-2 mb-3 border-gray-200">
            <h1 className="text-xl font-semibold">Task</h1>
            <div className="flex justify-evenly w-[46rem]">
              <h2 className="text-xl font-semibold">Status</h2>
              <h2 className="text-xl font-semibold">Priority</h2>
            </div>
          </div>

          {loading && (
            <p className="text-center flex justify-center">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl my-4 text-gray-600" />
            </p>
          )}

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 md:p-4 rounded-md shadow-sm transition"
              >
                <span
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex items-center justify-between w-[40%] min-w-[15rem] ">

                  <span
                    className={`px-3 py-1 text-white rounded-md ${
                      task.completed ? "bg-gray-500" : "bg-yellow-500"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                  <span
                    className={`px-3 py-1 text-white rounded-md ${getPriorityClass(
                      task.priority || "Low"
                    )}`}
                  >
                    {task.priority || "High"}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-md hover:scale-110 transition"
                    disabled={loading}
                  >
                    <RiDeleteBin5Fill className="text-2xl text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
