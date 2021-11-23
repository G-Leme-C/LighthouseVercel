import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#C53030',
        color: 'gray.900',
      },
    },
  },
  fonts: {
    body: 'Montserrat',
    headings: 'Montserrat',
  },
});
