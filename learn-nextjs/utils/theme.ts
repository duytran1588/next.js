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
});
