import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { Camera } from 'expo-camera'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default ({ setCapturedImage, setPreviewPhoto }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(0)
    const [flash, setFlash] = useState('on')

    let camera

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    if (hasPermission === null) {
        return <View />
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>
    }

    const takePhoto = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        setCapturedImage(photo)
        setPreviewPhoto(true)
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Camera
                ref={ref => camera = ref}
                style={styles.camera}
                type={type}
                ratio="16:9"
                flashMode={flash}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === 0
                                    ? 1
                                    : 0
                            )
                        }}>
                        <Text style={styles.text}>
                            <Icon name="flip-camera-ios" size={25} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePhoto}>
                        <Text style={styles.text}>
                            <Icon name="camera" size={70} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setFlash(
                                flash === 'on'
                                ? 'off'
                                : 'on'
                        )}
                    >
                        <Text style={styles.text}>
                            {
                                flash === 'on'
                                ? <Icon name="flash-on" size={25} />
                                : <Icon name="flash-off" size={25} />
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
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
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
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
