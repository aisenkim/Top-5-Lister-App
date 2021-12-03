import {React, useContext, useEffect, useState} from "react";
import Top5Item from "./Top5Item.js";
import List from "@mui/material/List";
import {ListItem, Stack, TextField, Typography} from "@mui/material";
import {GlobalStoreContext} from "../store/index.js";
import {styled} from "@mui/system";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuToolbar from "./Toolbar";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/

const StyledTextInput = styled(TextField)`
  color: #20262d;
  background: rgb(243, 246, 249);
  border-radius: 10px;
  border: 1px solid #e5e8ec;
  width: 40%;
  margin-bottom: 1px;
  margin-top: 4px;
  margin-left: 4%;
`;

function WorkspaceScreen() {
    const {store} = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    const [publishDisabled, setPublishDisabled] = useState(true);
    const [hasSameTitle, setHasSameTitle] = useState(true);

    useEffect(() => {
        store.checkHasTop5ListTitle(text).then((result) => {
            setHasSameTitle(result);
        });
    }, []);

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // store.addUpdateItemTransaction(props.index, text);
            store.updateTop5ListTitle(text);
        }
    }

    function handleUpdateTitle(event) {
        store.checkHasTop5ListTitle(text).then((result) => {
            setHasSameTitle(result);
        });
        store.updateTop5ListTitle(text);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleSaveButton() {
        store.closeCurrentList();
    }

    function handlePublishButton() {
        store.updateTop5ListPublishStatus();
        store.createCommunityList();
    }

    let editItems = "";
    if (store.currentList) {
        editItems = (
            <List id="edit-items" sx={{width: "100%", bgcolor: "background.paper"}}>
                {store.currentList.items.map((item, index) => (
                    <Top5Item
                        key={"top5-item-" + (index + 1)}
                        text={item}
                        index={index}
                    />
                ))}
            </List>
        );
    }
    return (
        <>
            <MenuToolbar/>
            <List
                sx={{
                    width: "88%",
                    left: "5.5%",
                    top: "10%",
                    bgcolor: "#283593",
                    height: "66%",
                    borderRadius: "10px",
                    border: "3px solid black",
                    overflow: "scroll",
                }}
            >
                <StyledTextInput
                    label="Title"
                    size="small"
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    onBlur={handleUpdateTitle}
                    defaultValue={store.currentList.name}
                />
                {/* <Box sx={{
                width: '92%',
                marginLeft: '4%',
                bgcolor: 'orange',
                height: '85%',
                borderRadius: '10px',
                marginTop: '10px'
            }}> */}

                {store.currentList.items.map((item, index) => (
                    <Stack direction="row" spacing={2} key={index}>
                        <ListItem
                            id={"item-" + (index + 1)}
                            key={index}
                            sx={{display: "flex", p: 1}}
                            style={{
                                fontSize: "18pt",
                                width: "10%",
                                height: "16.5%",
                                margin: "8px",
                                marginTop: "10px",
                                left: "3%",
                                padding: "5px",
                                backgroundColor: "#fff3e0",
                                borderRadius: "10px",
                            }}
                        >
                            <Box sx={{p: 1}}>
                                <Typography variant="h4" style={{fontSize: "26pt"}}>
                                    {index + 1}.
                                </Typography>
                            </Box>
                        </ListItem>
                        <Top5Item
                            key={"top5-item-" + (index + 1)}
                            text={item}
                            index={index}
                            setPublishDisabled={setPublishDisabled}
                        />
                    </Stack>
                ))}
                {/* </Box> */}
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{width: "50%", marginTop: "10px", marginLeft: "40%", float: "left"}}
                >
                    <Button variant="contained" size="large" onClick={handleSaveButton}>
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={publishDisabled || hasSameTitle}
                        onClick={handlePublishButton}
                    >
                        Publish
                    </Button>
                </Stack>
            </List>
        </>
    );
}

export default WorkspaceScreen;
