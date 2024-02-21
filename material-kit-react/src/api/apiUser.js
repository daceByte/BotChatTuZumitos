import axios from 'axios'
import { BASE_URL, headersConf, sleep } from '../utils/api-config'

const API_TIMEOUT = 500

const apiRequest = async (request) => {
  try {
    const response = await request
    return response.data
  } catch (error) {
    throw {
      success: false,
      body: 'Error en la conexión con el servidor!',
    }
  }
}

const sleepAndApiRequest = async (apiCall) => {
  await sleep(API_TIMEOUT)
  return apiRequest(apiCall())
}

export const login = async (data) => {
  return sleepAndApiRequest(() => axios.post(`${BASE_URL}/user/login`, data, headersConf()))
}