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

export const getAllResponses = async () => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/response/all`, headersConf()));
};

export const updateResponseApi = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/response/update`, data, headersConf()));
};

export const createResponse = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/response/create`, data, headersConf()));
};

export const getResponse = async (data) => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/response/get/${data}`, headersConf()));
};

export const deleteResponse = async (data) => {
  return sleepAndApiRequest(() => axios.delete(`${BASE_URL}/response/delete/${data}`, headersConf()));
};
