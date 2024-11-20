import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Image, ScrollView, StyleSheet } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addCropStyles } from '../style/addCropStyle';
import * as ImagePicker from 'expo-image-picker';
import AWS from 'aws-sdk';


const validationCrop = Yup.object().shape({
  crop_name: Yup.string().required('Crop Name is required'),
  crop_details: Yup.string().required('Crop Details is required'),
});

const AddCrop = () => {
  const [cropDetails, setCropDetails] = useState("")
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [image, setImage] = useState(null);
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP

  const today = new Date().toISOString().split('T')[0] // Start date set to today

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date
      setDate(currentDate)
      setFieldValue("crop_date", currentDate) // Set date in Formik's values
      setShowPicker(false) // Close the picker after selection
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
      console.log("Image picked:", result.assets[0].uri); // Debugging log
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
      Key: `crops/${Date.now()}.jpg`,
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

  const handleAddCrop = async (values) => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToS3(image);
      }

      const response = await fetch(`http://${localip}:5001/addCrop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop_name: values.crop_name,
          crop_details: values.crop_details,
          crop_date: today,
          crop_image: imageUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(response);
        alert("Crops added successfully!");
      } else {
        alert(result.message || "Error adding crop.")
      }
    } catch (error) {
      alert("Error: " + error.message)
    }
  };
  
  return (
    <ScrollView contentContainerStyle={addCropStyles.container}>
      <Formik
        initialValues={{ crop_name: "", crop_details: "" }}
        onSubmit={(values) => handleAddCrop(values)}
        validationSchema={validationCrop}
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
            <View style={addCropStyles.section}>
              <Text style={addCropStyles.label}>Name</Text>
              <View style={addCropStyles.inline}>
                <TextInput
                  style={addCropStyles.input}
                  onChangeText={handleChange('crop_name')}
                  onBlur={handleBlur('crop_name')}
                  value={values.crop_name}
                />
              </View>
              {touched.crop_name && errors.crop_name && (
                <Text style={addCropStyles.errorText}>{errors.crop_name}</Text>
              )}
            </View>

            <View style={addCropStyles.section}>
              <Text style={addCropStyles.label}>Date</Text>
              <View style={addCropStyles.inline}>
                <TouchableOpacity onPress={() => setShowPicker(true)} style={addCropStyles.input}>
                  <TextInput
                    value={today}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={addCropStyles.section}>
              <Text style={addCropStyles.label}>Details</Text>
              <TextInput
                onChangeText={(text) => {
                  setCropDetails(text);
                  handleChange('crop_details')(text);
                }}
                onBlur={handleBlur('crop_details')}
                style={addCropStyles.textArea}
                multiline={true}
                maxLength={45}
                value={values.crop_details}
              />
              <Text style={addCropStyles.textCount}>{cropDetails.length}/45</Text>
              {touched.crop_details && errors.crop_details && (
                <Text style={addCropStyles.errorText}>{errors.crop_details}</Text>
              )}
            </View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity onPress={handleSubmit} style={addCropStyles.button}>
                <Text style={addCropStyles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100, // Add padding to the bottom to ensure the button is visible
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default AddCrop;

