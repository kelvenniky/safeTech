import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import API_BASE_URL from '@/common/ApiUrl'; 

const DriverScreen = () => {
  const [medics, setMedics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedics = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medics`);
        setMedics(response.data); 
      } catch (err) {
        console.error('Error fetching medics:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchMedics();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0d9488" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
  
  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; 
  
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; 
  }

  return (
   <SafeAreaView>
     <FlatList
      data={medics}
      keyExtractor={(item) => item._id} 
      renderItem={({ item }) => (
        <View style={styles.medicCard}>
          <Text style={styles.medicName}>{item.name}</Text>
          <Text style={styles.medicEmail}>{item.email}</Text>
          <Text style={styles.medicEmail}>{item.location.latitude}</Text>
          <Text style={styles.medicEmail}>{item.location.longitude}</Text>

        </View>
      )}
    />
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  medicCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  medicName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicEmail: {
    color: 'gray',
  },
});

export default DriverScreen;