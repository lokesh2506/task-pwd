import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, deleteTask, updateTaskStatus }) => {

  const [open,setOpen] = useState(false);

  return (

    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex justify-between items-start shadow-sm hover:shadow-md transition">

      {/* Left Section */}
      <div className="flex gap-3 items-start">

        <input
          type="checkbox"
          className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
          checked={task.status === "completed"}
          onChange={(e)=>
            updateTaskStatus(
              task.id,
              e.target.checked ? "completed" : "pending"
            )
          }
        />

        <div>
          <h2 className={`font-semibold text-lg ${task.status === "completed" ? "line-through text-gray-400" : "dark:text-white"}`}>
            {task.title}
          </h2>

          {task.description && (
            <p className="text-gray-500 text-sm mt-1">
              {task.description}
            </p>
          )}

          {task.dueDate && (
            <span className="inline-block mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
              Due {task.dueDate}
            </span>
          )}
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <FaEdit
          className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
          onClick={()=>setOpen(true)}
        />

        <FaTrash
          className="cursor-pointer text-red-500 hover:text-red-700 transition"
          onClick={()=>deleteTask(task.id)}
        />

      </div>

      {open && (
        <EditTaskModal
          task={task}
          close={()=>setOpen(false)}
        />
      )}

    </div>

  );
};

export default TaskCard;