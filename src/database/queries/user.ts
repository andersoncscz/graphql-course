import { db } from "../../config/db";
import { Profile, User, UserFilterInput } from "../../services/graphql/generated/root-resolver-types";

const getUsers = async(): Promise<User[]> => {
    const users: User[] = await db.select()
        .from('users')
        .where({ is_active: true })

    return users
}
const getUser = async(args: UserFilterInput): Promise<User> => {
    const { id, email } = args
    const user: User = id 
        ? await db.select().from('users').where({ id, is_active: true }).first()  
        : await db.select().from('users').where({ email, is_active: true }).first()  
        
    return user
}

const getUserProfiles = async (id: string): Promise<Profile[]> => {
    const users_profiles: Profile[] = await db.from('users_profiles')
        .innerJoin(
            'profiles', 
            'users_profiles.profile_id', 
            'profiles.id'
        )
        .where({ user_id: id })
        .andWhere('profiles.is_active', true)
    return users_profiles                
}

export default {
    getUser,
    getUsers,
    getUserProfiles
}