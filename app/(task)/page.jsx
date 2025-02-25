"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";



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
    <section className="bg-gray-100">
      <div className="bg-black text-white py-5 ">
        <p className="animate-marquee">
          This is a simple task Manager is created by Asido Alexandar

        </p>
      </div>


      <div className="flex-col justify-start items-center border h-screen relative mt-32">
      
           
      <div>
      <Link
        href="/addTask" 
        className="flex items-center justify-start absolute left-96 bg-blue-700 rounded-lg text-white p-2"
      >
        <IoAddCircle className="text-3xl" />
        <p>Add new task</p>
      </Link>
    </div>


        <div className="w-[70rem] mx-auto p-6 bg-white rounded-lg shadow-md mt-10 shawdow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
          
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
