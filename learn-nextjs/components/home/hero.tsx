import avatar from '@/images/FE_img.png';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import * as React from 'react';

export function HeroSection() {
	return (
		//for responsive here pt={{xs: 4, md: 8}}// mobile: pt=4, laptop or bigger: pt=8
		<Box component="section" pt={{ xs: 4, md: 18 }} pb={{ xs: 7, md: 9 }}>
			<Container>
				{/* respnsive for direction direction={{xs: column-reverse, md: row}}, responsive for alignItems */}
				<Stack
					spacing={8}
					direction={{ xs: 'column-reverse', md: 'row' }}
					alignItems={{ xs: 'center', md: 'flex-start' }}
					textAlign={{ xs: 'center', md: 'left' }}
				>
					<Box>
						{/* tag is h1 but style of h3 tag */}
						<Typography component="h1" variant="h3" fontWeight="bold" mb={{ xs: 3.5, md: 5 }}>
							Hi I am Daniel, <br /> Frontend Developer
						</Typography>
						<Typography mb={{ xs: 3.5, md: 5 }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sit repellendus
							dolores reiciendis aliquam, consectetur quaerat ipsam optio illum aliquid? Accusantium
							veritatis magni laboriosam labore esse, sint eius magnam doloremque.
						</Typography>
						<Button variant="contained" size="large">
							Download Resume
						</Button>
					</Box>
					<Box sx={{ minWidth: '240px' }}>
						<Image src={avatar} layout="responsive" alt="avatar" />
					</Box>
				</Stack>
			</Container>
		</Box>
	);
}

/**
 * section
 * 	container
 * 		flex-container(stack)
 * 			flex-item(Box left)
 * 					h1, p, button
 * 			flex-item(Box right)
 * 					img
 */
