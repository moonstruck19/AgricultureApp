import { StyleSheet } from "react-native";

export const finance = StyleSheet.create({
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
  