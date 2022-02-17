import { axiosClient } from '@/api/axios-client';
import { EmptyLayout } from '@/components/layout';
import { createEmotionCache, theme } from '@/utils/index';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SWRConfig } from 'swr';
import { AppPropsWithLayout } from '../models';
import '../styles/globals.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
	Component, //Component maybe about, login, index page...
	pageProps,
	emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
	const Layout = Component.Layout ?? EmptyLayout; //if Component.Layout is undefined => EmptyLayout is rendered

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{/* https://swr.vercel.app/docs/global-configuration - global config for swr */}
				<SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
					{/* shouldRetryOnError: if api request is failed -> should not retry => shouldRetryOnError: false */}
					{/* this <Layout> tag is not rerendered when Component changed */}
					<Layout>
						{/* everytime user navigates to a certain page, MyApp will receive the new component that is respective to the page, and rerender
	 			 what will rerender is just <Component {...pageProps} />  */}
						<Component {...pageProps} />;
					</Layout>
				</SWRConfig>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
