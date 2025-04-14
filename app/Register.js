import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native';
import { request } from './requests';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from './Modal';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Register = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigation();
    

    const onChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const submit = async () => {
        if (!data.name || !data.email || !data.password) {
            Alert.alert("Todos los campos son requeridos");
            return;
        }

        try {
            setLoading(true);
            const res = await request.post('/users/register', data);
            Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión");
            navigate("Login");
        } catch (error) {
            Alert.alert("Error", "Verifica los datos enviados (correo debe ser @utma.edu.mx)");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LoadingModal visible={loading} />
            <View style={styles.container}>
                <View>
                    <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" }}
                        width={200}
                        height={200}
                    />
                </View>
                <View>
                <Text style={styles.title}>Registro</Text>

                <Text style={styles.label}>Nombre</Text>
                <TextInput style={styles.input} onChangeText={text => onChange("name", text)} />

                <Text style={styles.label}>Correo institucional</Text>
                <TextInput style={styles.input} onChangeText={text => onChange("email", text)} autoCapitalize="none" />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput style={styles.input} onChangeText={text => onChange("password", text)} secureTextEntry />

                <Pressable style={styles.send} onPress={submit}>
                    <Text style={styles.send.textButton}>Registrarse</Text>
                </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        fontSize: 15,
        width: "auto",
    },
    send: {
        backgroundColor: "red",
        width: "auto",
        height: "auto",
        borderRadius: 10,
        marginTop: 15,
        alignItems: "center",
        textButton: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
        }
    },
    sendTextButton: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    containerFooter: {
        justifyContent: "center",
        alignItems: "center",
        texts: {
            fontSize: 20,
            margin: 5
        }
    },
});
