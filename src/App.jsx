import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const API = "https://backend-assignment-01.vercel.app/tasks";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!task.trim()) return;
    const res = await axios.post(API, { text: task });
    setTasks([...tasks, res.data]);
    setTask("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const editTask = async (id) => {
    const updatedText = prompt("Enter new task");
    if (updatedText && updatedText.trim()) {
      const res = await axios.put(`${API}/${id}`, { text: updatedText });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    }
  };

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
        <button className="add-btn" onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            {task.text}
            <div className="task-actions">
              <button onClick={() => editTask(task._id)} className="edit-btn">Edit</button>
              <button onClick={() => deleteTask(task._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
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
