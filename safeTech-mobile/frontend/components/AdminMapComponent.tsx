import { StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useDriverStore, useLocationStore } from '@/store';
import { calculateDriverTimes, calculateRegion } from '@/lib/map';
import { MarkerData } from '@/types/types/type';
import { icons } from '@/constants';
import MapViewDirections from 'react-native-maps-directions';

const AdminMapComponent = () => {
  const mapRef = useRef(null); // Create a ref for the MapView
  const { userLongitude, userLatitude, destinationLongitude, destinationLatitude, enroute } = useLocationStore();
  const region = calculateRegion({ userLongitude, userLatitude, destinationLongitude, destinationLatitude });
  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    if (markers.length > 0 && destinationLatitude !== undefined && destinationLongitude !== undefined) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      })
        .then((drivers) => {
          setDrivers(drivers as MarkerData[]);
        })
        .catch((error) => {
          console.error("Error calculating driver times:", error);
          Alert.alert("Error", "Unable to calculate driver times.");
        });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  const onDirectionsReady = (result) => {
    setRouteCoordinates(result.coordinates);
    // Zoom the map to the user's location
    mapRef.current.animateToRegion({
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  };

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      mapType="mutedStandard"
      style={styles.map}
      showsUserLocation={true}
      tintColor='black'
      showsPointsOfInterest={true}
      initialRegion={region}
      userInterfaceStyle="light"
      ref={mapRef} // Attach the ref here
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={selectedDriver === marker.id ? icons.selectedMarker : icons.marker}
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title='Destination'
            image={enroute === 'user' ? icons.pin : icons.hosp}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
            strokeColor='#0d9488'
            strokeWidth={3}
            onReady={onDirectionsReady}
            onError={(error) => {
              console.error("Error getting directions:", error);
              Alert.alert("Error", "Unable to get directions.");
            }}
          />
        </>
      )}
    </MapView>
  );
};

export default AdminMapComponent;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});