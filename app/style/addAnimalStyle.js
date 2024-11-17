import { StyleSheet } from "react-native";

export const addAnimalStyle = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff", // White background for clean UI
  },
  scrollContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#fff", // Consistent background color
    paddingBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3A3A3C", // Dark grey text for labels
    marginBottom: 6,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    height: 90,
    fontSize: 16,
    color: "#3A3A3C", // Text color matches the label
    borderWidth: 1,
    borderColor: "#E5E5EA", // Light border for input field
  },
  textCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#8E8E93", // Muted grey for character count
    marginTop: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#3A3A3C",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    flex: 1,
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#0a593c", // Green button for confirmation
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  errorText: {
    color: "#FF3B30", // Red for error messages
    fontSize: 13,
    marginTop: 5,
  },
  dateButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA", // Optional border for better appearance
  },
});
