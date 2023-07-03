import {useState, createContext, useEffect} from 'react'
import {hasExpiredToken} from "../utils"
import {User} from "../api"

const userController = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const {children} = props;

    //VARIABLES Q QUIERO QUE SEAN GLOBALES
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            //recupero tokens
            const accessToken = await userController.getAccessToken();
            const refreshToken = await userController.getRefreshToken();

            /**COMPROBACIÓN DE TOKENS */

            //Si no existen
            if(!accessToken || !refreshToken){
                //no existe alguno de los tokens hago logout
                logout();
                setLoading(false);
                return;
            }

            //Caducación
            if(hasExpiredToken(accessToken)){
                //Expiró accessToken
                if(hasExpiredToken(refreshToken)){
                    //Expiró refreshToken
                    logout();
                }else{
                    //No expiró refreshToken
                    await reLogin(refreshToken);
                }
            }else{
                //No expiró accessToken
                await login(accessToken);
            }

            setLoading(false);
        })();
    }, []);

    /**FUNCIONES */

    const login = async(accessToken) => {
        try {
            //recupero el user
            const response = await userController.getMe(accessToken);
            delete response.password;

            setUser(response);
            setToken(accessToken);
        } catch (error) {
            console.error(error);
        }
    }

    const reLogin = async(refreshToken) => {
        try {
            const {accessToken} = await userController.refreshAccessToken(refreshToken);
            userController.setAccessToken(accessToken);

            await login(accessToken);
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        userController.removeTokens();
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout
    }

    if(loading) return null;

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  )
}
