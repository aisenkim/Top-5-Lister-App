import {React, useContext, useEffect, useState} from "react";
import {GlobalStoreContext} from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const {store} = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        const hasEmptyString = checkCurrentListHasEmptyString(store.currentList.items)
        if (hasEmptyString)
            props.setPublishDisabled(true)
        else
            props.setPublishDisabled(false)
    }, []);


    function toggleEdit() {
        let newActive = !editActive;
        store.setIsItemEditActive()
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // store.addUpdateItemTransaction(props.index, text);
            store.updateItem(props.index, text);
            const hasEmptyString = checkCurrentListHasEmptyString(store.currentList.items)
            if (hasEmptyString)
                props.setPublishDisabled(true)
            else
                props.setPublishDisabled(false)
            toggleEdit();
        }
    }

    function checkCurrentListHasEmptyString(currentList) {
        let shouldDisable = false
        currentList.forEach((item) => {
            if (item === '') {
                shouldDisable = true
            }
        })
        return shouldDisable;
    }

    // PREVENT FROM CASTING MULTIPLE VOTES
    function listHasSameItem(currentList, currentInput) {
        let hasSameItem = false;
        currentList.forEach((item) => {
            if (item === currentInput) {
                console.log("Item: ", item)
                console.log("currentInput: ", text)
                hasSameItem = true;
            }
        })
        return hasSameItem;
    }

    function updateItemDb(event) {
        const hasSameItem = listHasSameItem(store.currentList.items, text);
        store.updateItem(props.index, text);
        const hasEmptyString = checkCurrentListHasEmptyString(store.currentList.items);
        if (hasEmptyString || hasSameItem) {
            props.setPublishDisabled(true)
        } else {
            props.setPublishDisabled(false)
        }
        toggleEdit();
    }


    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let {index} = props;

    let itemClass = "top5-item";

    let listItem =
        <ListItem
            id={'item-' + (index + 1)}
            key={props.key}
            className={itemClass}
            sx={{p: 1}}
            onDoubleClick={toggleEdit}
            style={{
                fontSize: '26pt',
                width: '76%',
                height: '16.5%',
                margin: '10px',
                left: '2%',
                top: '4%',
                backgroundColor: '#fff3e0',
                borderRadius: '10px'
            }}
        >
            <Box sx={{p: 1, flexGrow: 1, height: '29pt'}}>{props.text}</Box>
        </ListItem>

    if (editActive) {
        listItem =
            <TextField
                required
                id={'item-' + (index + 1)}
                // label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                // className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                onBlur={updateItemDb}
                defaultValue={props.text}
                inputProps={{style: {fontSize: 26}}}
                InputLabelProps={{style: {fontSize: 26}}}
                autoFocus
                style={{
                    fontSize: '26pt',
                    width: '76%',
                    height: '16.5%',
                    margin: '10px',
                    left: '2%',
                    top: '4%',
                    backgroundColor: '#fff3e0',
                    borderRadius: '10px'
                }}
            />
    }

    return (
        listItem
    )
}

export default Top5Item;