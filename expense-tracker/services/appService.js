import axios from 'axios';

const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBudgetInfo = async (baseUrl) => {
  const response = await axios.get(baseUrl);
  return response.data[0];
};

const create = async (baseUrl, newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (baseUrl, newObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteItem = async (baseUrl, id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getBudgetInfo, create, update, deleteItem };
