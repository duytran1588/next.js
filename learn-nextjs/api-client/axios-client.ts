import axios from 'axios';

export const axiosClient = axios.create({
	baseURL: '/api', //cause use the same domain => only '/api',
	headers: {
		'Content-Type': 'application/json',
	},
});



// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);
