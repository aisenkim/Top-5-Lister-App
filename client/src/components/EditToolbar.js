import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.clearAllTransactions();
        store.closeCurrentList();
    }
    console.log("ran here")
    let editStatus = false;
    if (store.isItemEditActive) {
        editStatus = true;
    }
    // undo button
    let undoStatus = false;
    if(store.isItemEditActive || !store.canUndo()){
       undoStatus = true;
    }

    // redo button
    let redoStatus = false;
    if (store.isItemEditActive || !store.canRedo()) {
        redoStatus = true;
    }

    let enabledButtonClass = "top5-button";

    return (
        <div id="edit-toolbar">
            <Button
                disabled={undoStatus}
                id='undo-button'
                className={enabledButtonClass}
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button
                disabled={redoStatus}
                id='redo-button'
                className={enabledButtonClass}
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;