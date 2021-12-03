import Grid from "@mui/material/Grid";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../auth";
import {GlobalStoreContext} from "../store";

const GridContainer = styled(Grid)`
    margin-top: 5%;
`;

export default function SplashScreen() {
    const history = useHistory();
    const {auth} = useContext(AuthContext)
    const {store} = useContext(GlobalStoreContext);

    const handleCreatAccount = () => {
             history.push("/register")
    }

    const handleLogin = () => {
        history.push("/login")
    }

    const handleGuest = () => {
        auth.setGuest(true);
        store.setToolMenu("community")
        history.push("/")
    }

    return (
        <div id="splash-screen">
            Welcome To The Top 5<br />
            Lister
            <GridContainer container spacing={2} direction="row"
                  justifyContent="center"
                  alignItems="center">
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345, background: "linear-gradient(to left, #283593, #fff3e0)"}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={process.env.PUBLIC_URL + "/assets/account.jpg"}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    CREATE ACCOUNT
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Create an account to access full features of the application
                                </Typography>
                                <Button variant="contained" size="small" onClick={handleCreatAccount}>
                                   CREATE ACCOUNT
                                </Button>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345, background: "linear-gradient(to bottom, #283593, #fff3e0)"}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={process.env.PUBLIC_URL + "/assets/login.jpg"}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    LOGIN
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Continue enjoying the full access to the application
                                </Typography>
                                <Button variant="contained" size="small" onClick={handleLogin}>
                                    LOGIN
                                </Button>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item >
                    <Card sx={{ maxWidth: 345, background: "linear-gradient(to right, #283593, #fff3e0)"}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={process.env.PUBLIC_URL + "/assets/guest.jpg"}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    CONTINUE AS GUEST
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Only able to view other's Top 5 List. Not able to interact with other lists.
                                </Typography>
                                <Button variant="contained" size="small" onClick={handleGuest}>
                                    CONTINUE AS GUEST
                                </Button>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12}  style={{marginTop: '5%'}}>
                    <Typography variant="body2" color="text.secondary" color="black">
                       Developed By: Aisen Kim
                    </Typography>
                </Grid>
            </GridContainer>
        </div>
    )
}