import axios from 'axios';

const SERVER = "http://localhost:8080/jobs";

export const loadJobs = () => {
  return fetch(SERVER)
    .then(jobs => jobs.json())
};

export const loadJobFromId = (id) => {
  const path = `${SERVER}/${id}`;
  return fetch(path)
    .then(job => job.json())
};

export const createJob = (job) => {
  return fetch(SERVER, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  }).then(res => res.json())
};

export const updateJob = (job) => {
  return fetch(`${SERVER}/${job.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  }).then(res => res.json())
};

export const deleteJob = (id) => {
  return fetch(`${SERVER}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
};

export const uploadFile = (data) => {
  return axios.post('http://localhost:8000/upload', data)
};