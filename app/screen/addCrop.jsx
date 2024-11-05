import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, addCropStylesheet } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addCropStyles } from '../style/addCropStyle'

const validationCrop = Yup.object().shape({
  crop_name: Yup.string().required('Crop Name is required'),
  crop_details: Yup.string().required('Crop Details is required'),
});

const AddCrop = () => {
  const [cropDetails, setCropDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setFieldValue("crop_date", currentDate); // Set date in Formik's values
      setShowPicker(false); // Close the picker after selection
    }
  };

  const handleAddCrop = async (values) => {
    try {
      const response = await fetch(`http://${localip}:5001/addCrop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop_name: values.crop_name,
          crop_details: values.crop_details,
          crop_date: values.crop_date,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(response);
        alert("Crops added successfully!");
      } else {
        alert(result.message || "Error adding crop.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <View style={addCropStyles.container}>
      <Formik
        initialValues={{ crop_name: "", crop_date: date, crop_details: "" }}
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
                <TouchableOpacity onPress={() => setShowPicker(true)} style={addCropStyles.dateButton}>
                  <Text>{values.crop_date ? values.crop_date.toDateString() : "Choose Date"}</Text>
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    key={date.toISOString()} 
                    mode="date"
                    value={values.crop_date || date}
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, setFieldValue)}
                  />
                )}
              </View>
              {touched.crop_date && errors.crop_date && (
                <Text style={addCropStyles.errorText}>{errors.crop_date}</Text>
              )}
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
              
              <TouchableOpacity onPress={handleSubmit} style={addCropStyles.button}>
                <Text style={addCropStyles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddCrop;

