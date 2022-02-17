import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
export const theme = createTheme({
	//visit this page for more view https://mui.com/customization/default-theme/
	palette: {
		primary: {
			main: '#FF6464',
		},
		secondary: {
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
	},
});
