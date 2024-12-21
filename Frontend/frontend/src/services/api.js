import axios from 'axios';

const API_URL = 'http://localhost:9000/api/toDo';
//  get todos
export const getTodos = async (page = 1, limit = 10, search = '', filter = '') => {
  const response = await axios.get(`${API_URL}/todos?page=${page}&limit=${limit}&search=${search}&filter=${filter}`);
  return response.data;
};
// get todo by id api
export const getTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/todos/${id}`);
  return response.data;
};

//create to do api
export const createTodo = async (todoData) => {
    const response = await axios.post(`${API_URL}/todos`, todoData);
    return response.data;
  };
//   delete
export const deleteTodo = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  };
//update todo
export const updateTodo = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  };
  