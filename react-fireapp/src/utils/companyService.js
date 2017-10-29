const SERVER = "http://localhost:8080/companies";

export const loadCompanies = () => {
  return fetch(SERVER)
    .then(companies => companies.json())
};

export const createCompany = (company) => {
  return fetch(SERVER, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(company)
  }).then(res => res.json())
};

export const updateCompany = (company) => {
  return fetch(`${SERVER}/${company.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(company)
  }).then(res => res.json())
};

export const deleteCompany = (id) => {
  return fetch(`${SERVER}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
};