// import Header from '@/components/common/header';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//Header is just allowed to render in client, not in server, using this code line
const Header = dynamic(() => import('@/components/common/header'), { ssr: true });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
	const [postList, setPostList] = useState([]);
	const router = useRouter();
	console.log('About query: ', router.query);
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
		<div>
			<h1>About page</h1>
			<Header />

			<ul className="post-list">
				{postList.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
			<button onClick={handleNextClick}>Next page</button>
		</div>
	);
}

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
