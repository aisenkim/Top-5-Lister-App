import {useContext, useEffect, useState} from 'react'
import {GlobalStoreContext} from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {Alert, CardContent, Collapse} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ModalUnstyled from "@mui/core/ModalUnstyled";
import Typography from "@mui/material/Typography";
import {styled} from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Top5ItemList from "./Top5ItemList";
import CommentSection from "./CommentSection";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AuthContext from "../auth";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
*/
const GridItem = styled(Grid)`
  padding-top: 8px !important;
  padding-bottom: 0px !important;
`;

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertStyle = styled(Alert)`
  font-size: 24px;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function ListCard(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const {communityList} = props;

    // FOR LIKE AND DISLIKE
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);

    // FOR EXPANDING EACH CARD
    const [expanded, setExpanded] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [currentComments, setCurrentComments] = useState([]);

    const handleExpandClick = async (event, id) => {
        // const responseComments = await store.getListCommentsById(id)
        // setCurrentComments(responseComments);
        const responseList = await store.getCommunityListById(id);
        setCurrentList(responseList)

        // UPDATE VIEW COUNT PER LIST
        if (!expanded) {
            await store.updateCurrentListViewsCommunity(id, responseList)
        }
        setExpanded(!expanded)
    };

    useEffect(() => {
        console.log("Insdie useEffect: ", expanded);
        setExpanded(false)
        // GO THROUGH IDNAMPAIR TO SEE IF USER LIKED OR DISLIKED BEFORE
        if (auth.user && communityList.like.includes(auth.user.email))
            setIsLike(true)
        else if (auth.user && communityList.dislike.includes(auth.user.email))
            setIsDislike(true)
    }, []);

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            // store.setCurrentList(id);
        }
    }

    async function handleLikeButton() {
        // DO NOTHING WHEN LIST NOT PUBLISHED
        // TODO - CHECK IF USER IS LOGGED IN OR NOT
        if (!auth.user)
            return
        let isLikeCounter = 0
        let isDislikeCounter = 0
        if (isDislike) {
            setIsDislike(false)
            isDislikeCounter = -1
        }
        if (isLike) {
            setIsLike(false)
            isLikeCounter = -1
        } else {
            setIsLike(true)
            isLikeCounter = 1
        }
        await store.updateLikeDislikeCommunityListToServer(communityList._id, isLikeCounter, isDislikeCounter, auth.user.email);
    }

    async function handleDislikeButton() {
        if (!auth.user)
            return
        let isLikeCounter = 0
        let isDislikeCounter = 0
        if (isLike) {
            setIsLike(false)
            isLikeCounter = -1
        }
        if (isDislike) {
            setIsDislike(false)
            isDislikeCounter = -1
        } else {
            setIsDislike(true)
            isDislikeCounter = 1
        }
        await store.updateLikeDislikeCommunityListToServer(communityList._id, isLikeCounter, isDislikeCounter, auth.user.email);
    }

    const date = new Date(communityList.updatedAt);
    let formmatedDate = date.toDateString();
    formmatedDate = formmatedDate.substr(formmatedDate.indexOf(" ") + 1)


    let cardElement =
        <ListItem
            id={communityList._id}
            key={props.idx}
            sx={{marginTop: '15px', display: 'flex', p: 1}}
            button
            onClick={(event) => {
                handleLoadList(event, communityList._id)
            }
            }
            style={{
                fontSize: '18pt',
                width: '100%',
                backgroundColor: '#9fa8da',
                borderRadius: '20px',
                border: '1px solid black'
            }}
        >
            <Grid container spacing={2}>
                <GridItem item xs={10}>
                    <Box sx={{p: 1, flexGrow: 1, fontWeight: 'bold'}}>{communityList.name}</Box>
                </GridItem>
                <GridItem item xs={1}>
                    <IconButton onClick={handleLikeButton} aria-label='like'>
                        <ThumbUpIcon style={{fontSize: '24pt', color: isLike ? "blue" : "gray"}}/>
                    </IconButton>
                    <Typography variant='p' style={{fontSize: '24pt'}}>{communityList.like.length}</Typography>
                </GridItem>
                <GridItem item xs={1}>
                    <IconButton onClick={handleDislikeButton} aria-label='dislike'>
                        <ThumbDownIcon style={{fontSize: '24pt', color: isDislike ? 'blue' : "gray"}}/>
                    </IconButton>
                    <Typography variant='p' style={{fontSize: '24pt'}}>{communityList.dislike.length}</Typography>
                </GridItem>
                <GridItem item xs={12} style={{paddingTop: '0px'}}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <GridItem container spacing={2}>
                            <GridItem item xs={6} sx={{height: '320px'}}>
                                <Top5ItemList id={communityList._id} currentList={currentList}/>
                            </GridItem>
                            <GridItem item xs={6} sx={{height: '320px'}}>
                                <CommentSection listId={communityList._id} currentComments={currentComments}
                                                setCurrentComments={setCurrentComments}
                                                isPublished={true}/>
                            </GridItem>
                        </GridItem>
                    </Collapse>
                </GridItem>
                <GridItem item xs={9}>
                    <Typography variant='p'
                                style={{fontSize: '10pt', fontWeight: 'bold', paddingLeft: '10px'}}>
                        Updated: <span style={{color: 'green'}}>{formmatedDate}</span>
                    </Typography>
                </GridItem>
                <GridItem item xs={2}>
                    <Typography variant='p'
                                style={{fontSize: '12pt', fontWeight: 'bold', paddingLeft: '5px'}}>Views:<span
                        style={{color: 'red'}}>{communityList.views}</span></Typography>
                </GridItem>
                <GridItem item xs={1}>
                    <ExpandMore
                        expand={expanded}
                        // onClick={handleExpandClick}
                        onClick={(event) => {
                            handleExpandClick(event, communityList._id)
                        }}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{paddingLeft: '20px'}}
                    >
                        <ArrowDownwardSharpIcon/>
                    </ExpandMore>
                </GridItem>
            </Grid>
        </ListItem>

    return (
        <>
            {cardElement}
        </>
    );
}

export default ListCard;