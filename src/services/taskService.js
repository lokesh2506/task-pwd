import { db } from "./firebase";
import { collection, addDoc, query, where, onSnapshot, doc, deleteDoc, updateDoc  } from "firebase/firestore";

export const addTask = async (task) => {
  return await addDoc(collection(db, "tasks"), {
    ...task,
    createdAt: new Date()
  });
};

export const getTasks = (userId, callback) => {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(tasks);
  });
};

export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.error("Delete error:", error);
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      status: status
    });
  } catch (error) {
    console.error("Update error:", error);
  }
}

export const updateTask = async (taskId, data) => {
  try {
    await updateDoc(doc(db, "tasks", taskId), data);
  } catch (error) {
    console.error("Update error:", error);
  }

};