import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, deleteTask, updateTaskStatus }) => {

  const [open,setOpen] = useState(false);

  return (

    <div className="p-4 bg-white rounded shadow flex justify-between items-center">

      <div>

        <h2 className="font-bold">{task.title}</h2>

        <p className="text-gray-600">{task.description}</p>

        {task.dueDate && (
          <p className="text-sm text-red-500">
            Due: {task.dueDate}
          </p>
        )}

      </div>


      <div className="flex items-center gap-4">

        {/* checkbox */}
        <span>{task.status}</span>

        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={(e)=>
            updateTaskStatus(
              task.id,
              e.target.checked ? "completed" : "pending"
            )
          }
        />


        {/* edit */}

        <FaEdit
          className="cursor-pointer text-blue-500"
          onClick={()=>setOpen(true)}
        />


        {/* delete */}

        <FaTrash
          className="cursor-pointer text-red-500"
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