import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({
    image:selectedImage
  })

  const pickImage = async () => {
    // Request permission to access the camera and gallery
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    // Open the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) { // Corrected here
      setSelectedImage(result.assets[0].uri); // Accessing the URI from the correct structure
    }
  };

  const takePhoto = async () => {
    // Request permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    // Open the camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) { // Corrected here
      setSelectedImage(result.assets[0].uri); // Accessing the URI from the correct structure
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add an Image</Text>
      <Button title="Pick an Image from Gallery" onPress={pickImage} />
      <Button title="Take a Photo" onPress={takePhoto} />

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});