import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Stylesheet } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addAnimalStyle } from '../style/addAnimalStyle'

const validationAnimal = Yup.object().shape({
  animal_name: Yup.string().required('Name is required'),
  animal_details: Yup.string().required('Details is required'),
  animal_quantity: Yup.number().required('Quantity is required'),
});

const AddAnimal = () => {
  const [animalDetails, setanimalDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setFieldValue("animal_date", currentDate); // Set date in Formik's values
      setShowPicker(false); // Close the picker after selection
    }
  };

  const handleAddAnimal = async (values) => {
    try {
      const response = await fetch(`http://${localip}:5001/addAnimal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animal_name: values.animal_name,
          animal_date: values.animal_date,
          animal_details: values.animal_details,
          animal_quantity: values.animal_quantity,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(response);
        alert("Animal added successfully!");
      } else {
        alert(result.message || "Error adding animal.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <View style={addAnimalStyle.container}>
      <Formik
        initialValues={{ animal_name: "", animal_date: date, animal_details: "", animal_quantity: "" }}
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
                  <Text>{values.animal_date ? values.animal_date.toDateString() : "Choose Date"}</Text>
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    key={date.toISOString()}
                    mode="date"
                    value={values.animal_date || date}
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, setFieldValue)}
                  />
                )}
              </View>
              {touched.animal_date && errors.animal_date && (
                <Text style={addAnimalStyle.errorText}>{errors.animal_date}</Text>
              )}
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
            <TouchableOpacity onPress={handleSubmit} style={addAnimalStyle.button}>
                <Text style={addAnimalStyle.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddAnimal;
