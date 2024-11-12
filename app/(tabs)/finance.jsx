import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker' // Ensure you're using the correct Picker
import { Formik } from 'formik'
import * as Yup from 'yup'

const Revenue = () => {
  const [dataAnimal, setDataAnimal] = useState([]) // Initialize as an empty array
  const [dataCrop, setDataCrop] = useState([])
  const [revenueData, setRevenueData] = useState([])
  const [loading, setLoading] = useState(true) // For loading indicator
  const [error, setError] = useState(null) // For error handling
  const [selectedItem, setSelectedItem] = useState('');

  const localip = process.env.EXPO_PUBLIC_LOCAL_IP 

  const fetchAnimals = () => {
    fetch(`http://${localip}:5001/fetchAnimal`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((animal) => {
        setDataAnimal(animal.data) // Ensure animals array is being set
        console.log(animal.data)
      })
      .catch((error) => {
        console.error('Error fetching animals data: ', error)
        setError('Failed to fetch animal data')
      })
      .finally(() => setLoading(false))
  }
  const fetchCrop = () => {
    fetch(`http://${localip}:5001/fetchCrop`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((crop) => {
        setDataCrop(crop.data) // Ensure animals array is being set
        console.log(crop.data)
      })
      .catch((error) => {
        console.error('Error fetching crop data: ', error)
        setError('Failed to fetch crop data')
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchAnimals()
    fetchCrop()
  }, [])

  const revenueSchema = Yup.object().shape({
    selectedAnimal: Yup.string().required('Please select an animal'),
    quantity: Yup.number()
      .typeError('Quantity must be a number')
      .integer('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .required('Please enter quantity'),
    price: Yup.number()
      .typeError('Price must be a number')
      .min(0, 'Price must be a positive number')
      .required('Please enter price per unit'),
  })

  const handleAddRevenue = async (values, { resetForm }) => {
    const revenuePrice = values.quantity * parseFloat(values.price)

    try {
      // Update animal quantity
      const updateResponse = await fetch(`http://${localip}:5001/updateAnimal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: values.selectedAnimal,
          newQuantity: values.quantity, // Assuming you want to subtract the sold quantity
        }),
      })

      const updateResult = await updateResponse.json()
      console.log('Update Animal Response:', updateResult) // Debugging

      if (updateResponse.ok) {
        // Add revenue entry
        const revenueResponse = await fetch(`http://${localip}:5001/addRevenue`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            re_date: new Date().toISOString(),
            re_type: 'Animal Sale',
            re_price: revenuePrice.toFixed(2),
          }),
        })

        const revenueResult = await revenueResponse.json()
        console.log('Add Revenue Response:', revenueResult) // Debugging

        if (revenueResponse.ok) {
          setRevenueData((prev) => [...prev, revenueResult])
          alert('Revenue added successfully!')
          resetForm()
        } else {
          alert(revenueResult.message || 'Error adding revenue.')
        }
      } else {
        alert(updateResult.message || 'Error updating animal quantity.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while adding revenue.')
    }
  }

  const combinedData = [
    ...dataAnimal.map((animal) => ({
      label: `Animal: ${animal.animal_name}`,
      value: animal._id,
    })),
    ...dataCrop.map((crop) => ({
      label: `Crop: ${crop.crop_name}`,
      value: crop._id,
    })),
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00A86B" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Add Revenue from Animal Sale</Text> */}

      <Formik
        initialValues={{ selectedAnimal: '', quantity: '', price: '' }}
        validationSchema={revenueSchema}
        onSubmit={handleAddRevenue}
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
          <View>
            <Text style={styles.label}>Select</Text>
            <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedItem}
              onValueChange={(itemValue) => setSelectedItem(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-- Select --" value="" />
              {combinedData.length > 0 ? (
                combinedData.map((item, index) => (
                  <Picker.Item key={index} label={item.label} value={item.value} />
                ))
              ) : (
                <Picker.Item label="No data available" value="" />
              )}
            </Picker>

            {/* <Text>Selected Item ID: {selectedItem}</Text> */}
              {/* <Picker
                selectedValue={values.selectedAnimal}
                onValueChange={(itemValue) => setFieldValue('selectedAnimal', itemValue)}
                onBlur={handleBlur('selectedAnimal')}
                style={styles.picker}
              >

              <Picker.Item label="-- Select --" value="" />
                {dataAnimal.length > 0 ? (
                  dataAnimal.map((animal, index) => (
                    <Picker.Item key={index} label={animal.animal_name} value={animal._id} />
                  ))
                ) : (
                  <Picker.Item label="No animals available" value="" />
                )}
              </Picker> */}
            </View>
            {touched.selectedAnimal && errors.selectedAnimal && (
              <Text style={styles.errorText}>{errors.selectedAnimal}</Text>
            )}

            <Text style={styles.label}>Quantity Sold</Text>
            <TextInput
              placeholder="Enter quantity"
              value={values.quantity.toString()}
              onChangeText={handleChange('quantity')}
              onBlur={handleBlur('quantity')}
              keyboardType="numeric"
              style={styles.input}
            />
            {touched.quantity && errors.quantity && (
              <Text style={styles.errorText}>{errors.quantity}</Text>
            )}

            <Text style={styles.label}>Price per Unit</Text>
            <TextInput
              placeholder="Enter price per unit"
              value={values.price.toString()}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              keyboardType="numeric"
              style={styles.input}
            />
            {touched.price && errors.price && (
              <Text style={styles.errorText}>{errors.price}</Text>
            )}

            <Button title="Add Revenue" onPress={handleSubmit} color="#00A86B" />
          </View>
        )}
      </Formik>

      <View style={styles.revenueContainer}>
        <Text style={styles.subtitle}>Revenue Entries</Text>
        {revenueData.length > 0 ? (
          revenueData.map((data, index) => (
            <View key={index} style={styles.card}>
              <Text>Date: {new Date(data.re_date).toLocaleString()}</Text>
              <Text>Type: {data.re_type}</Text>
              <Text>Revenue: ${data.re_price}</Text>
            </View>
          ))
        ) : (
          <Text>No revenue entries available.</Text>
        )}
      </View>
    </View>
  )
}

export default Revenue

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginVertical: 5,
  },
  revenueContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderRadius: 8,
  },
})
