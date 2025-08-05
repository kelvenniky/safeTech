import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useDriverStore, useEmergencyStore, useLocationStore } from '@/store';
import { calculateRegion, generateMarkersFromData } from '@/lib/map';
import { MarkerData } from '@/types/types/type';
import { icons } from '@/constants';
import MapViewDirections from 'react-native-maps-directions';

const MapComponent = ({ medics }: { medics: any }) => {
  const { userLongitude, userLatitude, destinationLongitude, destinationLatitude } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const { emergencyStatus } = useEmergencyStore();

  useEffect(() => {
    if (Array.isArray(medics) && userLatitude && userLongitude) {
      const newMarkers = generateMarkersFromData({ data: medics });
      setMarkers(newMarkers);
    }
  }, [medics, userLatitude, userLongitude]);

  const selectedMedic = medics.find((medic: { _id: number | null; }) => medic._id === selectedDriver);
  const selectedMedicCoordinates = selectedMedic ? {
    latitude: selectedMedic.location.latitude,
    longitude: selectedMedic.location.longitude,
  } : null;


  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || 'YOUR_DEFAULT_API_KEY';


  return (
    <MapView 
    provider={PROVIDER_DEFAULT}
    mapType="mutedStandard"
    style={styles.map}
    showsUserLocation={true}
    showsPointsOfInterest={false}
    initialRegion={calculateRegion({ userLongitude, userLatitude, destinationLongitude, destinationLatitude })}
    userInterfaceStyle="light"
  >
      {markers.map((marker) => (
        marker.latitude && marker.longitude ? ( 
          <Marker
            key={marker.id} 
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={icons.marker}
          />
        ) : null 
      ))}


{selectedMedicCoordinates && (
        <>
          {selectedDriver ? null : (
            <Marker
              key="destination"
              coordinate={selectedMedicCoordinates}
              title='Destination'
              image={icons.pin}
            />
          )}

        

{(emergencyStatus === "accepted" || 
  emergencyStatus === "dispatched" || 
  emergencyStatus === "arrived" || 
  emergencyStatus === "completed") && (
  <MapViewDirections
    origin={{
      latitude: userLatitude!,
      longitude: userLongitude!,
    }}
    destination={selectedMedicCoordinates}
    apikey={apiKey}
    strokeColor='#0d9488'
    strokeWidth={3}
  />
)}
        </>
      )}
    </MapView>
  );
}

export default MapComponent;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    tintColor:'black'
  },
});