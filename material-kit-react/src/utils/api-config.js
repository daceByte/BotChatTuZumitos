export const BASE_URL = 'https://apizumitosv2.codevalcanos.com/api/v1'

export const headersConf = () => {
  let token
  try {
    token = localStorage.getItem('authentication')
  } catch (error) {
    token = ''
  }
  return {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `${token}`,
    },
  }
}

export const token = () => {
  let token
  try {
    token = localStorage.getItem('authentication')
  } catch (error) {
    token = ''
  }
  return token
}

export const sleep = (time) => new Promise((res) => setTimeout(res, time))
