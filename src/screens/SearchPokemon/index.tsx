import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import Card from "../../components/Card";
import { getUser } from "../../repositories/user.repository";
import api from "../../services/api";

import {
  Container,
  Input,
  Title,
  ScrollView,
  Button,
  Paragraph,
} from "../../styles";

interface User {
  name?: string;
  age?: number;
  sex?: number;
}

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

interface PokemonType {
  name: string;
}
interface PokemonFromApi {
  id?: number;
  name?: string;
  abilities?: PokemonAbility[];
  weight?: number;
  order?: number;
  types?: PokemonType[];
  imageUrl?: string;
}

interface Result {
  name: string;
  url: string;
}

function SearchPokemon() {
  const [user, setUser] = useState<User>({});
  const [error, setError] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [pokemons, setPokemons] = useState<any>([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState<Pokemon[]>([]);

  const [searchOffset, setSearchOffset] = useState(200);

  const { navigate } = useNavigation();

  useEffect(() => {
    getUser().then((value) => {
      if (value) {
        setUser(value);
      } else {
        setError("Usuário não encontrado");
      }

      //console.log(items);
    });
  }, [user]);

  function getAllPokemons() {
    var array = new Array();
    api.get(`pokemon?limit=20&offset=${searchOffset}`).then((response) => {
      response.data.results.map((result: Result, index: number) => {
        interface Item {
          data: {
            id?: number;
            name?: string;
            moves?: PokemonAbility[];
            weight?: number;
            order?: number;
            types?: PokemonType[];
            sprites?: { back_default?: string };
          };
        }
        api
          .get(result.url)
          .then((item: Item) => {
            array.push({
              id: item.data.id,
              order: item.data.order,
              name: item.data.name,
              imageUrl: item.data.sprites?.back_default,
              types: item.data.types,
              weight: item.data.weight,
              abilities: item.data.moves,
            });
            if (index + 1 === response.data.results.length) {
              setPokemons(array);
            }
          })
          .catch((err) => {});
      });
    });
  }

  function navigateToDetailsPage(id?: number) {
    navigate("pokemon-details", {
      id,
    });
  }

  function handlerInput(event: string) {
    setSearchValue(event);
    if (event.length > 1) {
      const _pokemonsFiltered = pokemons.filter((pokemon: any) => {
        return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setPokemonsFiltered(_pokemonsFiltered);
    }
  }

  const handlerSearchButton = useCallback(() => {
    if (pokemons.length >= 0) {
      setSearchOffset(searchOffset + 20);
      getAllPokemons();
    }
    getAllPokemons();
  }, [pokemons]);

  return (
    <Container>
      <Input
        placeholder="Pesquise por um pokemon..."
        onChangeText={handlerInput}
      ></Input>
      <View></View>
      <Button onPress={handlerSearchButton}>
        <Paragraph>Carregar novos pokemons</Paragraph>
      </Button>
      <View style={{ width: "100%", height: "100%", paddingBottom: 50 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {pokemons.length <= 0 ? (
            <View>
              <Paragraph>Nenhum pokemon aqui...</Paragraph>
            </View>
          ) : pokemonsFiltered.length > 0 && searchValue.length > 0 ? (
            pokemonsFiltered.map((pokemon, index) => (
              <Card
                key={index}
                name={pokemon.name}
                types={pokemon.types}
                imageUrl={pokemon.imageUrl}
                onPress={() => navigateToDetailsPage(pokemon?.id)}
              />
            ))
          ) : (
            pokemons.map((pokemon: any, index: number) => (
              <Card
                key={index}
                name={pokemon.name}
                types={pokemon.types}
                imageUrl={pokemon.imageUrl}
                onPress={() => navigateToDetailsPage(pokemon?.id)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Container>
  );
}

export default SearchPokemon;
