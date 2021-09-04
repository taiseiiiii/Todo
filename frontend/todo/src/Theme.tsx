import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg:NaN,
				bgImage:'url(\'https://source.unsplash.com/random\')',
				bgSize:'cover'
			}
		}
	}
});