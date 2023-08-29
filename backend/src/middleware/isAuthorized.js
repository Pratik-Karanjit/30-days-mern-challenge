import expressAsyncHandler from "express-async-handler";

const isAuthorized = (roles) =>
  expressAsyncHandler((req, res, next) => {
    // console.log(req.info)
    if (roles.includes(req.info.role) || req.info.role === 'admin') {
      next();
    } else {
      let error = new Error("Permission denied, you are not allowed to view this as a customer.");
      error.statusCode = 403;
      throw error;
    }
  });

export default isAuthorized;
