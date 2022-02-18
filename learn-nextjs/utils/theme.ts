import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
export let theme = createTheme({
	typography: {
		fontFamily: 'Heebo, sans-serif',
	},
	//visit this page for more view https://mui.com/customization/default-theme/
	palette: {
		primary: {
			main: '#FF6464',
		},
		secondary: {
			light: '#EDF7FA',
			main: '#00ABCC',
		},
		error: {
			main: red.A400,
		},
	},
	//to know this, visit https://mui.com/customization/theme-components/#global-style-overrides
	components: {
		MuiContainer: {
			//visit CSS Rule name in https://mui.com/api/container/
			styleOverrides: {
				//style to apply to the root element if maxWidth = 'sm'
				maxWidthSm: {
					maxWidth: '680px',
					'@media (min-width: 600px)': {
						maxWidth: '680px',
					},
				},
				maxWidthMd: {
					maxWidth: '860px',
					'@media (min-width: 900px)': {
						maxWidth: '860px',
					},
				},
			},

			//to change the default value of defaultProps. EX: prop maxWidth: default is lg, we can change it in defaultProps
			defaultProps: {
				maxWidth: 'md',
			},
			variants: [],
		},
		MuiLink: {
			//https://mui.com/api/link/
			defaultProps: {
				//each link underline is only decorated when hovered
				underline: 'none',
			},
			styleOverrides: {
				//according to css rule: root means MuiLink-root
				root: {
					color: 'black',
					'&:hover, &.active': {
						color: '#FF6464',
					},
				},
			},
		},
		MuiButton: {
			//styleOverrides is ok but try variants
			// styleOverrides: {
			// 	root: {
			// 		color: 'white',
			// 	},
			// },

			//https://mui.com/customization/theme-components/#global-style-overrides
			variants: [
				{
					props: { variant: 'contained', color: 'primary' },
					style: {
						color: 'white',
					},
				},
			],
		},
	},
});

theme = responsiveFontSizes(theme);
