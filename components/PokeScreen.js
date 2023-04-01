import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PokeScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        console.log('json', json);
        setPokemons(json.results);
        console.log('pokemons', pokemons);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        console.log('fetch was succesful');
      });
  }, []);

  const listItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pokemonbox}
      onPress={() =>
        navigation.navigate('PokemonDetails', {
          id: item.reference_image_id,
          name: item.name,
        })
      }>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.hidden}>{item.url}</Text>
    </TouchableOpacity>
  );

  /*
This object is commonly referred to as the item prop, and it contains the data for the current item being rendered. In this code, item is destructured from the props object passed to listItem, which allows direct access to its properties, such as item.name and item.url.
   */

  return (
    <LinearGradient
      colors={['#1c203b', '#34395e', '#50557a']}
      style={styles.container}
    >
    <View style={styles.container}>
      {!pokemons ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.heading}>Pokédex</Text>
          <Image
            style={styles.icon}
            source={require('../assets/icons8-pokeball-48.png')}
          />
          <FlatList
            style={styles.list}
            data={pokemons}
            renderItem={listItem}
            keyExtractor={(item) => item.name}
            numColumns={2} // set the number of columns to 2
          />
          <View style={styles.footer}>
            <Text
            style={styles.footertext}
            onPress={() =>
              Linking.openURL('https://matilda-frid-portfolio.netlify.app/')
            }>
              This app is built by Matilda Frid
            </Text>
          </View>
        </>
      )}
    </View>
</LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    padding: 18,
  },
  list: {
    flex: 1,
    backgroundColor: '#transparent',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: 'auto',
  },
  heading: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontSize: 46,
    fontWeight: '900',
    marginBottom: 8,
    marginHorizontal: 'auto',
    marginTop: 37,
    textAlign: 'center',
  },
  pokemonbox: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ebecf2',
    marginVertical: 7,
    marginHorizontal: 7,
    borderRadius: 15,
    alignItems: 'center',
    width: 'auto',
    maxWidth: '50%',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  hidden: {
    display: 'none',
  },
  icon: {
    marginHorizontal: 'auto',
    marginBottom: 15,
    alignSelf: 'center',
  },
  footer: {
    backgroundColor: '#34395e',
    // backgroundColor: 'transparent',
  },
  footertext: {
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginVertical: 12,
  },
});
