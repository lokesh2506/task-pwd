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

  useEffect(() => {
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

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = filteredTasks.filter(
    (task) => task.dueDate === today
  );

  const upcomingTasks = filteredTasks.filter(
    (task) => task.dueDate && task.dueDate > today
  );

  const pastPendingTasks = filteredTasks.filter(
    (task) => task.dueDate && task.dueDate < today && task.status === "pending"
  );

  const pastCompletedTasks = filteredTasks.filter(
    (task) => task.dueDate && task.dueDate < today && task.status === "completed"
  );

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
        <div className="space-y-6">

          {todayTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 dark:text-white">Today</h2>
              <div className="grid gap-4">
                {todayTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTaskStatus={updateTaskStatus}
                  />
                ))}
              </div>
            </div>
          )}

          {upcomingTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 dark:text-white">Upcoming</h2>
              <div className="grid gap-4">
                {upcomingTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTaskStatus={updateTaskStatus}
                  />
                ))}
              </div>
            </div>
          )}

          {pastPendingTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 dark:text-white">Pending (Past)</h2>
              <div className="grid gap-4">
                {pastPendingTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTaskStatus={updateTaskStatus}
                  />
                ))}
              </div>
            </div>
          )}

          {pastCompletedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 dark:text-white">Completed (Past)</h2>
              <div className="grid gap-4">
                {pastCompletedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTaskStatus={updateTaskStatus}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      <CreateTaskButton />
    </div>
  );
};

export default Dashboard;