import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostPageProps {
	post: any;
}

export default function PostDetailPage({ post }: PostPageProps) {
	const router = useRouter();

	//use it for fallback: true, to show loading when waiting for getStaticProps running to return new page
	if (router.isFallback) {
		return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>;
	}

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

		//the number of items prop paths has, the number of time getStaticProps is called and generates the same number of HTML detail pages
		paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
		// fallback: false, //if postId is not matched -> redirect to the not found page

		//if in posts/index.tsx, we change page=2 (postId is not stored in cache in advance) in fetch function, test fallback: 'blocking' to see the result
		// fallback: 'blocking',

		//because with fallback: 'blocking', the page seems not to be changed in the running time, the page is just absolutely changed after running completely, so it's not good for the UI cause user don't know if it is changing or not
		//try to use fallback: 'true',
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
	context: GetStaticPropsContext
) => {
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
		revalidate: 5, //used for ISR
	};
};
