import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, Circle } from 'react-native-maps';
import { useLocationStore } from '@/store';
import { icons } from '@/constants';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';

// KNUST campus coordinates
const KNUST_COORDINATES = {
  latitude: 6.686488,
  longitude: -1.577872,
};

// Haversine distance calculation
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const MapSummary = ({ nearestPost }) => {
  const { userLongitude, userLatitude } = useLocationStore();
  const [pointers, setPointers] = useState([]);
  const [posts, setPosts] = useState([]);
  const mapRef = useRef<MapView>(null);
  const [closestPost, setClosestPost] = useState(null);

  async function getAllData() {
    try {
      const res = await axios.get("http://172.20.10.4:5001/getPointers");
      setPointers(res.data.data);
    } catch (error) {
      console.error("Error fetching pointers:", error);
    }
  }

  async function getAllPosts() {
    try {
      const res = await axios.get("http://172.20.10.4:5001/getPosts");
      setPosts(res.data.data);
      findClosestPost(res.data.data); // Find closest post when posts are fetched
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getAllData(); 
    getAllPosts(); 
    
  }, []);

  const findClosestPost = (posts) => {
    if (posts.length > 0 && userLatitude && userLongitude) {
      const closest = posts.reduce((closest, post) => {
        const distance = haversineDistance(
          userLatitude,
          userLongitude,
          parseFloat(post.latitude),
          parseFloat(post.longitude)
        );

        if (!closest || distance < closest.distance) {
          return { post, distance }; // Return the current post and its distance
        }
        return closest; // Return the closest post found so far
      }, null);

      if (closest) {
        setClosestPost(closest.post);

        // Log the ID, latitude, and longitude of the closest post
        console.log('Closest Post ID:', closest.post._id);
        console.log('Closest Post Latitude:', closest.post.latitude);
        console.log('Closest Post Longitude:', closest.post.longitude);
      }
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'safe':
        return icons.safe; 
      case 'danger':
        return icons.danger; 
      case 'security':
        return icons.sec; 
      default:
        return null; // Handle default case
    }
  };

  return (
    <MapView 
      ref={mapRef}
      provider={PROVIDER_DEFAULT}
      mapType="mutedStandard"
      style={styles.map}
      showsUserLocation={true}
      initialRegion={{
        latitude: KNUST_COORDINATES.latitude,
        longitude: KNUST_COORDINATES.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
      userInterfaceStyle="light"
      tintColor='black'
    >
      {pointers.map((pointer) => (
        <View key={pointer._id}>
          <Marker
            coordinate={{
              latitude: parseFloat(pointer.latitude), 
              longitude: parseFloat(pointer.longitude), 
            }}
            title={pointer.type} 
            image={getIconForType(pointer.type)} 
          />
          {pointer.type === 'danger' && (
            <Circle
              center={{
                latitude: parseFloat(pointer.latitude),
                longitude: parseFloat(pointer.longitude),
              }}
              radius={300} 
              fillColor="rgba(255, 0, 0, 0.2)" 
              strokeColor="rgba(255, 0, 0, 1)" 
              strokeWidth={0.5}
            />
          )}
          {pointer.type === 'safe' && (
            <Circle
              center={{
                latitude: parseFloat(pointer.latitude),
                longitude: parseFloat(pointer.longitude),
              }}
              radius={300} 
              fillColor="rgba(0, 255, 0, 0.2)" 
              strokeColor="rgba(0, 255, 0 , 1)" 
              strokeWidth={0.5}
            />
          )}
        </View>
      ))}

   {closestPost&& nearestPost && userLatitude && userLongitude && (
  <MapViewDirections
    origin={{
      latitude: userLatitude,
      longitude: userLongitude,
    }}
    destination={{
      latitude: parseFloat(closestPost.latitude),
      longitude: parseFloat(closestPost.longitude),
    }}
    apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
    strokeColor="teal"
    strokeWidth={3}
    onReady={(result) => {
      console.log("Directions Ready: "); // Log directions result
    }}
    onError={(errorMessage) => {
      console.error("Error with directions: ", errorMessage); // Log any errors
    }}
  />
)}
    </MapView>
  );
};

export default MapSummary;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});