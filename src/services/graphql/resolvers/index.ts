import { 
    queries as profileQueries,
    mutations as profilesMutations
} from './profiles'

import { IResolvers } from '../generated/resolvers-types'

export const rootResolver: IResolvers = {

    //Queries Resolvers
    Query: {
        ...profileQueries,
    },

    Mutation: {
        ...profilesMutations
    }
}