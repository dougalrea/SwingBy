import axios from 'axios'

import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return { headers: { Authorization: `Bearer ${getToken()}` } }
}

export function getAllEvents() {
  return axios.get(`${baseUrl}/events`)
}

export function createEvent(formdata) {
  return axios.post(`${baseUrl}/events`, formdata, headers())
}

export function getOneEvent(id) {
  return axios.get(`${baseUrl}/events/${id}`)
}

export function editEvent(id, formdata) {
  return axios.put(`${baseUrl}/events/${id}`, formdata, headers())
}

export function deleteEvent(id) {
  return axios.delete(`${baseUrl}/events/${id}`, headers())
}

export function createEventComment(id, formdata) {
  return axios.post(`${baseUrl}/events/${id}/comments`, formdata, headers())
}

export function deleteEventComment(id, commentId) {
  return axios.delete(`${baseUrl}/events/${id}/comments/${commentId}`, headers())
}

export function editEventComment(id, commentId, formdata) {
  return axios.put(`${baseUrl}/events/${id}/comments/${commentId}`, formdata, headers())
}

export function createRequestToAttendEvent(id) {
  return axios.post(`${baseUrl}/events/${id}/requests`, {}, headers())
}

export function deleteRequestToAttendEvent(id) {
  return axios.delete(`${baseUrl}/events/${id}/requests`, headers())
}

export function acceptRequestToAttendEvent(id, personId) {
  return axios.put(`${baseUrl}/events/${id}/requests/${personId}`, {}, headers())
}

export function deleteAttendee(id, personId) {
  return axios.delete(`${baseUrl}/events/${id}/attendees/${personId}`, headers())
}

export function getAllPeople() {
  return axios.get(`${baseUrl}/people`)
}

export function getOnePerson(id) {
  return axios.get(`${baseUrl}/people/${id}`)
}

export function createPersonReview(id, formdata) {
  return axios.post(`${baseUrl}/people/${id}/reviews`, formdata, headers())
}

export function deletePersonReview(id, reviewId) {
  return axios.delete(`${baseUrl}/people/${id}/reviews/${reviewId}`, headers())
}

export function editPersonReview(id, reviewId, formdata) {
  return axios.put(`${baseUrl}/people/${id}/reviews/${reviewId}`, formdata, headers())
}

export function followPerson(id) {
  return axios.post(`${baseUrl}/people/${id}/follow`, {}, headers())
}

export function unfollowPerson(id) {
  return axios.delete(`${baseUrl}/people/${id}/unfollow`, headers())
}

export function editUser(id) {
  return axios.put(`${baseUrl}/people/${id}`, headers())
}

export function deleteUser(id) {
  return axios.delete(`${baseUrl}/people/${id}`, headers())
}

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}