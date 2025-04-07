import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-web';

export default function App() {
  return (
    <View style={styles.container}>
      <view>{/Container-image/}
        <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"}}
        width={200}
        height={200}
        />
      </view>
      <view>
        <Text style={styles.tittle}>Iniciar Sesion</Text>{/tittle/}
        <Text style={styles.label}>Correo</Text>{/Label/}
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.label}>Contraseña</Text>{/Label/}
        <TextInput style={styles.input}></TextInput>
        <Pressable style={styles.send}>
        <Text style={styles.send.textButton}>Enviar</Text>
        </Pressable>
      </view>
      <view>{/Container-footer/}
        <Text>Olvidaste tu contraseña</Text>{/tittle/}
        <Text>Registrate</Text>{/Label/}
      </view>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tittle:{
    fontSize:24,
    fontWeight:"bold"
  },
  label:{
    fontSize:15,
    fontWeight:"bold"
  },
  input:{
    borderRadius:10,
    borderColor:"black",
    borderWidth:2,
    fontSize:15,
    width:"auto",
  },
  send:{
    backgroundColor:"red",
    width:"auto",
    height:"auto",
    borderRadius:10,
    marginTop:"15",
    alignItems:"center",
    textButton:{
      color:"black",
      fontSize:20,
      fontWeight:"bold",
    }
  },
  containerFooter:{
    justifyContent:"space-between",
    alignItems:"center",
    text:{
    fontSize:20,
    margin:5
   }
  }
});