import { Box } from '@mui/system';
import * as React from 'react';

export interface HeaderMobileProps {}

export function HeaderMobile(props: HeaderMobileProps) {
	//to see props of display https://mui.com/system/display/
	return <Box display={{ xs: 'block', md: 'none' }}>Header Mobile</Box>;
	// return <Box sx={{ display: { xs: 'block', lg: 'none' } }}>Header Mobile</Box>;
	//or we can write this <Box sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}>Header Mobile</Box>
	//because Only the Box, Stack, Typography, and Grid components accept the system properties (ex: display) as props
}
