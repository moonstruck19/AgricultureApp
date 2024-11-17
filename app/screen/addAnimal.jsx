import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Image, ScrollView, StyleSheet } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addAnimalStyle } from '../style/addAnimalStyle';
import * as ImagePicker from 'expo-image-picker';
import AWS from 'aws-sdk';

const validationAnimal = Yup.object().shape({
  animal_name: Yup.string().required('Name is required'),
  animal_details: Yup.string().required('Details is required'),
  animal_quantity: Yup.number().required('Quantity is required'),
});

const AddAnimal = () => {
  const [animalDetails, setanimalDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState(null);
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setFieldValue("animal_date", currentDate); // Set date in Formik's values
      setShowPicker(false); // Close the picker after selection
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image picked:", result.uri); // Debugging log
      setImage(result.assets[0].uri);
    } else {
      console.log("Image picking canceled"); // Debugging log
    }
  };

  const uploadImageToS3 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const s3 = new AWS.S3({
        accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
        region: process.env.EXPO_PUBLIC_AWS_REGION,
      });

      const params = {
        Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET_NAME,
        Key: `animals/${Date.now()}.jpg`,
        Body: blob,
        ContentType: 'image/jpeg',
      };

      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            console.error("Error uploading image:", err); // Debugging log
            reject(err);
          } else {
            console.log("Image uploaded successfully:", data.Location); // Debugging log
            resolve(data.Location);
          }
        });
      });
    } catch (error) {
      console.error("Error in uploadImageToS3:", error); // Debugging log
      throw error;
    }
  };

  const handleAddAnimal = async (values) => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToS3(image);
        console.log("Image URL:", imageUrl); // Debugging log
      }

      console.log("Image URL:", imageUrl); // Debugging log

      const response = await fetch(`http://${localip}:5001/addAnimal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animal_name: values.animal_name,
          animal_date: today,
          animal_details: values.animal_details,
          animal_quantity: values.animal_quantity,
          animal_image: imageUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Response:", result); // Debugging log
        alert("Animal added successfully!");
      } else {
        alert(result.message || "Error adding animal.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={addAnimalStyle.scrollContainer}>
      <Formik
        initialValues={{ animal_name: "", animal_details: "", animal_quantity: "" }}
        onSubmit={(values) => handleAddAnimal(values)}
        validationSchema={validationAnimal}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <View style={addAnimalStyle.section}>
              <Text style={addAnimalStyle.label}>Name</Text>
              <View style={addAnimalStyle.inline}>
                <TextInput
                  style={addAnimalStyle.input}
                  onChangeText={handleChange('animal_name')}
                  onBlur={handleBlur('animal_name')}
                  value={values.animal_name}
                />
              </View>
              {touched.animal_name && errors.animal_name && (
                <Text style={addAnimalStyle.errorText}>{errors.animal_name}</Text>
              )}
            </View>

            <View style={addAnimalStyle.section}>
              <Text style={addAnimalStyle.label}>Date</Text>
              <View style={addAnimalStyle.inline}>
                <TouchableOpacity onPress={() => setShowPicker(true)} style={addAnimalStyle.dateButton}>
                  <TextInput
                    value={today}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={addAnimalStyle.section}>
              <Text style={addAnimalStyle.label}>Details</Text>
              <TextInput
                onChangeText={(text) => {
                  setanimalDetails(text);
                  handleChange('animal_details')(text);
                }}
                onBlur={handleBlur('animal_details')}
                style={addAnimalStyle.textArea}
                multiline={true}
                maxLength={45}
                value={values.animal_details}
              />
              <Text style={addAnimalStyle.textCount}>{animalDetails.length}/45</Text>
              {touched.animal_details && errors.animal_details && (
                <Text style={addAnimalStyle.errorText}>{errors.animal_details}</Text>
              )}           
            </View>
            <View style={addAnimalStyle.section}>
              <Text style={addAnimalStyle.label}>Quantity</Text>
              <View style={addAnimalStyle.inline}>
              <TextInput
                style={addAnimalStyle.input}
                keyboardType="numeric" // Ensures numeric keyboard for quantity
                onChangeText={handleChange('animal_quantity')}
                onBlur={handleBlur('animal_quantity')}
                value={values.animal_quantity}
              />
              </View>
              {touched.animal_quantity && errors.animal_quantity && (
                <Text style={addAnimalStyle.errorText}>{errors.animal_quantity}</Text>
              )}
            </View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={addAnimalStyle.image} />}
            <TouchableOpacity onPress={handleSubmit} style={addAnimalStyle.button}>
                <Text style={addAnimalStyle.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddAnimal;