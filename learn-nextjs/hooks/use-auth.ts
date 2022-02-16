import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '@/api/index';

export function useAuth(options?: Partial<PublicConfiguration>) {
	console.log('useAuth')
	//profile
	const {
		data: profile, //change name of prop data to profile
		error,
		mutate,
	} = useSWR('/profile', {
		dedupingInterval: 60 * 60 * 1000,
		revalidateOnFocus: false, //navigate to the new tab and back to the current tab, no need to refetch data
		...options,
	});

  //this file run for the first time
  const firstLoading = profile === undefined && error === undefined // profile === undefined: true && error === undefined: true => true

	//after first loading, profile === undefined, error !== undefined (error receive a certain string ) => firstLoading = false

	async function login() {
		await authApi.login({
			username: 'test1',
			password: '123123',
		});
		await mutate(); //to trigger above profile request (7-15) to get profile again 
	}
	async function logout() {
		await authApi.logout();
		await mutate({}, false); //delete temporary data {}, false: no recall get profile api
		// mutate({}, false) or mutate(null, false) is ok, if mutate(undefined, false) the feature is confusing, old data is regenerated
	}

	return {
		profile,
		error,
		login,
		logout,
    firstLoading,
	};
}
