import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import {useContext, useEffect, useState} from "react";
import {GlobalStoreContext} from "../store";

function Top5ItemList(props) {

    const {store} = useContext(GlobalStoreContext);

    // ERROR HANDLING - WHEN LIST IS OPEN FROM ONE MENU, IT CLOSES WHEN OTHER MENU CLICKED
    // if(!store.currentList) {
    //     props.handleExpandClick(null, props.id)
    //     return null;
    // }

    return (
        <Box sx={{backgroundColor: 'orange', width: '100%', height: '100%', borderRadius: '10px', padding: '5px'}}>
            {
                props.currentList.items.map((item, index) => (
                    <Typography key={index} variant="h4" style={{padding: '10px'}}>
                        {index + 1}. {item}
                    </Typography>
                ))
            }
        </Box>
    )
}

export default Top5ItemList;