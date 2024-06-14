import { RiFileEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  getDocs,
  QuerySnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { connect, db } from "../index";

const TodoList = () => {
  const [taskData, setTaskData] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [updatedTaskText, setUpdatedTaskText] = useState<string>("");

  useEffect(() => {
    getToDoTask();
  }, [taskData]);

  const getToDoTask = async () => {
    try {
      const querySnapshots: QuerySnapshot = await getDocs(connect);
      const array: any[] = [];
      querySnapshots.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setTaskData(array);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteToDo = async (id: string) => {
    console.log(id);
    try{

      await deleteDoc(doc(db, "ToDo_List", id));
    }catch(error){
      console.log(error);

    }

    
  };

  const handleUpdateClick = (task: any) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
    setUpdatedTaskText(task.task);
  };

  const handleUpdateTask = async () => {
    if (!selectedTask) return;

    try {
      const updatedTask = { ...selectedTask, task: updatedTaskText };
      await updateDoc(doc(db, "ToDo_List", updatedTask.id), updatedTask);
      setIsPopupOpen(false);
      getToDoTask();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-4">
      {taskData.map((item: any, index) => (
        
        <div
          key={index}
          className="h-8 my-4 w-[95%] flex items-center justify-between"
        >
          <p className="italic font-semibold">{item.task}</p>
          <div className="w-36 gap-2 flex h-full items-center justify-between">
            <button  onClick={() => handleUpdateClick(item)} className="bg-green-700 px-1 flex-1 text-white flex items-center justify-around font-semibold rounded">
              Edit
              <RiFileEditFill
               
                className=" text-white cursor-pointer"
              />
            </button>
            <button onClick={() => deleteToDo(item.id)} className="bg-red-700 px-1 flex-1 text-white flex items-center justify-around font-semibold rounded">
              Delete
              <MdDelete
                
                className=" text-white cursor-pointer"
              />
            </button>
          </div>
        </div>
      ))}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg flex flex-col">
            <p className="my-2">
              {" "}
              <span className="font-bold text-red-700">Edit Task:</span>{" "}
              <span className="italic ml-1">{selectedTask?.task}</span>
            </p>
            <div className="w-full">
              <input
                type="text"
                value={updatedTaskText}
                onChange={(e) => setUpdatedTaskText(e.target.value)}
                className="border border-gray-400 p-1 mb-2 w-full outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-green-700 py-1 rounded text-white font-semibold"
                onClick={handleUpdateTask}
              >
                Update
              </button>
              <button
                className="flex-1 bg-red-700 py-1 rounded text-white font-semibold"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
