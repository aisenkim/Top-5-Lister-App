import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import MenuToolbar from "./Toolbar";

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);

    if (auth.loggedIn)
        return (
            <>
                <MenuToolbar/>
                <HomeScreen />
            </>
        )
    else
        return <SplashScreen />
}