import expressAsyncHandler from "express-async-handler";
import { Token, User } from "../schema/model.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/token.js";
import { sendMail } from "../utils/sendMail.js";
import { HttpStatus, baseUrl } from "../config/constant.js";
import successResponse from "../helper/successResponse.js";
import bcrypt from "bcrypt";
import path from 'path';


// export let pagination = expressAsyncHandler(async (req, res, next) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = 10;
  
//     try {
//       const totalAdmins = await Admin.countDocuments();
//       const admins = await Admin.find()
//         .skip((page - 1) * pageSize)
//         .limit(pageSize);
  
//       successResponse(res, HttpStatus.OK, 'Admins fetched successfully', {
//         results: admins,
//         totalAdmins,
//         currentPage: page,
//         totalPage: Math.ceil(totalAdmins / pageSize),
//         hasNextPage: page * pageSize < totalAdmins,
//         hasPreviousPage: page > 1,
//       });
//     } catch (error) {
//       errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
//     }
//   });

  // export let createUser = expressAsyncHandler(async (req, res, next) => {
  //   let data = req.body;       
  //   console.log(data)                               //taking data from postman
  //   data.isVerify = false                                     //we set isVerify and isDeactivate to false in code itself and not let the user decide
  //   data.isDeactivate = false                                 
  //   let email = data.email                                    //getting email and storing in variable
  //   let user = await User.findOne({ email:email });           //Checking if the email is in DB
    
  //   if (user) {                                               //If it is then show duplicate email error
  //     let error = new Error("Duplicate email.");              
  //     error.statusCode = 409;
  //     throw error;
  //   }else{                                                    //else hash the password and create User
  //     let _hashPassword = await hashPassword(data.password);
  //   data.password = _hashPassword;
  //   let result = await User.create(req.body);
  //   delete result._doc.password;                              //delete password to not show it in response
  //   let infoObj = {                                           //setting infoObj and expireInfo for generating token
  //     id: result._id,
  //     role: result.role,
  //   };
  //   let expireInfo = {
  //     expiresIn: "1d",
  //   };
  //   let token = await generateToken(infoObj, expireInfo);    //Calling the generate token function
  //   await Token.create({ token });
  //   let link = `${baseUrl}/verify-email?token=${token}`      //Giving link and sending it to email for email verification
  //   await sendMail({
  //     from: '"Pratik Karanjit" <uniquekc425@gmail.com>',         //This is the text that is shown in (sent by)
  //     to: [data.email],
  //     subject: "Email verification",
  //     html: `<h1>
  //     Verify Email 
  //     <a href = "${link}">Click to verify</a>               
  //     <h1>`,
  //   });
  
  //   successResponse(res, HttpStatus.CREATED, "User created successfully", result);
  //   }
    
  // });


  export let createUser = expressAsyncHandler(async (req, res, next) => {
    try {
      const data = JSON.parse(req.body.info); // Parse the user data from info
      console.log(data)
      
      data.isVerify = false;
      data.isDeactivate = false;
  
      const email = data.email;
      const user = await User.findOne({ email: email });
  
      if (user) {
        let error = new Error('Duplicate email.');
        error.statusCode = 409;
        throw error;
      } else {
        const _hashPassword = await hashPassword(data.password);
        data.password = _hashPassword;
  
        let result = await User.create(data);
  
        if (req.file) {
          const filePath = path.join('public', req.file.filename);
          result.filePath = filePath; // Store the file path in the result object
          await result.save(); // Save the updated result object
        }
  
        const infoObj = {
          id: result._id,
          role: result.role,
        };
        const expireInfo = {
          expiresIn: '1d',
        };
        const token = await generateToken(infoObj, expireInfo);
        await Token.create({ token });
  
        const link = `${baseUrl}/verify-email?token=${token}`;
        await sendMail({
          from: '"Pratik Karanjit" <uniquekc425@gmail.com>',
          to: [data.email],
          subject: 'Email verification',
          html: `<h1>
            Verify Email 
            <a href="${link}">Click to verify</a>
            <h1>`,
        });
  
        successResponse(res, HttpStatus.CREATED, 'User created successfully', result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to create user.' });
    }
  });

  // export let createUser = expressAsyncHandler(async (req, res, next) => {
  //   try {
  //     const data = JSON.parse(req.body.info); // Parse the user data from info
  //     console.log(data);
  
  //     data.isVerify = false;
  //     data.isDeactivate = false;
  
  //     const email = data.email;
  //       // Access the Redis client from the request object
  //       const client = req.redisClient;
  
  //     // Check if the email exists in the cache
  //     client.get(`email:${email}`, async (err, cachedData) => {
  //       if (err) {
  //         console.error(err);
  //         return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
  //       }
  
  //       if (cachedData) {
  //         // Email found in cache, means it's a duplicate
  //         let error = new Error('Duplicate email.');
  //         error.statusCode = 409;
  //         return next(error);
  //       } else {
  //         const user = await User.findOne({ email: email });
  
  //         if (user) {
  //           // Store email in cache to mark it as duplicate for a certain time
  //           client.setex(`email:${email}`, 3600, 'duplicate');
            
  //           let error = new Error('Duplicate email.');
  //           error.statusCode = 409;
  //           return next(error);
  //         } else {
  //           const _hashPassword = await hashPassword(data.password);
  //           data.password = _hashPassword;
  
  //           let result = await User.create(data);
  
  //           if (req.file) {
  //             const filePath = path.join('public', req.file.filename);
  //             result.filePath = filePath; // Store the file path in the result object
  //             await result.save(); // Save the updated result object
  //           }
  
  //           const infoObj = {
  //             id: result._id,
  //             role: result.role,
  //           };
  //           const expireInfo = {
  //             expiresIn: '1d',
  //           };
  //           const token = await generateToken(infoObj, expireInfo);
  //           await Token.create({ token });
  
  //           const link = `${baseUrl}/verify-email?token=${token}`;
  //           await sendMail({
  //             from: '"Pratik Karanjit" <uniquekc425@gmail.com>',
  //             to: [data.email],
  //             subject: 'Email verification',
  //             html: `<h1>
  //               Verify Email 
  //               <a href="${link}">Click to verify</a>
  //               <h1>`,
  //           });
  
  //           // Store email in cache to mark it as unique for a certain time
  //           client.setex(`email:${email}`, 3600, 'unique');
  //           successResponse(res, HttpStatus.CREATED, 'User created successfully', result);
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Unable to create user.' });
  //   }
  // });
  

  
  export let verifyEmail = expressAsyncHandler(async (req, res, next) => {
    let id = req.info.id;    //getting id from query and setting it in a variable
    // console.log(id)
    let tokenId = req.token.tokenId   //sent token inside isAuthenticated and received tokenId through it
    // console.log(tokenId)
    let result = await User.findByIdAndUpdate(         //This line updates the user document in the database with the provided id. 
      id,
      { isVerify: true },    //isVerify is set to true, initially its false
      { new: true }          //this updates the response at once and need not hit the postman twice
    );
    // delete result._doc.password;    //password should not be shown so we delete it
    await Token.findByIdAndDelete(tokenId)    //No use
  
    successResponse(
      res,
      HttpStatus.CREATED,
      "Email verified successfully.",
      result
    );
  });
  
  export let loginUser = expressAsyncHandler(async (req, res, next) => {
    let email = req.body.email;         //getting email from postman and setting it in a variable
    let password = req.body.password;   //getting password from postman and setting it in a variable
    let data = await User.findOne({ email: email }); //if not present null, if present, gives output in object
    // console.log(data)
    if(data.isDeactivate) {
      await User.findByIdAndUpdate(data._id, {isDeactivate: false});  //isDeactivate false when logged in
     }
  
    if (!data) {                        //if it doesn't match the database's email throw this
      let error = new Error("Credential doesn't match");
      error.statusCode = 401;
      throw error;
    } else 
    {
      let isValidPassword = await comparePassword(password, data.password);   //checking if password matches
      if (!isValidPassword) {                            //if it doesn't match the database's password, throw error
        let error = new Error("Credential doesn't match");
        error.statusCode = 401;
        throw error;
      } else {
        if (!data.isVerify) {                  //If it is not verified, throw error
  
          let error = new Error("Please Verify Your Account First.");
          error.statusCode = 401;
          throw error;
        } else {                    //If it is verified, generate token
          let infoObj = {
            id: data._id,
            role: data.role,
          };
          let expireInfo = {
            expiresIn: "365d",
          };
          let token = await generateToken(infoObj, expireInfo);      //calling the generateToken function
          await Token.create({ token });             //Theres a separate DB for Token so we are saving it there
          res.json({ token }); // Send the token as part of the response
          successResponse(res, HttpStatus.CREATED, "Login Successfully", token);
        }
      }
      // console.log("isValidPassword", isValidPassword);
    }
  });


  export let readAllUser = expressAsyncHandler(async (req, res, next) => {
    try {
      let result = await User.find({ name: "nitan" });
  
      successResponse(res, HttpStatus.OK, "Read User  successfully", result);
    } catch (error) {
      errorResponse(res, HttpStatus.BAD_REQUEST, error.message);
    }
  });


  export let myProfile = expressAsyncHandler(async (req, res, next) => {
    let id = req.info.id;
    let result = await User.findById(id);
    successResponse(res, HttpStatus.OK, "My-profile read successfully", result);
  });
  

  export let updateMyProfile = expressAsyncHandler(async (req, res, next) => {
    let id = req.info.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    delete data.isVerify;
    // console.log(data);
    let result = await User.findByIdAndUpdate(id, data, { new: true });
    delete result._doc.password;
    successResponse(res, HttpStatus.OK, "updated successfully", result);
  });

  export let checkPassword = expressAsyncHandler(async (req, res, next) => {
    let id = req.info.id;
    let tokenId = req.token.tokenId;
    let { CurrentPassword, NewPassword } = req.body;
  
    let user = await User.findById(id);
  
    if (!user) {
      console.log("User not found.")
    }
    const isPasswordValid = await bcrypt.compare(CurrentPassword, user.password);
  
  // console.log("******\sdfsaad,f",CurrentPassword)
    // console.log("***********",isPasswordValid)
    if (!isPasswordValid) {
      // errorResponse(res, HttpStatus.BAD_REQUEST, error.message);
      let error = new Error("Password does not match")
      error.statusCode= 401
      throw error
    }
  
    else{
         // Hash the new password
     let _hashPassword = await hashPassword(NewPassword);
     let data = { password: _hashPassword };
    let result = await User.findByIdAndUpdate(id, data, { new: true });
    delete result._doc.password;
  
    await Token.findByIdAndDelete(tokenId);
    successResponse(res, HttpStatus.OK, "updated password successfully", result);
    }
  });


  export let forgetPassword = expressAsyncHandler(async (req, res, next) => {       
    let email=req.query.email      
    let data= await User.findOne({email})      
    let infoObj = {                         
      id: data._id,                          
      role: data.role,
    };
    let expireInfo = {                  
      expiresIn: "1d",
    };
  
    let token = await generateToken(infoObj,expireInfo)  
  
     await Token.create({token})                           
     let link = `${baseUrl}/forgot-password-reset?token=${token}`    
  
     await sendMail({
      from: '"Pratik Karanjit" <uniquekc425@gmail.com>',       
      to: [data.email],
      subject: "Email verification",
      html: `<h1>
      Verify Email 
      <a href = "${link}">Click to verify</a>               
      <h1>`,
    });
    
    
    successResponse(res, HttpStatus.OK, "Mail sent successfully");
  });
  
  
  export let resetPassword = expressAsyncHandler(async (req, res, next) => {
    let id = req.info.id; // Saving the id in a variable
    let tokenId = req.token.tokenId; // Saving token id in a variable
    let newPassword = await hashPassword(req.body.password); // Hashing the new password
  
    await User.findByIdAndUpdate(id, { password: newPassword }, { new: true }); 
    await Token.findByIdAndDelete(tokenId); 
  
    successResponse(res, HttpStatus.OK, "Password updated successfully");
  });