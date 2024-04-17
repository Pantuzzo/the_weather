import axios from 'axios'

export const weatherApi = (country: string) => {
  const apiURL = `http://api.weatherapi.com/v1/current.json?key=2454b0c3b795429ea36140929241704&q=${country}&aqi=yes`
  return axios.get(apiURL)
}
