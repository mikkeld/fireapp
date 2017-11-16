const SERVER = "http://localhost:8080/products";

export const loadProducts = () => {
  return fetch(SERVER)
    .then(products => products.json())
};

export const createProduct = (product) => {
  return fetch(SERVER, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then(res => res.json())
};

export const updateProduct = (product) => {
  return fetch(`${SERVER}/${product.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then(res => res.json())
};

export const deleteProduct = (id) => {
  return fetch(`${SERVER}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
};

