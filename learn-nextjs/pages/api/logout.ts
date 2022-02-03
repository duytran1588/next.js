// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies, { express } from 'cookies';

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
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method is not supported' });
	}

	//remove cookies
	const cookies = new Cookies(req, res);
	cookies.set('access_token'); //no need to set the value for 'access_token', it will automatically set 'access_token': ''
	res.status(200).json({ message: 'logout successfully' });
}
