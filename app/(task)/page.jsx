"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";

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

  return (
    <section className="bg-gray-100 min-h-screen p-4 max-md:w-aut max-md:h-auto">
    
      <div className="bg-black text-white py-3 text-center">
        <p className="animate-marquee">
          This Task Manager is created by Asido Alexandar
        </p>
      </div>

      
      <div className="flex flex-col items-center mt-10">
    
        <Link
          href="/addTask"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition mb-6"
        >
          <IoAddCircle className="text-2xl" />
          <p className="text-sm font-semibold">Add New Task</p>
        </Link>

        
        <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

          
          {loading && (
            <p className="text-center flex justify-center">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl my-4 text-gray-600" />
            </p>
          )}

      
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 md:p-4 rounded-md shadow-sm border hover:shadow-md transition max-md:w-auto max-md:h-auto"
              >
                <span
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex space-x-2">
                  {!task.completed && (
                    <button
                      onClick={() => markCompleted(task.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-green-600 transition text-sm"
                      disabled={loading}
                    >
                      Complete
                    </button>
                  )}
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
