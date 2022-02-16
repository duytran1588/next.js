import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
	studentId: string;
}

const MILISECOND_PER_HOUR = 60 * 60 * 1000;

export function StudentDetail({ studentId }: StudentDetailProps) {
	//fetcher: /students/${studentId} => {axiosClient.get(students/${studentId})}
	/**
	 * in StudentDetail.tsx 	<StudentDetail studentId="sktwi1cgkkuif36f3" /> is repeated 3 times => means useSWR(`/students/${studentId}`, {}) is
	 * called 3 times but, useSWR recognize that there is only one key `/students/${studentId}` in useSWR => useSWR will only perform once
	 */
	const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {

		/**
		 * How do we know useSWR will return this object { data, error, mutate, isValidating } ? check docs in https://swr.vercel.app/docs/options
		 * we have useSWR(key, fetcher, options)
		 * 	-if key is already an api url => fetcher is optional cause we already set it in the value of SWRConfig in _app.tsx
		 * 	-if key is simply a string => we need to define fetcher telling what we need to do with the key argument
		 * 	-options is optional which are defined in https://swr.vercel.app/docs/options
		 */

		revalidateOnFocus: false,
		dedupingInterval: MILISECOND_PER_HOUR,
		// dedupingInterval: 2000,//in 2s, no matter how many requests called, swr just perform one request
	});

	function handleMutateClick() {
    //mutate to change data
		mutate(
			{
				name: 'easy frontend',
			},
			true//trigger reupdate data from server
		);
	}
	return (
		<div>
			Name:{data?.name || '--'} <button onClick={handleMutateClick}>mutate</button>
		</div>
	);
}
