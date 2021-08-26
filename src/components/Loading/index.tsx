import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { useLoading } from '@states/loading';

import { Container } from './styles';

const Loading: React.FC = () => {
    const { colors } = useTheme();

    const { loading } = useLoading();

    if (loading) {
        return (
            <Container>
                <ActivityIndicator size={54} color={colors.primary} />
            </Container>
        );
    }

    return null;
};

export default Loading;
