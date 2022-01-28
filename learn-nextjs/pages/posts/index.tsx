import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface PostListPageProps {
	posts: any[];
}

export default function PostListPage({ posts }: PostListPageProps) {
	return (
		<div>
			<h1>Post List Page</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={`/posts/${post.id}`}>
							<a>{post.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
	context: GetStaticPropsContext
) => {
	//server-side
	//build-time

	/**
	 * in production mode (run build):
	 * 		+ getStaticProps runs on server-side at the build-time
	 * 		+ data will be passed to props and transfer to component PostListPage
	 * in dev mode (run dev)
	 * 		+ getStaticProps runs for each request
	 */
	console.log('static props'); //this not appear on client side

	//fetch API
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
	const data = await response.json();
	// console.log('data', data); //this appears on server if (run build)

	//user just request id and title but server returns too much data, so need map to filter two props: id and title
	return {
		props: {
			posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
		},
	};
};
