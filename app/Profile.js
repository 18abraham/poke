// Profile.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, SafeAreaView, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from './Modal';
import { getUser, updateUser } from './requests';

export const Profile = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        getUser()
            .then(data => {
                setUser(data);
                setName(data.name);
                setEmail(data.email);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = () => {
        if (name === user.name && email === user.email && password === '') {
            Alert.alert("Sin cambios", "No se detectaron cambios en el perfil.");
            return;
        }

        setLoading(true); 

        updateUser({ name, email, password })
            .then(() => {
                Alert.alert("¡Éxito!", "Los cambios se guardaron correctamente.");
                navigation.goBack();
            })
            .catch(err => {
                console.error(err);
                Alert.alert("Error", "Hubo un problema al guardar los cambios.");
            })
            .finally(() => setLoading(false));
    };

    if (loading) {
        return <LoadingModal visible={loading} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <LoadingModal visible={loading} />
            <View style={styles.container}>
                <View>
                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSay9ThX0lxGJubGqUIUGxY1ppqRudUw508LA&s" }}
                        width={200}
                        height={200}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Perfil de Usuario</Text>
                    <Text style={styles.label}>Tu Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nombre"
                    />
                    <Text style={styles.label}>Tu Correo:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Correo Electrónico"
                        keyboardType="email-address"
                    />
                    <Text style={styles.label}>Cambiar contraseña:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        secureTextEntry
                    />
                    <Pressable style={styles.send} onPress={handleSave}>
                        <Text style={styles.send.textButton}>Guardar Cambios</Text>
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
        fontWeight: "bold"
    },
    label: {
        fontSize: 20,
        fontWeight: "bold"
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
    containerFooter: {
        justifyContent: "center",
        alignItems: "center",
        texts: {
            fontSize: 20,
            margin: 5
        }
    },
   
});
