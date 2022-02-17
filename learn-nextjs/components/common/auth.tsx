import { useAuth } from '@/hooks/index';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthProps {
	children: any;
}

export function Auth({ children }: AuthProps) {
	console.log('test useEffect');
	const router = useRouter();
	const { profile, firstLoading }: any = useAuth();

	useEffect(() => {
		console.log('firstLoading', firstLoading);
		console.log('test useEffect 2');
		//if firstLoading has already been implemented but profile?.username is still undefined or empty
		if (!firstLoading && !profile?.username) router.push('/login');
	}, [profile, router, firstLoading]);

	if (!profile?.username) return <p>Loading...</p>;
	return <div>{children}</div>;
}

/**
 * If we don't use const {profile, firstLoading} = useAuth(), the code flow is:
 * 	- console.log('test useEffect')
 * 	- console.log('test useEffect 2')
 *
 * If we do use const {profile, firstLoading} = useAuth(), the code flow is:
 * 	- console.log('test useEffect')
 * 	- console.log('test useEffect 2')
 * 	- console.log('test useEffect')
 * 	=> useAuth run 2 times: the first is having not result yet, the second times is api return a result (in use-auth.ts) (success or error) => that the
 * reason useAuth make component rerender
 *
 * the flow code when we use const {profile, firstLoading} = useAuth() in case we are not login yet
 * 	- console.log('test useEffect')
 * 	- in useAuth(), api get profile will be requested
 * 	- Because we are not logged in yet, so firstLoading = true
 * 	- console.log('firstLoading', true)
 * 	- console.log('test useEffect 2')
 *
 * 	- After asynchronus function in use-auth.ts handled, the firstLoading is change
 * 	- firstLoading is an argument in dependencies, so its value changes makes useEffect retrigger, component will be rerendered
 * 	- console.log('test useEffect)
 * 	- console.log('firstLoading', false)
 * 	- console.log('test useEffect 2')
 **/
