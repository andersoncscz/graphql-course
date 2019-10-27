import { Resolvers, Profile } from '../generated/root-resolver-types';

export const resolvers: Resolvers = {

    Query: {
        profile: async (root, { id }, { db, validateAccess }) => {
            
            validateAccess()

            const profile: Profile = await db.select()
                .from('profiles')
                .where({ id, is_active: true })
                .first()

            return profile            
        },



        profiles: async (root, args, { db, validateAccess }) => {
            
            validateAccess()
            
            const profiles: Profile[] = await db.select()
                .from('profiles')
                .where({ is_active: true })
        
            return profiles            
        }
    },
    


    Mutation: {
        createProfile: async (root, { data }, ctx) => {

            ctx.validateAccess('master')

            const [ id ] = await ctx.db.insert(data).into('profiles')
            const profile: Profile = await ctx.db.select().from('profiles').where({ id }).first()
            return profile            
        },
        


        updateProfile: async (root, { data }, { db, validateAccess }) => {
            
            validateAccess('master')

            const { id } = data
            delete data.id
            await db('profiles').where({ id }).update(data)
            const profile: Profile = await db.select()
                .from('profiles')
                .where({ id })
                .first()
        
            return profile            
        },


        
        deleteProfile: async (root, { id }, { db, validateAccess }) => {
            
            validateAccess('master')

            await db('profiles')
                .update({ is_active: false })
                .where({ id })

            const profile: Profile = await db.select()
                .from('profiles')
                .where({ id })
                .first()
        
            return profile            
        },
    }
}