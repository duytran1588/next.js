import { Container, Stack, Link as MuiLink } from '@mui/material'; //cause Link is also imported from 'next/link', so we need to change Link into MuiLink to
//use it as an <a></a> tags
import { Box } from '@mui/system';
import Link from 'next/link';
import * as React from 'react';
import { ROUTE_LIST } from './routes';

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
	return (
		<Box display={{ xs: 'none', md: 'block' }} py={2}>
			<Container>
				{/* Component Stack is used for flex box */}
				<Stack direction="row" justifyContent="flex-end">
					{ROUTE_LIST.map((route) => (
						<Link href={route.path} key={route.path} passHref>
							<MuiLink sx={{ ml: 2 }}>{route.label}</MuiLink>
						</Link>
					))}
				</Stack>
			</Container>
		</Box>
	);
}
