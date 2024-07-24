import type { NitroApp } from 'nitropack'

declare module 'nitropack' {
    interface NitroApp {
        imgur: {
            clientId: string;
            getAuthHeader: () => { Authorization: string };
        }
    }
}