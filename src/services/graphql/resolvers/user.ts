import bcrypt from 'bcrypt'
import { accessToken } from '../../auth';
import { DbQueries } from '../../../database/queries';
import { Resolvers, User, UserAuthInput } from '../generated/root-resolver-types';


export const resolvers: Resolvers = {

    User: {
        profiles: async ({ id }) => {
            return await DbQueries.user.getUserProfiles(id)            
        }
    },

    Query: {
        user: async (root, { data }, { validateAccess }) => {
            validateAccess()
            return await DbQueries.user.getUser(data)
        },

        
        
        users: async (root, args, { validateAccess }) => {
            validateAccess()
            return await DbQueries.user.getUsers()
        },



        auth: async (root, { data }, { db }) => {
            const { email, password } = data
            const { getUser, getUserProfiles } = DbQueries.user
            
            let user: User = await getUser({ email })
            
            if (!user) {
                throw new Error("User not found")
            }

            const credentials: UserAuthInput = await db.select('password')
                .from('users')
                .where({ email })
                .first()

            const passwordMatch = bcrypt.compareSync(password, credentials.password)

            if (!passwordMatch) {
                throw new Error("Incorrect email or password")
            }

            user = {
                ...user, 
                profiles: await getUserProfiles(user.id) 
            }
            
            return accessToken(user)
        }
    },

    

    Mutation: {
        createUser: async (root, { data }, { db }) => {

            try {
                //Insert a new user
                const salt = process.env.AUTH_HASH_PASSWORD_SALTROUNDS ? process.env.AUTH_HASH_PASSWORD_SALTROUNDS : '10'
                const hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(parseInt(salt)))
                const [ id ] = await db.insert({ ...data, password: hashedPassword }).into('users')

                //Insert the default profile ("common") for a new user
                await db.insert({ user_id: id, profile_id: 1 })
                .into('users_profiles')

                //Get the user's data and profiles
                const user: User = {
                    ...await DbQueries.user.getUser({ id }),
                    profiles: await DbQueries.user.getUserProfiles(id)
                }

                return accessToken(user)

            } catch (error) {
                throw new Error(error.sqlMessage)
            }           
        },



        updateUser: async (root, { data }, { db, validateUpdateUser }) => {

            const transaction = await db.transaction()
            const { getUser, getUserProfiles } = DbQueries.user
            
            await validateUpdateUser(data)

            try {
        
                let hashedPassword = ''
                const salt = process.env.AUTH_HASH_PASSWORD_SALTROUNDS ? process.env.AUTH_HASH_PASSWORD_SALTROUNDS : '10'
                const { email, profilesIds, password } = data
                delete data.profilesIds

                const id: string = await db.select('id')
                    .from('users')
                    .where({ email })
                    .first()
                
                //Hash the password received
                if (password) {
                    hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(salt)))
                }
        
                //Update user's data
                await transaction('users').update({
                    ...data, 
                    password: hashedPassword ? hashedPassword : password
                })
                .where({ id })
                .orWhere({ email })
        
                if (profilesIds && profilesIds.length > 0) {
                    //Delete old user's profiles
                    await transaction('users_profiles').where({ user_id: id }).delete()
                    //Insert new profiles
                    await transaction.insert(
                        profilesIds.map(profileId => ({ 
                            user_id: id, profile_id: profileId 
                        }))
                    )
                    .into('users_profiles')
                }

                const user: User = {
                    ... await getUser({ id, email }),
                    profiles: await getUserProfiles(id)
                }
                                
                await transaction.commit()
                return user
        
            } catch (error) {
                await transaction.rollback()
                throw error
            }                   
        },



        deleteUser: async (root, { id }, { db, validateAccess }) => {
            
            validateAccess('master')

            await db('users')
                .update({ is_active: false })
                .where({ id })

            const user: User = await DbQueries.user.getUser({ id })
    
            return user 
        }
    }
}