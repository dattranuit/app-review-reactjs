const router = require("express").Router();
const commentController = require("../app/controllers/CommentController");
const authMiddleWare = require("../app/middleware/auth");

const multer = require("multer");

router.use(multer().none());

router.get("/", commentController.getAll);

router.get("/users/:_id", commentController.getCommentsByIdUser);

router.get("/:_id", commentController.getById);

router.post("/", commentController.create);

// router.use(authMiddleWare);

router.put("/:_id", commentController.update);

router.delete("/:_id", commentController.detele);

router.delete("/:_id/user", commentController.deteleUserCmt);

module.exports = router;
