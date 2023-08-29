import { Router } from "express";
import upload from "../middleware/uploadFiles.js";
import successResponse from "../helper/successResponse.js";
import { HttpStatus } from "../config/constant.js";
import { createUser, readAllUser } from "../controller/userController.js";

let fileRouter = Router();

fileRouter.route("/single").post(upload.single("img"),createUser,readAllUser, (req, res, next) => {
    console.log(req.file, "photo.");
  let link = `localhost:3001/${req.file.filename}`;
  successResponse(res, HttpStatus.OK, "file Uploaded successfully", link);
});

fileRouter.route("/multiple").post(upload.array("img", 5), (req, res, next) => {
  console.log(req.files);
  let links = req.files.map((value, i) => {
    let link = `localhost:3001/${value.filename}`;
    return link;
  });

  successResponse(res, HttpStatus.OK, "files Uploaded successfully", links);
});
export default fileRouter;
