import { db } from '../../../../config/db';
import { QueryResolvers, MutationResolvers, Profile } from '../../generated/resolvers-types';

export const queries: QueryResolvers = {
    profile: async (_, { id }) => {
        const profile: Profile = await db.select()
            .from('profiles')
            .where({ id })
            .first()

        return profile
    },

    profiles: async () => {
        const profiles: Profile[] = await db.select()
            .from('profiles')
        
        return profiles
    }
};

export const mutations: MutationResolvers = {
    createProfile: async (_, { data }) => {
        const [ id ] = await db.insert(data).into('profiles')
        const profile: Profile = { 
            id, 
            ...data 
        }
        return profile
    },

    updateProfile: async (_, { data }) => {
        const { id, name, label } = data
        await db('profiles').where({ id }).update({ name, label })
        const profile: Profile = await db.select()
            .from('profiles')
            .where({ id })
            .first()

        return profile
    },

    deleteProfile: async (_, { id }) => {
        const profile: Profile = await db.select()
            .from('profiles')
            .where({ id })
            .first()

        await db('profiles').where({ id }).delete()

        return profile
    }
}