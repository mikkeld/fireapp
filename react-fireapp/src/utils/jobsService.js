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

const map = new Map([["client", "clientPrice"], ["product", "productPrice"]]);

export const calculateCost = (product, type) => {
  const user = map.get(type);
  return product[user] * product.productQuantity
};

export const calculateTotalCost = (products, type) => {
  let totalCosts = 0;
  products.forEach(product => totalCosts += calculateCost(product, type));
  return totalCosts
};

export const uploadFile = (data) => {
  return axios.post('http://localhost:8000/upload', data)
};