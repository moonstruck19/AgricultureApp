import {
  StyleSheet
} from "react-native";

export const addTask = StyleSheet.create({
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
    backgroundColor: "#fff8f0",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    justifyContent: "center",
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assigned: {
    flexDirection: "row",
    alignItems: "center",
  },
  assignedText: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  employeeItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    marginVertical: 4,
    width: '100%',
    alignItems: 'center'
  },
  employeeName: {
    fontSize: 16,
    color: '#333'
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 8,
    alignItems: 'center'
  }
});