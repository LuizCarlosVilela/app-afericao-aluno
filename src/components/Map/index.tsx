import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

//Libraries
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

//Components
import Button from '@components/Button';

//Interfaces
interface LocationProps {
  latitude: number;
  longitude: number;
}

interface PropsValidation {
  onPress: (value: any) => void;
}

export default function Map({ onPress }: PropsValidation) {
  const [locationUser, setLocationUser] = useState<LocationProps>({
    latitude: 0,
    longitude: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  function handleSendLocation() {
    onPress(locationUser);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      setLoading(false);
      setLocationUser({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#14467C" />
        </View>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: locationUser.latitude,
            longitude: locationUser.longitude,
            latitudeDelta: 0.0093,
            longitudeDelta: 0.0093,
          }}
          showsUserLocation={true}
        />
      )}

      <Button title="Continuar" onPress={() => handleSendLocation()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});
