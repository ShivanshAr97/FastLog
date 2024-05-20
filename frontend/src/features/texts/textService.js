import axios from "axios";

const API_URL = "https://loginfinal-zuam.onrender.com/api/text/";

const createText = async (textData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.post(API_URL, textData, config);
  return resp.data;
};

const getTexts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.get(API_URL, config);
  return resp.data;
};

const updateText = async (text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL,text, config);
  return response.data;
};

const deleteText = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const textService = { createText, getTexts, deleteText, updateText };

export default textService;
