import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { EmptyLayout } from '@/components/layout';
import { AppPropsWithLayout } from '../models';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	console.log('app-rerender');

	const Layout = Component.Layout ?? EmptyLayout;

	return (
		//this <Layout> tag is not rerendered when Component changed
		<Layout>
			{/* everytime user navigates to a certain page, MyApp will receive the new component that is respective to the page, and rerender
	  what will rerender is just <Component {...pageProps} />  */}
			<Component {...pageProps} />;
		</Layout>
	);
}

export default MyApp;
