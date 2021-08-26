import { atom, useRecoilState } from 'recoil';

const loadingState = atom({
    key: 'loadingState',
    default: false
});

export function useLoading() {
    const [loading, setLoading] = useRecoilState(loadingState);

    return {
        loading,
        setLoading
    };
}
