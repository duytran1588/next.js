// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	//if the method user uses is different from 'GET', the resul status is error 404 with the warning in prop name
	if (req.method !== 'GET') {
		return res.status(404).json({ name: 'method is not supported' });
	}
	res.status(200).json({ name: 'Get list of products' });
}
