import BaseURL from './BaseURL'

const Search = async (query) => {
  try {
    const response = await BaseURL.get(`/products/search?${query}`);
    console.log(response.data.products)
    console.log(response)
    console.log(query)
    return Promise.resolve(response.data.products);
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

export default Search;
