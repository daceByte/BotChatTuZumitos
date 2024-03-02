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

export const getAllClients = async (page, search, phone) => {
  return sleepAndApiRequest(() =>
    axios.get(`${BASE_URL}/client/all/query/${page}/${search}/${phone}`, headersConf())
  );
};

export const updateClient = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/client/update`, data, headersConf()));
};

export const createClientApi = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/client/create`, data, headersConf()));
};

export const getClient = async (data) => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/client/get/${data}`, headersConf()));
};

export const deleteClient = async (data) => {
  return sleepAndApiRequest(() => axios.delete(`${BASE_URL}/client/delete/${data}`, headersConf()));
};
