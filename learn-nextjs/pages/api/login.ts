// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

type Data = {
	message: string;
};

export const config = {
	api: {
		bodyParser: false, //nextJS automatically make bodyParser: true, but we just need it to pass request to api server,
		// config bodyParser: false
	},
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method is not supported' });
	}

	return new Promise((resolve) => {
		// don't send cookies to API server
		req.headers.cookie = '';

		//handle the returned response of login request api
		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			let body = '';

			proxyRes.on('data', function (chunk) {
				body += chunk;
				console.log('body', body)
			});

			proxyRes.on('end', function () {
				try {
					const { accessToken, expiredAt } = JSON.parse(body);

					//convert token to cookies
					const cookies = new Cookies(req, res, {
						secure: process.env.NODE_ENV !== 'development', // in NODE_ENV = test or production secure is used
					});
					cookies.set('access_token', accessToken, {
						httpOnly: true,
						sameSite: 'lax',
						expires: new Date(expiredAt),
					});

					(res as NextApiResponse).status(200).json({ message: 'login successfully' });
				} catch (error) {
					(res as NextApiResponse).status(500).json({ message: 'something went wrong' });
				}
				resolve(true);
			});
		};

		//when receive response, call handleLoginResponse
		proxy.once('proxyRes', handleLoginResponse);

		//forward request to api server asking for response
		proxy.web(req, res, {
			target: process.env.API_URL, //send request to url of api server
			changeOrigin: true,
			selfHandleResponse: true, //in login feature, we want to handle the returned response by ourselves => true
		});
	});
}
