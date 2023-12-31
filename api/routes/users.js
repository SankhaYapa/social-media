import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getGuiders,
  followUser,
  unFollowUser,
  getConversationUsers,
  getFriends,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { getConversationByUserIds } from "../controllers/conversations.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", deleteUser);


//GET
router.get("/", getUser);
//GET ALL
router.get("/all", getUsers);
router.get("/getGuiders", getGuiders);
router.get("/:userId", getConversationUsers);
router.get("/friends/:userId",getFriends);
router.put("/:id/follow",followUser)
router.put("/:id/unfollow",unFollowUser)
export default router;
