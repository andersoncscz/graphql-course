import { IResolvers } from '../generated/root-resolver-types';
import * as user from './user';
import * as profile from './profile';

export const rootResolver: IResolvers = {
    
    User: {
        ...user.resolvers.User
    },
    
    Query: {
        ...user.resolvers.Query,
        ...profile.resolvers.Query
    },
    
    Mutation: {
        ...user.resolvers.Mutation,
        ...profile.resolvers.Mutation
    }
}