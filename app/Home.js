import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { request } from './requests';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from './Modal';

const typeColors = {
    Fire: 'red',
    Flying: 'gray',
    Electric: 'gold',
    Water: 'dodgerblue',
    Grass: 'green',
    Ice: 'skyblue',
    Fighting: 'orange',
    Poison: 'purple',
    Ground: 'sienna',
    Rock: 'darkgray',
    Bug: 'limegreen',
    Ghost: 'indigo',
    Steel: 'lightgray',
    Fairy: 'pink',
    Dragon: 'darkblue',
    Psychic: 'hotpink',
    Normal: 'lightgray',
};


export const Home = () => {
    const [loading, setLoading] = useState(false)
    const {navigate} = useNavigation()
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true)
            const { data } = await request.get("/pokemon/");
            setPokemons(data);
        } catch (error) {
            Alert.alert("Ocurrrio un error al obtener los pokemones", "No se puedieron obtener los pokemones")
        }finally{
            setLoading(false)
        }
    }

    const pokemon = ({ item }) => {
        const bgColor = typeColors[item.Type1] || 'lightgray';

        return (
            <Pressable onPress={()=> navigate("UniquePokemon", {pokemon:item})}>
                <View style={styles.card}>
                    <View style={styles.infoPokemon}>
                        <Text style={styles.namePokemon}>{item.Name} {item.Form != " " ? item.Form : ""}</Text>
                        <Text style={styles.idPokemon}>{item.ID}</Text>
                        <View style={styles.tags}>
                            <Text
                                style={[
                                    styles.typePokemon,
                                    { backgroundColor: typeColors[item.Type1] || 'gray' },
                                ]}
                            >
                                {item.Type1}
                            </Text>
                            {
                                item.Type2 != " " && (
                                    <Text
                                        style={[
                                            styles.typePokemon,
                                            { backgroundColor: typeColors[item.Type2] || 'gray' },
                                        ]}
                                    >
                                        {item.Type2}
                                    </Text>
                                )
                            }
                        </View>
                    </View>
                    <View style={[styles.imagePokemon, { backgroundColor: bgColor }]}>
                        <Image source={{ uri: item.img }} style={styles.image} />
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <SafeAreaView>
            <LoadingModal visible={loading}/>
            <FlatList
                data={pokemons}
                renderItem={pokemon}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={styles.container}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoPokemon: {
        width: '30%',
        backgroundColor: '#eee7e7',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 5,
    },
    namePokemon: {
        fontSize: 20,
        color: '#000',
        marginBottom: 5,
    },
    idPokemon: {
        fontSize: 20,
        color: '#000',
        marginBottom: 5,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    typePokemon: {
        margin: 2,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 15,
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    imagePokemon: {
        width: '70%',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 150,
        height: 150,
    },
});
