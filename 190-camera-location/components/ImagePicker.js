
import {useState} from 'react';
import {StyleSheet, Image, Text, Alert, View} from 'react-native';
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker';
import {Colors} from "../contants/colors";
import OutlinedButton from "./UI/OutlinedButton";

function ImagePicker({onTakenImage}) {
    const [cameraPermissionInformation,  requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();
    async function verityPermission() {

        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                "Insufficient Permission!",
                "You need to grant camera permissions to use this app."
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verityPermission();

        if(!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setPickedImage(!image.canceled ? image?.assets?.[0].uri || "" : "");
        onTakenImage(!image.canceled ? image?.assets?.[0].uri || "" : "");
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>;
    }

    return <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
            Take Image
        </OutlinedButton>
    </View>
}

export default ImagePicker;


const styles = StyleSheet.create({
   imagePreview: {
       width: '100%',
       height: 200,
       marginVertical: 0,
       justifyContent: "center",
       alignItems: "center",
       backgroundColor: Colors.primary100,
       borderRadius: 4,
       overflow: "hidden"
   },
    image: {
       width: "100%",
        height: "100%"
    }
});
