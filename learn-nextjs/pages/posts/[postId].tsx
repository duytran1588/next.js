import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailProps {}

export default function PostDetailPage(props: PostDetailProps) {
	const router = useRouter();

	console.log('postId', router.query)
	return (
		<div>
			<h1>Post Detail Page</h1>
			<p>Query: {JSON.stringify(router.query)}</p>
      {/* 
        if url is http://localhost:3000/posts/12345?abc=12
        => the result: Query: {"abc":"12","postId":"12345"}
      */}
		</div>
	);
}
