import {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


export default function PokeDetailsScreen({route}) {
  const {name, id} = route.params
  const navigation = useNavigation(); // <-- Get the navigation object
  console.log('id', id, 'name', name);

  const [pokemonDetails, setPokemonDetails] = useState()
  const [bgColor, setBgColor] = useState('#bd9adb');


  // https://pokeapi.co/api/v2/pokemon/

   useEffect(() => {
    console.log('id', id, 'name', name);
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(resp => resp.json())
      .then(json => {
        setPokemonDetails(json);
        console.log('json', json);
      })
      .catch(error => console.log(error))
      .finally(() => {
        console.log('pokemonDetails:', pokemonDetails);
      });
    }, [name])


  const renderImage = () => {
    const img = { uri: `${pokemonDetails.sprites.other["official-artwork"].front_default}` }
    return <Image
      style={[styles.image, {backgroundColor: bgColor}]}
      resizeMode='contain'
      source={img} />
  }

const colorMap = () => {
  if (pokemonDetails && pokemonDetails.types) {
    if (pokemonDetails.types.some(type => type.type.name === 'grass')) {
      setBgColor('#bed1a5');
    } else if (pokemonDetails.types.some(type => type.type.name === 'fire')) {
      setBgColor('#f5beb5');
    } else if (pokemonDetails.types.some(type => type.type.name === 'water')) {
      setBgColor('#cddaf7');
    } else if (pokemonDetails.types.some(type => type.type.name === 'normal')) {
      setBgColor('#bdbdbd');
    } else if (pokemonDetails.types.some(type => type.type.name === 'poison')) {
      setBgColor('#c5bfd6');
    } else if (pokemonDetails.types.some(type => type.type.name === 'electric')) {
      setBgColor('#fbfc9f');
    } else {
      setBgColor('#f0c0d1');
    }
    console.log('bgColor', bgColor);
    console.log('pokemonDetails.types[0].type.name', pokemonDetails.types[0].type.name);
    return bgColor;
  }
  return bgColor;
}



useEffect(() => {
  colorMap();
}, [pokemonDetails])

  if (!pokemonDetails) {
    return <ActivityIndicator />
  }

  return (
    <LinearGradient
      colors={['#1c203b', '#34395e', '#50557a']}
      style={styles.container}
    >
    <TouchableOpacity 
      style={styles.backbtn} 
      onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={74} color="#FFF" />
    </TouchableOpacity>
    <View style={styles.round}><Text style={styles.number}>{pokemonDetails.id}.</Text></View>
      <View style={styles.card}>
        <View style={[styles.textbox, {backgroundColor: bgColor}]}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.hidden}>Index: {pokemonDetails.id}</Text>  
          <Text style={styles.type}>Type:</Text>
            {pokemonDetails.types.map((type) => (
            <Text style={styles.types} key={type.slot}>{type.type.name}</Text>
          ))}
        </View>
        {renderImage()}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 32,
    borderWidth: 2,
    borderColor: 'black',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 0,
    borderWidth: 10,
    borderColor: 'white',
    maxHeight: 450,
    shadowColor: '#171717',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 17,
  },
  textbox: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
    marginBottom: 0,
  },
  image: {
    maxHeight: 300,
    width: undefined,
    height: undefined,
    flex: 1,
    paddingBottom: 50,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 42,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 10,
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 18,
    marginBottom: 2,
    marginHorizontal: 10,
  },
  types: {
    fontSize: 18,
    marginVertical: 1,
    textTransform: 'capitalize',
    marginHorizontal: 10,
  },
  backbtn: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 27,
    left: 0,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  hidden: {
    display: 'none',
  },
  number: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 32,
    fontWeight: 'bold',
    paddingVertical: 7,
    marginTop: 70,
  },
});
