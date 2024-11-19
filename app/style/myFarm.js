import { StyleSheet } from "react-native";

export const myFarm = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff", // White background for clean UI
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#fff", // Consistent background color
    paddingBottom: 30,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0A593C',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  section: {
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0A593C',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3A3A3C", // Dark grey text for labels
    marginBottom: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    height: 90,
    fontSize: 16,
    color: "#3A3A3C", // Text color matches the label
    borderWidth: 1,
    borderColor: "#E5E5EA",
   }, // Light border for input field
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  textCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#8E8E93", // Muted grey for character count
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
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
  cardText: {
    fontSize: 14,
    color: '#555555',
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardQuantity: {
    fontSize: 14,
    color: '#888888',
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#0a593c", // Green button for confirmation
    alignItems: "center",
  },
  cardDate: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEEEEE',
  },
  errorText: {
    color: "#FF3B30", // Red for error messages
    fontSize: 13,
    marginTop: 5,
  },
  noDataText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
  dateButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E5EA",
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
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
   }, // Optional border for better appearance
  input: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#E5E5EA",
    borderWidth: 1
  },
})