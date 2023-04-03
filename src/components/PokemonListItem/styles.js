import {
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
});
export default styles