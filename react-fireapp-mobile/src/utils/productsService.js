const SERVER = "http://localhost:8080/products";

export const loadProducts = () => {
  return fetch(SERVER)
    .then(products => products.json())
};