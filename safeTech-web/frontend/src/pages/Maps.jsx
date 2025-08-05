import React from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import Skeleton from 'react-loading-skeleton'; // Optional loading placeholder

const Maps = () => {
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY // Correct access to the API key
  });

  if (!isLoaded) {
    return <Skeleton height={400} />;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}> {/* Set a specific height for the parent div */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={15}
        center={{ lat: -34.397, lng: 150.644 }} // Default center position
      > 
      </GoogleMap>
    </div>
  );
}

export default Maps;