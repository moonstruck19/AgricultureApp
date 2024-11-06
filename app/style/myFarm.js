import { StyleSheet } from "react-native";

export const myFarm = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f5',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#ffffff',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#34c759',
    },
    tabText: {
        fontSize: 16,
        color: '#8e8e93',
    },
    activeTabText: {
        fontSize: 16,
        color: '#34c759',
        fontWeight: '600',
    },
    option: {
        backgroundColor: '#34c759',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardList: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    cardDescription: {
        fontSize: 14,
        color: '#8e8e93',
        marginVertical: 5,
    },
    cardQuantity: {
        fontSize: 14,
        color: '#8e8e93',
    },
    cardDate: {
        fontSize: 12,
        color: '#8e8e93',
    },
    detailsButton: {
        fontSize: 14,
        color: '#34c759',
        marginTop: 10,
    },
});