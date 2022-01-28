import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostListPageProps {}

export default function PostListPage(props: PostListPageProps) {
	const router = useRouter();
	console.log('posts', router.query);
	return <div>Post List Page</div>;
}
