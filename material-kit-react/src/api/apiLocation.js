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

export const getAllLocations = async (data) => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/location/all/${data}`, headersConf()));
};

export const updateLocation = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/location/update`, data, headersConf()));
};

export const createLocation = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/location/create`, data, headersConf()));
};

export const getLocation = async (data) => {
  return sleepAndApiRequest(() => axios.get(`${BASE_URL}/location/get/${data}`, headersConf()));
};

export const deleteLocation = async (data) => {
  return sleepAndApiRequest(() =>
    axios.delete(`${BASE_URL}/location/delete/${data}`, headersConf())
  );
};
