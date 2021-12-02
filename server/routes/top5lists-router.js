const auth = require("../auth");
const express = require("express");
const Top5ListController = require("../controllers/top5list-controller");
const UserController = require("../controllers/user-controller");
const CommentController = require("../controllers/comment-controller");
const CommunityListController = require("../controllers/community-list-controller");
const router = express.Router();

router.post("/top5list", auth.verify, Top5ListController.createTop5List);
router.put("/top5list/:id", auth.verify, Top5ListController.updateTop5List);
router.delete("/top5list/:id", auth.verify, Top5ListController.deleteTop5List);
router.get("/top5list/title", auth.verify, Top5ListController.getTop5ListByTitle);
router.get("/top5list/:id", auth.verify, Top5ListController.getTop5ListById);
router.get("/top5lists", auth.verify, Top5ListController.getTop5Lists);
router.get("/top5listpairs", auth.verify, Top5ListController.getTop5ListPairs);

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/loggedIn", UserController.getLoggedIn);
router.get("/logout", UserController.logoutUser);

router.post("/comments", CommentController.createComment);
router.get("/comments", CommentController.getComments);
router.delete("/comments", auth.verify, CommentController.deleteListComments);

router.post("/communityList", auth.verify, CommunityListController.createCommunityList);
router.put("/communityList/items", auth.verify, CommunityListController.updateCommunityListItems);
router.put("/communityList/:id", auth.verify, CommunityListController.updateCommunityList);
router.get("/communityList", CommunityListController.getCommunityLists);
router.get("/communityList/:id", CommunityListController.getCommunityListById);
router.delete("/communityList", auth.verify, CommunityListController.deleteCommunityListItemIfEmpty);

module.exports = router;
