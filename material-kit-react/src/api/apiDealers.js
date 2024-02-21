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

export const getAllDealers = async (page, search, phone) => {
  return sleepAndApiRequest(() =>
    axios.get(`${BASE_URL}/delivery/all/query/${page}/${search}/${phone}`, headersConf())
  );
};

export const updateDealer = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/delivery/update`, data, headersConf()));
};

export const createDealer = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/delivery/create`, data, headersConf()));
};

export const getDealer = async (data) => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/delivery/get/${data}`, headersConf()));
};

export const deleteDealer = async (data) => {
  return sleepAndApiRequest(() =>
    axios.delete(`${BASE_URL}/delivery/delete/${data}`, headersConf())
  );
};
