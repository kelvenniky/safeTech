import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { useDriverStore, useLocationStore } from '@/store';
import { MarkerData } from '@/types/types/type';
import { icons } from '@/constants';
import MapViewDirections from 'react-native-maps-directions';

// KNUST campus coordinates
const KNUST_COORDINATES = {
  latitude: 6.686488,
  longitude: -1.577872,
};

// Define the region for KNUST campus
const KNUST_REGION: Region = {
  latitude: KNUST_COORDINATES.latitude,
  longitude: KNUST_COORDINATES.longitude,
  latitudeDelta:0.5 ,// Adjust this for zoom level
  longitudeDelta:0.5 // Adjust this for zoom level
};

const Maps = () => {
  const { userLongitude, userLatitude, destinationLongitude, destinationLatitude } = useLocationStore();
  const { selectedDriver } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([
    // Sample pharmacy data
    { id: '1', latitude: 6.686488, longitude: -1.577872, title: 'Pharmacy A' },
    { id: '2', latitude: 6.691488, longitude: -1.547466, title: 'Pharmacy B' },
    { id: '3', latitude: 6.662403, longitude: -1.566374, title: 'Pharmacy C' },
 


  ]);

  // Create a ref for the MapView
  const mapRef = useRef<MapView>(null);

  return (
    <MapView 
      ref={mapRef} // Attach the ref here
      provider={PROVIDER_DEFAULT}
      mapType="mutedStandard"
      style={styles.map}
      showsUserLocation={true}
      initialRegion={KNUST_REGION}
      userInterfaceStyle="light"
      onRegionChangeComplete={(region) => {
        // Prevent changing region outside of KNUST
        if (
          region.latitude < 6.686488 || region.latitude > 6.662403 ||
          region.longitude <  -1.577872|| region.longitude > -1.566374
        ) {
          // Reset to KNUST region if outside
        }
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={icons.marker} // Use a specific icon for pharmacies
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
            image={icons.pin}
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
            strokeColor="teal"
            strokeWidth={2}
          />
        </>
      )}
    </MapView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});