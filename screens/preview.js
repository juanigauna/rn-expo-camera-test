import React from 'react'
import { StyleSheet , View, Text, TouchableOpacity, ImageBackground, StatusBar } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default ({ photo, setPreviewPhoto }) => {
    const savePhoto = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync()
        if (status !== 'granted') return
        await MediaLibrary.createAssetAsync(photo.uri)
        setPreviewPhoto(false)
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <ImageBackground
                style={{ flex: 1, flexDirection: 'column-reverse' }}
                source={{uri: photo.uri}}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setPreviewPhoto(false)}>
                        <Text style={styles.text}>
                            <Icon name="arrow-back" size={30} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={savePhoto}>
                        <Text style={styles.text}>
                            <Icon name="save" size={30} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#000000b5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 5,
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})
