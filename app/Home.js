import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { request } from './requests';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from './Modal';

const fallbackPokemon = [
  {
    ID: 999,
    Name: "Pikachu",
    Type1: "Electric",
    Type2: "",
    Form: "",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
  }
];

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
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await request.get("/pokemon/");
      setPokemons(data.length > 0 ? data : fallbackPokemon);
    } catch (error) {
      Alert.alert("Ocurrió un error", "No se pudieron obtener los pokemones");
      setPokemons(fallbackPokemon); // fallback si hay error
    } finally {
      setLoading(false);
    }
  };

  const renderPokemon = ({ item }) => {
    const bgColor = typeColors[item.Type1] || 'lightgray';

    return (
      <Pressable onPress={() => navigate("UniquePokemon", { pokemon: item })}>
        <View style={styles.card}>
          <View style={styles.infoPokemon}>
            <Text style={styles.namePokemon}>{item.Name} {item.Form?.trim() ? item.Form : ""}</Text>
            <Text style={styles.idPokemon}>#{item.ID}</Text>
            <View style={styles.tags}>
              <Text style={[styles.typePokemon, { backgroundColor: typeColors[item.Type1] || 'gray' }]}>
                {item.Type1}
              </Text>
              {item.Type2?.trim() && (
                <Text style={[styles.typePokemon, { backgroundColor: typeColors[item.Type2] || 'gray' }]}>
                  {item.Type2}
                </Text>
              )}
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
      <LoadingModal visible={loading} />
      <FlatList
        data={pokemons}
        renderItem={renderPokemon}
        keyExtractor={(item, index) => `${item.ID}-${index}`}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#f5f5f5'
  },
  infoPokemon: {
    width: '35%',
    padding: 10,
    justifyContent: 'center',
  },
  namePokemon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  idPokemon: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typePokemon: {
    margin: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  imagePokemon: {
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
