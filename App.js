import React, {useState} from 'react'
import {Text,View, StyleSheet,Image,TouchableOpacity,Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
import native from './assets/native.png' // podemos guardar imagenes en la carpeta assets y utilizarlas!

   export default function App(){

   const [imagen,setImagen] = useState(null)

    //Funciones -->

    let openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  // utilizamos el metodo de expo para preguntar al usuario si permite ingresar a la galeria

    if (permissionResult.granted === false) {
    alert("Se requieren Permisos para acceder a la Cámara");
    return;
  }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult)

    // esto permite que si el usuario no elige ninguna imagen , no resulte ningun error
    if(pickerResult.cancelled === true ){
      return
    }
     // la propiedad "localUri" nos permite guardar la ruta de la imagen seleccionada por el usuario!
     setImagen({localUri:pickerResult.uri})
  }

     let openShareDialog = async () => {
     if (!(await Sharing.isAvailableAsync())) {
     alert("esta opcion no esta disponible en tu dispositivo")
      return
    }
   await Sharing.shareAsync(imagen.localUri)
}



    return (
      <View style={styles.container} >
      <Image
        style={styles.nav}
        source={native}
      />
      <Text style={styles.title} >React Native</Text>
      <TouchableOpacity
      onPress={openImagePickerAsync}
      >
      <Image
        style={styles.image}
        source={{ // este condicional permite que  si el usuario ha elegido una imagen la seteamos , si no dejamos la imagen por defecto!
          uri:
           imagen !== null
          ? imagen.localUri
           : 'https://media4.giphy.com/media/UQJlZ2OcaCA2RLfGiZ/giphy.webp?cid=ecf05e47hue15fk2kax0gfa6mfyhac70n74bv12upaqepep6&rid=giphy.webp'}}
      />
      </TouchableOpacity>
      {imagen ? ( // este condicional muestra el boton de compartir si el usuario ha seleccionado una nueva imagen desde su galeria !
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
    )
  }
  //el  componente TouchableOpacity nos permite agregar estilos, el texto lo debemos agregar como componente y dentro de los tags!

 const styles = StyleSheet.create({
   nav:{
     height:150,
     width:300,
     borderRadius:75,
     marginTop:20
   },
  container:{
    flex:1,
     justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'black',
    },
  title:{
    fontSize: 30,
    color:'white',
    marginTop:20,
  },
  image:{
    height:150,
    width:150,
    marginTop:20,
    resizeMode:'contain' // con esta propiedad ajustamos siempre la imagen al container
  },
  button:{
    backgroundColor:'green',
    padding: 7,
    marginTop:20,
    borderRadius:80
  },
  buttonText:{
    color:'white',
    fontSize:25,
  }
})
