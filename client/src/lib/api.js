import axios from 'axios'

const baseUrl = '/api'

export function getAllPeople() {
  return axios.get(`${baseUrl}/people`)
}