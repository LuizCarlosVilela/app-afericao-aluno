import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        dark: boolean;
        mode?: Mode;
        roundness: number;
        colors: {
            primary: string;
            background: string;
            surface: string;
            accent: string;
            error: string;
            text: string;
            onSurface: string;
            onBackground: string;
            disabled: string;
            placeholder: string;
            backdrop: string;
            notification: string;
        };
        fonts: Fonts;
        animation: {
            scale: number;
        };
    }
}
