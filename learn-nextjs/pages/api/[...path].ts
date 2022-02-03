// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

// type Data = {
// 	name: string;
// };

export const config = {
	api: {
		bodyParser: false, 
	},
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise((resolve) => {
		//in different API requests, we need to convert cookies to header authorization
		const cookies = new Cookies(req, res)

		const accessToken = cookies.get('access_token');
		//if accessToken is existed in cookies
		if (accessToken){
			req.headers.authorization = `Bearer ${accessToken}`
		}

		// don't send cookies to API server
		req.headers.cookie = '';

		// /api/students
		// https://js-post-api.herokuapp.com/api/students (this is api of easy frontend created in advance)
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: false,
		});
		// res.status(200).json({ name: 'PATH-Match all here' });
		proxy.once('proxyRes', () => { 
			resolve(true); //let nextJS know after this request is resolved to prevent issue api resolved without sending a response ...
		});
	});
}
