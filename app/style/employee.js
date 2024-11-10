import { StyleSheet } from "react-native";

export const employee = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#E5E5EA",
    borderWidth: 1,
    marginRight: 10
  },
  addButton: {
    backgroundColor: "#34C759",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  employeeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA"
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 5,
    borderRadius: 5
  },
  buttonText: {
    color: "#fff"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#E5E5EA",
    borderWidth: 1
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20
  },
});