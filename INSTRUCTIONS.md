 # Getting Started. 
This challenge is designed to emulate the daily activities of a person writing a graphQL middle layer that sits between a client and a REST api. This layer is used to transform and abstract the underlying systems to create contracts with UIs that can be fulfilled as underlying systems change. 

**Startup**
1. run `yarn install` to install the dependencies
2. run `yarn start:dev` to start the server in dev/reload mode. 
3. The GraphQL Playground will be available at `http://localhost:4000/graphql`
**Challenge Task**
4. In the file `/swapi/resolvers.ts` Utilize the SWAPI api to update these resolvers and resolve from the swapi api based on the input parameters
    - The StarWarsCharacter is equivalant to `people` in the api
    - API documentation: https://swapi.dev/documentation#people
5. Run a query and make sure things are all working. 


