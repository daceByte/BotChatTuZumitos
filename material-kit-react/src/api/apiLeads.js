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

export const getAllLeads = async () => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/lead/all`, headersConf()));
};

export const updateLead = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/lead/update`, data, headersConf()));
};

export const createLead = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/lead/create`, data, headersConf()));
};

export const getLead = async (data) => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/lead/get/${data}`, headersConf()));
};

export const leadToClient = async (data) => {
  return sleepAndApiRequest(() => axios.delete(`${BASE_URL}/lead/delete/${data}`, headersConf()));
};
