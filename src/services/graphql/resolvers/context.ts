import Knex = require('knex');
import { db } from '../../../config/db';
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { UserInput, Profile, UserAuthenticated } from '../generated/root-resolver-types';
import { getUserFromAccessToken } from '../../auth';


export interface MyContext {
    db: Knex
    user?: UserAuthenticated
    validateAccess: (profile?: string) => void
    validateUpdateUser: (userInput: UserInput) => Promise<void>
}

export const context = async ({ req, res }: ExpressContext): Promise<MyContext> => {
    //Get the user token from the headers
    const accessDeniedError = new Error('Access Denied.')
        
    const user = getUserFromAccessToken({ req, res })
    let isAdmin = false
    let isMaster = false
    
    if (user) {
        isAdmin = user.profiles.some(profile => profile.name === 'admin')
        isMaster = user.profiles.some(profile => profile.name === 'master')
    }


    const validateAccess = (profile?: string) => {
        if (!user) {
            //User is not logged in
            res.statusCode = 401 //Unauthorized
            throw accessDeniedError
        }

        if (profile === 'master' && !isMaster) {
            //Only master
            res.statusCode = 403 //Forbidden
            throw accessDeniedError
        }

        if (profile === 'admin' && !(isMaster || isAdmin)) {
            //Both master and admin
            res.statusCode = 403 //Forbidden
            throw accessDeniedError
        }
    }

    const validateUpdateUser = async ({ id, email, profilesIds }: UserInput) => {
        
        validateAccess()

        if (!(isMaster || isAdmin)) {
            if ((id && id !== user.id) || (email !== user.email)) { //#2 - A user which is not master or admin can only update itself.
                res.statusCode = 403 //Forbidden
                throw accessDeniedError
            }
        }
        else if(!isMaster) { //User doesn't have a master profile and only master can provides admin profile for a user.
            //Get the profiles' names that will be provide for the user.
            const profiles: Profile[] = await db.select('name').from('profiles').whereIn('id', profilesIds)

            //Validate if there's the admin profile in the list.
            if (profiles.some(p => p.name === 'admin')) {
                //#3 - Only master users can provide an admin profile for a user.
                res.statusCode = 403 //Forbidden
                throw accessDeniedError
            }
        }
    }

    return {
        db,        
        user,
        validateAccess,
        validateUpdateUser
    }
}