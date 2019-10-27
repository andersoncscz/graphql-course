import { ApolloServer, ServerInfo } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { context } from './services/graphql/resolvers/context';
import { rootResolver as resolvers } from './services/graphql/resolvers';

const typeDefs = importSchema('./src/services/graphql/schemas/schema.graphql')

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})

server.listen().then(({ url }: ServerInfo) => {
    console.log(`Server running at: ${url}`)
})