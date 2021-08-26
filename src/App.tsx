import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';

import Theme from '@components/Theme';
import Loading from '@components/Loading';
import Routes from './Routes';

function App() {
    return (
        <Theme>
            <RecoilRoot>
                <StatusBar style="light" backgroundColor="#14467C" />
                <Loading />
                <Routes />
            </RecoilRoot>
        </Theme>
    );
}

registerRootComponent(App);
