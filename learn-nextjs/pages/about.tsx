// import Header from '@/components/common/header';
import { Header } from '@/components/common';
import { AdminLayout } from '@/components/layout';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//Header is just allowed to render in client, not in server, using this code line
// const Header = dynamic(() => import('@/components/common/header'), { ssr: true });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
	const [postList, setPostList] = useState([]);
	const router = useRouter();	
	const page = router.query?.page;

	//to fetch data just on client side, use useEffect (useEffect just run on client)
	useEffect(() => {
		// console.log('useEffect')
		if (!page) return;
		(async () => {
			const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
			const data = await response.json();
			setPostList(data.data);
		})();
	}, [page]);

	const handleNextClick = () => {
		router.push(
			{
				pathname: '/about',
				query: {
					page: (Number(page) || 1) + 1,
				},
			},
			undefined,
			{ shallow: true } //not allow to update on server when change page
		);
	};

	return (
		<Box>
			<h1></h1>
			{/* variant means style, component is h1 but style is h3 */} 
			{/* color is got from theme.ts */}
			<Typography component="h1" variant="h3" color="primary.main">
				About page
			</Typography>
			<Header />

			<ul className="post-list">
				{postList.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
			<button onClick={handleNextClick}>Next page</button>
		</Box>
	);
}

AboutPage.Layout = AdminLayout;

export async function getStaticProps() {
	//in dev mode, getStaticProps is called for each request-in this case, only Client is allowed to handle change next page, use shallow to trigger update on client
	console.log('get static props');
	return {
		props: {},
	};
}

/**
 * to make this page become not an Automatic Static Optimization page, use this function, router.query will be log at the first time
 *
 * export async function getServerSideProps() {
 * 	return {props: {},}
 * }
 */
