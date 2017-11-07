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

export const uploadFile = (data) => {
  return axios.post('http://localhost:8000/upload', data)
};