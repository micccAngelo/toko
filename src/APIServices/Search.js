import BaseURL from './BaseURL'

const Search = async (query) => {
  try {
    const response = await BaseURL.get(`/posts/search?q=${query}`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

export default Search;
