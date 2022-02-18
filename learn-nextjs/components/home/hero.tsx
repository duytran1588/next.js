import avatar from '@/images/FE_img.png';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import * as React from 'react';

export function HeroSection() {
	return (
		<Box component="section" pt={18} pb={9}>
			<Container>
				<Stack spacing={4} direction="row" alignItems={'flex-start'}>
					<Box>
						{/* tag is h1 but style of h3 tag */}
						<Typography component="h1" variant="h3" fontWeight="bold" mb={5}>
							Hi I am Daniel, <br /> Frontend Developer
						</Typography>
						<Typography mb={5}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sit repellendus
							dolores reiciendis aliquam, consectetur quaerat ipsam optio illum aliquid? Accusantium
							veritatis magni laboriosam labore esse, sint eius magnam doloremque.
						</Typography>
						<Button variant="contained" size='large'>Download Resume</Button>
					</Box>
					<Box sx={{ minWidth: '240px'}}>
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
