import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
	// return createCache({ key: 'css', prepend: true });
	return createCache({ key: 'css' }); //key is the prefix of style, in this ex, css is key. Ex:.css-5cl1vx-MuiTypography-root {}
}
