import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';

import { rootResolver as resolvers } from './services/graphql/resolvers';
const typeDefs = importSchema('./src/services/graphql/schemas/schema.graphql')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()
    .then(({ url }) => console.log(`Running at: ${url}`))
    .catch(error => console.log(error))