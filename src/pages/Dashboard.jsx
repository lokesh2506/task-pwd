import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreateTaskButton from "../components/CreateTaskButton";
import { useAuth } from "../hooks/useAuth";
import { getTasks,deleteTask, updateTaskStatus } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import { requestNotificationPermission, checkTodayTasks } from "../utils/notification";

const Dashboard = () => {

  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("all");

  uuseEffect(() => {
    requestNotificationPermission();
    if (!user) return;
    const unsubscribe = getTasks(user.uid, (tasks) => {
      setTasks(tasks);
      checkTodayTasks(tasks);
    });
    return () => unsubscribe();
  }, [user]);

  const filteredTasks = tasks
  .filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter(task => {
    if(filter === "all") return true;
    return task.status === filter;
  })
  .sort((a,b)=>{
    if(!a.dueDate) return 1;
    if(!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          My Tasks
        </h1>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="grid gap-4">
          {filteredTasks.map(task => (
            <TaskCard task={task} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} />
          ))}
        </div>
      </div>
      <CreateTaskButton />
    </div>
  );
};

export default Dashboard;