import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { Theme as ThemeType } from 'react-native-paper/lib/typescript/src/types';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#14467C',
        accent: '#000000',
        background: '#ffffff',
        error: '#ff0000'
    }
} as ThemeType;

const Theme: React.FC = ({ children }) => {
    return (
        <PaperProvider theme={theme}>
            <StyledProvider theme={theme}>{children}</StyledProvider>
        </PaperProvider>
    );
};

export default Theme;
