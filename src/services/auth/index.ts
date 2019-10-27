import jwt from 'jsonwebtoken';
import { User, AccessToken, PayLoad, UserAuthenticated } from "../graphql/generated/root-resolver-types";
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

export const accessToken = (user: User): AccessToken => {
    const iat = Math.round(Date.now() / 1000)
    const exp = iat + (3 * 24 * 60 * 60) //three days valid
    const authSecret = process.env.AUTH_SECRET

    const { id, name, email, profiles } = user

    const userAuthenticated: UserAuthenticated = { id, name, email, profiles }

    const payload: PayLoad = {
        user: userAuthenticated,
        iat,
        exp
    }

    const token = jwt.sign(payload, authSecret)

    return {
        payload,
        token
    }
}

export const getUserFromAccessToken = ({ req, res }: ExpressContext): UserAuthenticated => {

    try {
        let token = req.headers.authorization || ''
        let user: UserAuthenticated

        //Remove the 'Bearer' and decode the token
        const decoded = <PayLoad>jwt.verify(token.substring(7), process.env.AUTH_SECRET)
        //Verify if the token is valid
        if (new Date(decoded.exp * 1000) > new Date()) {
            user = {
                ...decoded.user
            }
            return user
        }
        
        return null

    } catch (error) {

    }
    return null
}