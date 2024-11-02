import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    <View style={styles.container}>
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
            <View style={styles.section}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inline}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('crop_name')}
                  onBlur={handleBlur('crop_name')}
                  value={values.crop_name}
                />
              </View>
              {touched.crop_name && errors.crop_name && (
                <Text style={styles.errorText}>{errors.crop_name}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Date</Text>
              <View style={styles.inline}>
                <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
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
                <Text style={styles.errorText}>{errors.crop_date}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Details</Text>
              <TextInput
                onChangeText={(text) => {
                  setCropDetails(text);
                  handleChange('crop_details')(text);
                }}
                onBlur={handleBlur('crop_details')}
                style={styles.textArea}
                multiline={true}
                maxLength={45}
                value={values.crop_details}
              />
              <Text style={styles.textCount}>{cropDetails.length}/45</Text>
              {touched.crop_details && errors.crop_details && (
                <Text style={styles.errorText}>{errors.crop_details}</Text>
              )}
              
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddCrop;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    height: 80,
    fontSize: 16,
  },
  textCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7f00ff",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  dateButton: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
  },
});
