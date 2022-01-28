import { useRouter } from 'next/router';
import React from 'react';

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
	const router = useRouter();
	console.log("About query: ", router.query);

	return <div>About page</div>;

}

/**
 * to make this page become not an Automatic Static Optimization page, use this function, router.query will be log at the first time
 * 
 * export async function getServerSideProps() {
 * 	return {props: {},}
 * }
 */
