import axios from "axios";
import { BASE_URL, headersConf, sleep } from "../utils/api-config";

const API_TIMEOUT = 500;

const apiRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw {
      success: false,
      body: "Error en la conexión con el servidor!",
    };
  }
};

const sleepAndApiRequest = async (apiCall) => {
  await sleep(API_TIMEOUT);
  return apiRequest(apiCall());
};

export const getAllBranchs = async () => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/branch/all`, headersConf()));
};

export const updateBranch = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/branch/update`, data, headersConf()));
};

export const createBranch = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/branch/create`, data, headersConf()));
};

export const getBranch = async (data) => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/branch/get/${data}`, headersConf()));
};

export const deleteBranch = async (data) => {
  return sleepAndApiRequest(() => axios.delete(`${BASE_URL}/branch/delete/${data}`, headersConf()));
};
