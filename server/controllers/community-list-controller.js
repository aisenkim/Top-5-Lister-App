const mongoose = require("mongoose")
const CommunityList = require("../models/community-list-model");

createCommunityList = (req, res) => {
    const body = req.body;

    //CREATE COMMUNITY LIST
    const newCommunityList = new CommunityList(body)

    // SEE IF COMMUNITY LIST EXISTS BY TITLE
    CommunityList.findOne({name: body.name}, (err, communityList) => {
        if (err) {
            console.log("Error finding community list")
            return res.status(404).json({
                err,
                message: "Community List Not Found!",
            });
        }

        // ONLY UPDATE IF COMMUNITY LIST EXISTS
        if (communityList !== null) {
            // UPDATE COMMUNITY LIST
            newCommunityList.items.forEach((newItem) => {
                communityList.items.map((item) => {
                    if (newItem.name === item.name) {
                        item.points += newItem.points
                    }
                })
            })

            // UPDATE THE LIST
            communityList
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        communityList: communityList,
                        message: "Community List Created!",
                    });
                })
                .catch((error) => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(404).json({
                        error,
                        message: "Community List not updated!",
                    });
                })

        } else {
            // CREATE THE LIST
            newCommunityList
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        communityList: newCommunityList,
                        message: "Community List Created!",
                    });
                })
                .catch((error) => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(404).json({
                        error,
                        message: "Community List not created!",
                    });
                })
        }


    })

}

getCommunityLists = async (req, res) => {
    await CommunityList.find({}, (err, communityLists) => {
        if (err) {
            return res.status(400).json({success: false, error: err});
        }
        // if (!communityLists.length) {
        // return res
        //     .status(404)
        //     .json({success: false, error: `Top 5 Lists not found`});
        // }
        return res.status(200).json({success: true, communityLists: communityLists});
    })
}

getCommunityListById = async (req, res) => {
    await CommunityList.findOne({_id: req.params.id}, (err, list) => {
        console.log("LIST: ", list)
        if (err) {
            return res.xstatus(400).json({success: false, error: err});
        }
        CommunityList.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(req.params.id)}
            },
            {
                $unwind: "$items"
            },
            {
                $project: {name: '$items.name', points: '$items.points'}
            },
            {
                $sort: {
                    points: -1
                }
            }
        ]).exec((err, sortedItems) => {
            list.items = sortedItems
            return res.status(200).json({success: true, communityList: list});
        })
    })
        .catch(err => console.log(err))

}

updateCommunityList = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a body to update",
        });
    }
    await CommunityList.findOne({_id: req.params.id}, (err, list) => {
        if (err) {
            return res.status(400).json({success: false, error: err});
        }
        list.like = body.like
        list.dislike = body.dislike
        list.views = body.views

        list.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: list._id,
                    message: "Top 5 List updated!",
                });
            })
            .catch((error) => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: "Community List not updated!",
                });
            });
    })
}

updateCommunityListItems = async (req, res) => {
    const {deleteListName, deleteListItems} = req.body;
    // GET COMMUNITY LIST BY NAME
    await CommunityList.findOne({name: deleteListName}, (err, list) => {
        if (err) {
            return res.status(400).json({success: false, error: err});
        }

        // UPDATE THE COMMUNITY LIST AND MAP ITEMS POINTS
        let counter = 5
        deleteListItems.forEach(listItemName => {
            list.items.map(communityItem => {
                if (communityItem.name === listItemName)
                    communityItem.points -= counter;
                console.log("Community Item Points After: ", communityItem.points)
            })
            counter -= 1
        })
        const filteredCommunityItems = list.items.filter(updatedItem => {
            return updatedItem.points > 0
        })


        list.items = filteredCommunityItems;

        // UPDATE COMMUNITY LIST
        list.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    communityList: list,
                    id: list._id,
                    message: "COMMUNITY List updated!",
                });
            })
            .catch((error) => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: "Community List not updated!",
                });
            });

    })
}

deleteCommunityListItemIfEmpty = async (req, res) => {
    const deleteListName = req.query.listName;
    console.log(deleteListName)
    await CommunityList.findOne({name: deleteListName}, (err, list) => {
        if (list.items.length === 0) {
            CommunityList.findOneAndDelete({name: deleteListName}, () => {
                return res.status(200).json({success: true, communityList: list})
            }).catch(err =>
                res.status(404).json({
                    error,
                    message: "Community List not updated!",
                }));
        } else {
            res.status(200).json({success: true, communityList: list})
        }
    })
}

module.exports = {
    createCommunityList,
    getCommunityLists,
    getCommunityListById,
    updateCommunityList,
    updateCommunityListItems,
    deleteCommunityListItemIfEmpty
}