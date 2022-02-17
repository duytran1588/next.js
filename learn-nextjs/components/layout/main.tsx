import { LayoutProps } from '@/models/index';
import { Stack, Container } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import { Footer, Header } from '../common';

export function MainLayout({ children }: LayoutProps) {
	return (
		<Stack minHeight="100vh">
			<Header />

			<Box component="main" flexGrow={1}>
				<Container maxWidth="sm">
					SM CONTAINER
				</Container>
				<Container>MD CONTAINER</Container>

				<Link href="/">
					<a>Home</a>
				</Link>
				<Link href="/blog">
					<a>Blog</a>
				</Link>
				<Link href="/works">
					<a>Works</a>
				</Link>
				{children}
			</Box>

			<Footer />
		</Stack>
	);
}
