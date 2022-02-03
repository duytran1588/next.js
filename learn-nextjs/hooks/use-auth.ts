import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '@/api/index';

export function useAuth(options?: Partial<PublicConfiguration>) {
	//profile
	const {
		data: profile,
		error,
		mutate,
	} = useSWR('/profile', {
		dedupingInterval: 60 * 60 * 1000,
		revalidateOnFocus: false, //navigate to the new tab and back to the current tab, no need to refetch data
		...options,
	});

	async function login() {
		await authApi.login({
			username: 'test1',
			password: '123123',
		});
		await mutate(); //to trigger above get profile api to update data profile
	}
	async function logout() {
		await authApi.logout();
		await mutate({}, false); //false: no recall get profile api
	}

	return {
		profile,
		error,
		login,
		logout,
	};
}
