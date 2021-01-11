import axios from 'axios'

const baseUrl = '/api'

export function getAllPeople() {
  return axios.get(`${baseUrl}/people`)
}

export function getAllEvents() {
  return axios.get(`${baseUrl}/events`)
}