import { loadFiles } from "@graphql-tools/load-files";

export const getTypeDefs = async () => {
  const typeDefs = await loadFiles("**/*.graphql");
  return typeDefs;
};
