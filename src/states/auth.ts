import { atom, useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@utils/api';

interface AuthState {
    signed: boolean;
    loading: boolean;
    token: string | null;
    user: UserAuthState | null;
}
export interface UserAuthState {
    id: string;
    name: string;
    email: string;
    // eslint-disable-next-line camelcase
    wallet_validate: string;
    permissions: string;
}

const authState = atom<AuthState>({
    key: 'authState',
    default: {
        signed: false,
        loading: true,
        token: null,
        user: null
    }
});

export function useAuth() {
    const AUTH_KEY = '@ml-coach:auth';
    const [auth, setAuth] = useRecoilState(authState);

    function login(token: string, user: UserAuthState) {
        AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setAuth({
            signed: true,
            loading: false,
            token,
            user
        });
    }

    // eslint-disable-next-line camelcase
    async function updateWellStatus(wallet_validate: string) {
        const value = await AsyncStorage.getItem(AUTH_KEY);

        if (value != null) {
            const { token, user } = JSON.parse(value);

            const userNew = <UserAuthState>{
                id: user.id,
                name: user.name,
                email: user.email,
                wallet_validate
            };

            login(token, userNew);
        }
    }

    function logout() {
        AsyncStorage.removeItem(AUTH_KEY);
        delete api.defaults.headers.Authorization;

        setAuth({
            signed: false,
            loading: false,
            token: null,
            user: null
        });
    }

    async function checkLoggedUser() {
        const value = await AsyncStorage.getItem(AUTH_KEY);
        if (value) {
            const { token, user } = JSON.parse(value);
            login(token, user);
        } else {
            logout();
        }
    }

    return {
        auth,
        setAuth,
        login,
        logout,
        checkLoggedUser,
        updateWellStatus
    };
}
