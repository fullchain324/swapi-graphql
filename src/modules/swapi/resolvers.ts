import { Context } from "apollo-server-core";
import { GraphQLFieldResolver } from "graphql";
import axios from "axios";

const SWAPI_BASE_URL = 'https://swapi.dev/api';

type Args = { id: string };

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
};

const StarWarsCharacter = {
  name: () => {
    return "test";
  },
  height: () => {
    return "171";
  },
  mass: () => {
    return "100";
  },
  gender: () => {
    return "MALE";
  },
};

// You can add new Object Resolvers to the default export and the server will pick them up automatically
export default {
  Query,
  StarWarsCharacter,
};
