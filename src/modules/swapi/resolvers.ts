import { Context } from "apollo-server-core";
import { GraphQLFieldResolver } from "graphql";
import axios from "axios";

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type Args = { id: string };

type People = {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

// Define a function to fetch data from SWAPI
const fetchFromSWAPI = async (endpoint: string) => {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching from SWAPI: ${error}`);
    throw new Error('Failed to fetch data from SWAPI');
  }
};

const Query: Record<string, GraphQLFieldResolver<{}, Context, any>> = {
  // Resolver for getting a specific character by ID
  swapiCharacterById: async (_, args: Args, ctx) => {
    const { id } = args;
    const characterData = await fetchFromSWAPI(`people/${id}/`);
    return {
      ...characterData
    };
  },
  
  // Resolver for getting all characters
  swapiCharacters: async () => {
    const { results } = await fetchFromSWAPI('people/');
    return results.map((character: any) => ({
      ...character,
    }))
  }
};

const StarWarsCharacter = {
  name: (character: People) => {
    return character.name;
  },
  height: (character: People) => {
    return character.height;
  },
  mass: (character: People) => {
    return character.mass;
  },
  gender: (character: People) => {
    return character.gender;
  },
};

// You can add new Object Resolvers to the default export and the server will pick them up automatically
export default {
  Query,
  StarWarsCharacter,
};
