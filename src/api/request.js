import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BE_URL
});

const request = async (options) => {
  const onSuccess = (response) => {
    return Promise.resolve(response?.data);
  };

  const onError = (error) => {
    console.error('Request Failed:', error?.config);

    if (error.response) {
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Headers:', error.response.headers);
    } else {
      console.error('Error Message:', error.message);
    }

    const errorMessage =
      error.response?.data?.result?.message || error.response?.data?.result || error.message;

    const errorObject = new Error(errorMessage);
    errorObject.response = error.response;
    errorObject.status = error.response?.status;
    errorObject.data = error.response?.data;

    return Promise.reject(errorObject);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
