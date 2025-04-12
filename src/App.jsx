import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const API = "https://backend-assignment-01.vercel.app/tasks";

  // Fetch All Tasks on Load
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get(API);
      setTasks(res.data.tasks); //  correct key
    };
    fetchTasks();
  }, []);

  // Add New Task
  const addTask = async () => {
    if (!task.trim()) return;
    const res = await axios.post(API, { text: task });
    setTasks([...tasks, res.data.newTask]); //  correct key
    setTask("");
  };

  // Edit Existing Task
  const editTask = async (id) => {
    const updatedText = prompt("Enter new task");
    if (updatedText && updatedText.trim()) {
      const res = await axios.put(API, { taskId: id, text: updatedText });
      setTasks(tasks.map((task) => (task._id === id ? res.data.updatedTask : task))); //  correct key
    }
  };

  // Delete Single Task
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Delete All Tasks
  const deleteAllTasks = async () => {
    await axios.delete(API);
    setTasks([]);
  };

  return (
    <div className="app-container">
      <h1>To-Do App</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) =>
          task && task._id ? (
            <li key={task._id} className="task-item">
              {task.text}
              <div className="task-actions">
                <button onClick={() => editTask(task._id)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => deleteTask(task._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ) : null
        )}
      </ul>

      {tasks.length > 0 && (
        <button className="delete-all" onClick={deleteAllTasks}>
          Delete All
        </button>
      )}
    </div>
  );
};

export default App;
