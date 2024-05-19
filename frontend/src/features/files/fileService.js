import axios from "axios";

const API_URL = "/api/files/";

const createFile = async (fileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.post(API_URL, fileData, config);
  return resp.data;
};

const getFiles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.get(API_URL, config);
  return resp.data;
  // console.log(resp.data);
};

const deleteFile = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const fileService = { createFile, getFiles, deleteFile };

export default fileService;
