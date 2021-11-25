import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import {useContext, useEffect} from "react";
import {GlobalStoreContext} from "../store";
import Top5Item from "./Top5Item";

function Top5ItemList(props) {

    const {store} = useContext(GlobalStoreContext);

    // useEffect(() => {
    //     store.findLis();
    // }, []);

    return (
        <Box sx={{backgroundColor: 'orange', width: '100%', height: '100%', borderRadius: '10px', padding: '5px'}}>
            {
                store.currentList.items.map((item, index) => (
                    <Typography variant="h4" style={{padding: '10px'}}>
                        {index + 1}. {item}
                    </Typography>
                ))
            }
        </Box>
    )
}

export default Top5ItemList;