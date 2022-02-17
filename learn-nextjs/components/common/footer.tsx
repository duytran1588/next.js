import { Box } from '@mui/system';
import * as React from 'react';

export interface FooterProps {}

export function Footer(props: FooterProps) {
	return (
		<Box component="footer" py={2} textAlign="center">
			Footer
		</Box>
	);
}
