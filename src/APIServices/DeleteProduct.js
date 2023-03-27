import BaseURL from './BaseURL';

const DeleteProduct = async (id) => {
  try {
    const response = await BaseURL.delete(`/products/${id}`);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default DeleteProduct;
