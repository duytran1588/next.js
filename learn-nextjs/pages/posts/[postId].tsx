import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostPageProps {
	post: any;
}

export default function PostDetailPage({ post }: PostPageProps) {
	const router = useRouter();

	if (!post) return null;
	return (
		<div>
			<h1>Post Detail Page</h1>
			<p>{post.title}</p>
			<p>{post.author}</p>
			<p>{post.description}</p>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	console.log('GET Static paths');
	//fetch API
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
	const data = await response.json();
	return {
		// paths: [
		// 	{
		// 		params: { postId: '1' },
		// 	},
		// 	{
		// 		params: { postId: '2' },
		// 	},
		// 	{
		// 		params: { postId: '3' },
		// 	},
		// 	{
		// 		params: { postId: '4' },
		// 	},
		// ],
		paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
		fallback: false, //if postId is not matched -> redirect to the not found page
	};
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
	context: GetStaticPropsContext
) => {
	console.log('GET Static props', context.params?.postId);
	const postId = context.params?.postId;
	//fetch API
	if (!postId) return { notFound: true };

	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
	const data = await response.json();

	//user just request id and title but server returns too much data, so need map to filter two props: id and title
	return {
		props: {
			post: data,
		},
	};
};
