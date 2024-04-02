import axios, { AxiosResponse } from "axios";
import { TaskModel } from "../models/taskModels";

const API_URL = "http://localhost:3000/api/tasks";

// Get tasks list based on search query
export async function getTasksDB(query: string = "") {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/?q=${query}`);
    console.log(response);
    if (!response.data) return [];
    const data: TaskModel[] = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get task by id
export async function getTaskByIdDB(id: string) {
  const response: AxiosResponse = await axios.get(`${API_URL}/${id}`);
  console.log(response);
  if (!response.data) throw Error("No contact found");
  return response.data as TaskModel;
}

// Create new task
export async function createTaskDB() {
  const newTask = {
    id: "",
    name: "",
    content: "",
    startDate: new Date(),
    endDate: new Date(),
    tags: [],
  };
  const response: AxiosResponse = await axios.post(API_URL, newTask);
  return response.data as TaskModel;
}

// Update existing task if found
export async function updateTaskDB(updateModel: TaskModel) {
  const response: AxiosResponse = await axios.put(
    `${API_URL}/${updateModel.id}`,
    updateModel
  );
  console.log(response);
  if (!response.data) return [];
  return response.data as TaskModel[];
}

// Delete existing task
export async function deleteTaskDB(id: string) {
  const response: AxiosResponse = await axios.delete(`${API_URL}/${id}`);
  console.log(response);
  if (!response.data) return false;
  return true;
}