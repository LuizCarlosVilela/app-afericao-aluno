declare module 'process' {
    declare global {
        namespace NodeJS {
            export interface ProcessEnv {
                API_URL: string;
            }
        }
    }
}
