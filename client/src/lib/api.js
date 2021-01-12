import axios from 'axios'

const baseUrl = '/api'

export function getAllPeople() {
  return axios.get(`${baseUrl}/people`)
}

export function getOnePerson(id) {
  return axios.get(`${baseUrl}/people/${id}`)
}

export function getAllEvents() {
  return axios.get(`${baseUrl}/events`)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}

export function registerUser(formdata) {
  console.log(formdata)
  return axios.post(`${baseUrl}/register`, formdata)
}