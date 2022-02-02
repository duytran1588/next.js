// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

// type Data = {
// 	name: string;
// };

export const config = {
  api: {
    bodyParser: false, //nextJS automatically make bodyParser: true, but we just need it to pass request to api server, 
    // config bodyParser: false 
  },
}

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
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
}
