import { Container, Link as MuiLink, Stack } from '@mui/material'; //cause Link is also imported from 'next/link', so we need to change Link into MuiLink to
//use it as an <a></a> tags
import { Box } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ROUTE_LIST } from './routes';
import clsx from 'clsx';

export function HeaderDesktop() {
	const router = useRouter();

	return (
		<Box display={{ xs: 'none', md: 'block' }} py={2}>
			<Container>
				{/* Component Stack is used for flex box */}
				<Stack direction="row" justifyContent="flex-end">
					{ROUTE_LIST.map((route) => (
						<Link href={route.path} key={route.path} passHref>
							<MuiLink
								sx={{ ml: 2, fontWeight: 'medium' }}
								className={clsx({ active: router.pathname === route.path })}
							>
								{/* if router.pathname === route.path => className='active' */}
								{route.label}
							</MuiLink>
						</Link>
					))}
				</Stack>
			</Container>
		</Box>
	);
}
