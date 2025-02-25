"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// export default function Home() {
//   return (
//     <section>
//           <div>Task Manager</div>
//     </section>

//   );
// }

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL + '?_limit=5'); 
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask, completed: false }),
      });
      const data = await res.json();
      setTasks([data, ...tasks]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
    } catch (error) {
      console.error('Error marking task as completed:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="bg-black text-white py-5 ">
        <p className="animate-marquee">
          This is a simple task Manager is created by Asido Alexandar

        </p>
      </div>
      <div className="flex justify-center items-center border border-red-500 h-screen">

        <div className="max-w-lg mx-auto p-6 bg-green-100 rounded-lg shadow-md mt-10 shawdow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task for this week"
              className="flex-1 p-2 border rounded-l-md"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              disabled={loading}
            >
              <IoAddCircle className="text-3xl"/>
            </button>
          </div>
          {loading && <p className="text-center flex justify-center "><AiOutlineLoading3Quarters className="animate-spin text-4xl my-14"/></p>}
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center bg-white p-2 mb-2 rounded-md shadow-md  cursor-pointer">
                <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
                <div className="flex space-x-2">
                  {!task.completed && (
                    <button
                      onClick={() => markCompleted(task.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-green-600"
                      disabled={loading}
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-2 py-1  text-white rounded-md  cursor-pointer"
                    disabled={loading}
                  >
                    <RiDeleteBin5Fill  className="   text-2xl text-red-500 hover:scale-110 "/>
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
