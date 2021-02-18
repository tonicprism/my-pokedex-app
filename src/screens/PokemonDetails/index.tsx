import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons/";

import {
  Container,
  Title,
  Paragraph,
  Button as BackButton,
} from "../../styles";

import { items } from "../../testData";
import { theme } from "../../theme";
import {
  Actions,
  Button,
  ButtonText,
  Card,
  Divisor,
  PokemonName,
  Skill,
  SkillLabel,
  SkillsContainer,
  SectionTitle,
  Header,
  CardTitle,
  CardSubtitle,
} from "./style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";
import {
  getPokemons,
  storeMyPokemon,
} from "../../repositories/mypokemons.respositoy";
import {
  getMyFavorites,
  storeMyFavorites,
} from "../../repositories/favorites.repository";

interface Params {
  id: number;
}
interface PokemonAbility {
  move: {
    name: string;
    url: string;
  };
}

interface PokemonType {
  name: string;
}
interface Pokemon {
  id?: number;
  name?: string;
  abilities?: PokemonAbility[];
  weight?: number;
  order?: number;
  types?: PokemonType[];
  imageUrl?: string;
}

interface Response {
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

function PokemonDetails() {
  const route = useRoute();
  const params = route.params as Params;
  const { navigate, goBack } = useNavigation();

  const [pokemon, setPokemon] = useState<Pokemon>();

  const [isOnMyPokedex, setIsOnMyPokedex] = useState({
    text: "Adicionar na Pokedex",
    state: false,
  });
  const [isOnMyFavorites, setIsOnMyFavorites] = useState({
    text: "Adicionar aos favoritos",
    state: false,
  });

  const isOnMyFavoritesExpression = isOnMyFavorites.state
    ? theme.colors.red
    : theme.colors.black;

  const isOnMyFavoritesPokedexExpression = isOnMyPokedex.state
    ? theme.colors.red
    : theme.colors.black;

  function handlerAddInFavorites(id: number) {
    if (isOnMyFavorites.state === false) {
      storeMyFavorites({
        id: pokemon?.id,
        imageUrl: pokemon?.imageUrl,
        name: pokemon?.name,
        types: pokemon?.types,
      });
    }

    setIsOnMyFavorites({
      state: !isOnMyFavorites.state,
      text: "Nos favoritos",
    });
  }
  function handlerAddInPokedex(id: number) {
    if (isOnMyPokedex.state === false) {
      storeMyPokemon({
        id: pokemon?.id,
        imageUrl: pokemon?.imageUrl,
        name: pokemon?.name,
        types: pokemon?.types,
      });
    }

    setIsOnMyPokedex({
      state: !isOnMyPokedex.state,
      text: "Na Pokedêx",
    });
  }

  useEffect(() => {
    api
      .get(`https://pokeapi.co/api/v2/pokemon/${params.id}/`)
      .then((response: Response) => {
        const _pokemon: Pokemon = {
          name: response.data.name,
          abilities: response.data.moves,
          id: response.data.id,
          imageUrl: response.data.sprites?.back_default,
          order: response.data.order,
          types: response.data.types,
          weight: response.data.weight,
        };
        if (!pokemon) {
          setPokemon(_pokemon);
        }
      });

    getPokemons().then((_pokemons) => {
      const pokemonFinded = _pokemons.find(
        (_pokemon: Pokemon) => pokemon?.id === _pokemon?.id
      );
      if (pokemonFinded) {
        setIsOnMyPokedex({
          state: !isOnMyPokedex.state,
          text: "Na Pokedêx",
        });
      }
    });

    getMyFavorites().then((_pokemons) => {
      const pokemonFinded = _pokemons.find(
        (_pokemon: Pokemon) => pokemon?.id === _pokemon?.id
      );
      if (pokemonFinded) {
        setIsOnMyFavorites({
          state: !isOnMyFavorites.state,
          text: "Nos favoritos",
        });
      }
    });
  }, [pokemon]);

  if (!pokemon) {
    return (
      <Container>
        <View
          style={{ width: "100%", height: "100%", justifyContent: "center" }}
        >
          <Paragraph>Carregando pokemon...</Paragraph>
          <ActivityIndicator size="large" color={theme.colors.white} />
        </View>
      </Container>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header>
            <TouchableOpacity onPress={() => goBack()}>
              <Icon name="arrow-back" size={20} color={theme.colors.black} />
            </TouchableOpacity>
            <PokemonName>{pokemon?.name}</PokemonName>
            <View></View>
          </Header>
          <Image
            source={{
              uri: pokemon?.imageUrl,
            }}
            style={{ width: 200, height: 200, margin: 20 }}
          />

          <Actions>
            <Button onPress={() => handlerAddInPokedex(params.id)}>
              <Icon
                name="collections-bookmark"
                size={20}
                color={isOnMyFavoritesPokedexExpression}
              />
              <ButtonText color={isOnMyFavoritesPokedexExpression}>
                {isOnMyPokedex.text}
              </ButtonText>
            </Button>
            <Divisor />
            <Button onPress={() => handlerAddInFavorites(params.id)}>
              <Icon
                name="favorite"
                size={20}
                color={isOnMyFavoritesExpression}
              />
              <ButtonText color={isOnMyFavoritesExpression}>
                {isOnMyFavorites.text}
              </ButtonText>
            </Button>
          </Actions>

          <Card>
            <CardTitle>Peso: 84kg</CardTitle>
            <CardTitle>Status</CardTitle>
            <CardSubtitle>Nome: {pokemon?.name}</CardSubtitle>
            <CardSubtitle>Valor: 100</CardSubtitle>
          </Card>

          <SectionTitle>Habilidades</SectionTitle>
          <SkillsContainer
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {pokemon?.abilities?.splice(0, 4).map((ability, index) => (
              <Skill key={index}>
                <SkillLabel>{ability.move.name}</SkillLabel>
              </Skill>
            ))}
          </SkillsContainer>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PokemonDetails;
