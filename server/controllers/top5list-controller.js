const Top5List = require("../models/top5list-model");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

createTop5List = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Top 5 List",
    });
  }

  const top5List = new Top5List(body);
  console.log("creating top5List: " + JSON.stringify(top5List));
  if (!top5List) {
    return res.status(400).json({ success: false, error: err });
  }

  top5List
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        top5List: top5List,
        message: "Top 5 List Created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Top 5 List Not Created!",
      });
    });
};

updateTop5List = async (req, res) => {
  const userEmail = await getUserEmail(req.cookies.token);
  const body = req.body;
  console.log("updateTop5List: " + JSON.stringify(body));
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  // Top5List.findOne({ _id: req.params.id, ownerEmail: userEmail }, (err, top5List) => {
  Top5List.findOne({ _id: req.params.id}, (err, top5List) => {
    console.log("top5List found: " + JSON.stringify(top5List));
    if (err) {
      console.log("Error finding it from updateTop5List")
      return res.status(404).json({
        err,
        message: "Top 5 List not found!",
      });
    }

    // console.log("$%$%$%$%$%$%$%: ", top5List)
    // if(top5List === null){
    //   return res.status(401).json({
    //     message : "Unauthorized. This list doesn't belong to you!"
    //   })
    // }

    top5List.name = body.name;
    top5List.items = body.items;
    top5List
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          id: top5List._id,
          message: "Top 5 List updated!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "Top 5 List not updated!",
        });
      });
  });
};

deleteTop5List = async (req, res) => {
  const userEmail = await getUserEmail(req.cookies.token);
  console.log("userEmail: ",userEmail)
  Top5List.findOne({ _id: req.params.id, ownerEmail: userEmail }, (err, top5List) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Top 5 List not found!",
      });
    }
    console.log("$$$$$$$$$$$$: ", top5List)
    if(top5List === null){
      return res.status(401).json({
        message : "Unauthorized. This list doesn't belong to you!"
      })
    }
    Top5List.findOneAndDelete({ _id: req.params.id }, () => {
      return res.status(200).json({ success: true, data: top5List });
    }).catch((err) => console.log(err));
  });
};

getTop5ListById = async (req, res) => {
  await Top5List.findById({ _id: req.params.id }, (err, list) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, top5List: list });
  }).catch((err) => console.log(err));
};
getTop5Lists = async (req, res) => {
  await Top5List.find({}, (err, top5Lists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!top5Lists.length) {
      return res
        .status(404)
        .json({ success: false, error: `Top 5 Lists not found` });
    }
    return res.status(200).json({ success: true, data: top5Lists });
  }).catch((err) => console.log(err));
};


/**
 * GETS TOP5LIST PAIRS FOR CURRENT LOGGED IN USER
 * @param req
 * @param res
 * @return {Promise<void>}
 */
getTop5ListPairs = async (req, res) => {
  const userEmail = await getUserEmail(req.cookies.token);
  const toolMenu = req.query.toolMenu;
  const filter = toolMenu === "home" ? {ownerEmail : userEmail} : {}
  await Top5List.find(filter, (err, top5Lists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!top5Lists) {
      return res
        .status(404)
        .json({ success: false, error: "Top 5 Lists not found" });
    } else {
      // PUT ALL THE LISTS INTO ID, NAME PAIRS
      let pairs = [];
      for (let key in top5Lists) {
        let list = top5Lists[key];
        let pair = {
          _id: list._id,
          name: list.name,
          ownerEmail: list.ownerEmail,
          ownerName: list.ownerName
        };
        pairs.push(pair);
      }
      // Found top5Lists could have no items in it
      console.log("THe pairs **********",pairs)
      return res.status(200).json({ success: true, idNamePairs: pairs, ownerEmail: userEmail});
    }
  }).catch((err) => console.log("getTopListPairs in catch block: ", err));
};

//HELPER FUNCTION
getUserEmail = async (token) => {
  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = verified.userId;
    let userEmail = null;

    // FIND USER and get email
    userEmail = await User.find({_id : userId});

    if(!userEmail)
      return null;

    return userEmail[0].email;

  } catch(err) {
    console.log("Inside getUserEmail Function", err)
    return "";
  }
}

module.exports = {
  createTop5List,
  updateTop5List,
  deleteTop5List,
  getTop5Lists,
  getTop5ListPairs,
  getTop5ListById,
};
