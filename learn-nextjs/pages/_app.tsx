import { axiosClient } from '@/api/axios-client';
import { EmptyLayout } from '@/components/layout';
import { SWRConfig } from 'swr';
import { AppPropsWithLayout } from '../models';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	console.log('app-rerender');

	const Layout = Component.Layout ?? EmptyLayout;

	return (
		<SWRConfig value={{fetcher: url => axiosClient.get(url), shouldRetryOnError: false}}>
			{/* this <Layout> tag is not rerendered when Component changed */}
			<Layout>
				{/* everytime user navigates to a certain page, MyApp will receive the new component that is respective to the page, and rerender
	  what will rerender is just <Component {...pageProps} />  */}
				<Component {...pageProps} />;
			</Layout>
		</SWRConfig>
	);
}

export default MyApp;
