import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Expense = () => {
  const [dataType, setDataType] = useState([]) // Initialize as an empty array
  const [loading, setLoading] = useState(true) // For loading indicator
  const [error, setError] = useState(null) // For error handling
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP

  const fetchType = () => {
    fetch(`http://${localip}:5001/fetchType`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((typeExp) => {
        // Map the data to fit {label, value} format
        const formattedData = typeExp.data.map((item) => ({
          label: item.type_name, // Use type_name for the label
          value: item._id, // Use _id for the value
        }))
        console.log(formattedData)
        setDataType(formattedData)
      })
      .catch((error) => {
        console.error('Error fetching type data: ', error)
        setError('Failed to fetch type data')
      })
      .finally(() => setLoading(false))
  }
  

  useEffect(() => {
    fetchType()
  }, [])
  

  const expenseSchema = Yup.object().shape({
    selectedItem: Yup.string().required('Please select a type'),
    quantity: Yup.number()
      .typeError('Quantity must be a number')
      .integer('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .required('Please enter quantity'),
    price: Yup.number()
      .typeError('Price must be a number')
      .min(0, 'Price must be a positive number')
      .required('Please enter price'),
  })

  const handleAddExpense = async (values, { resetForm }) => {
    try {
      const response = await fetch(`http://${localip}:5001/addExpense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ex_date: new Date().toISOString(), 
          ex_type: values.selectedItem,    
          ex_quantity: values.quantity, 
          ex_price: values.price,          
        }),
      })
  
      const result = await response.json()
  
      if (response.ok) {
        alert(result.message || 'Expense added successfully!')
        resetForm() // Reset form after successful submission
      } else {
        alert(result.message || 'Failed to add expense.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while adding expense.')
    }
  }
  

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00A86B" />
        <Text>Loading data...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ selectedItem: '', quantity: '', price: '' }}
        validationSchema={expenseSchema}
        onSubmit={handleAddExpense}
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
            <Text style={styles.label}>Select Type Expense</Text>
            <View style={styles.pickerContainer}>
            <Picker
                selectedValue={values.selectedItem}
                onValueChange={(itemValue) => setFieldValue('selectedItem', itemValue)}
                style={styles.picker}
                >
                <Picker.Item label="-- Select --" value="" />
                {dataType.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.label} />
                ))}
            </Picker>
            </View>
            {touched.selectedItem && errors.selectedItem && (
              <Text style={styles.errorText}>{errors.selectedItem}</Text>
            )}

            <Text style={styles.label}>Quantity Buy</Text>
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

            <Text style={styles.label}>Price</Text>
            <TextInput
              placeholder="Enter price"
              value={values.price.toString()}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              keyboardType="numeric"
              style={styles.input}
            />
            {touched.price && errors.price && (
              <Text style={styles.errorText}>{errors.price}</Text>
            )}

            <Button title="Add Revenue" onPress={handleSubmit} color="#0a593c" />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default Expense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
})
