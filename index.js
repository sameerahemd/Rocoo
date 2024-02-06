import express from "express";
// import User, { cities } from "./Models/User.js"; // Adjust the path based on your directory structure
import bcrypt from "bcrypt";
import crypto from "crypto"; // Import the 'crypto' module
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library
import nodemailer from "nodemailer";
const app = express();
const port = process.env.PORT || 8000; // Use process.env.PORT for flexibility
import cors from "cors";
const SECRET = process.env.SECRET || "topsecret";
import cookieParser from "cookie-parser";
import multer from "multer";
import bucket from "./Bucket/Firebase.js";
import fs from "fs";
import path from "path";
import { citiesModel, tweetModel2 } from "./Models/User.js";
import { tweetModel } from "./Models/User.js";

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: function (req, file, cb) {
    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use(express.json());


// Important Api
app.get("/api/v1/products", async (req, res) => {
  try {
    const result = await tweetModel.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.get("/api/v1/CompletedProject24/:id", upload.any(), async (req, res) => {
  const id = req.params.id;

  try {
    // Assuming tweetModel has a method like findById to find a document by its ID
    const tweet = await tweetModel.findById(id);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }
res.send(tweet)
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/v1/AddProduct", upload.any(), (req, res) => {
  try {
    const body = req.body;
console.log(body.projectName)
    console.log()
  

    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);

    const uploadedFiles = req.files.map((file) => {
      console.log("uploaded file name: ", file.originalname);
      console.log("file type: ", file.mimetype);
      console.log("file name in server folders: ", file.filename);
      console.log("file path in server folders: ", file.path);

      return new Promise((resolve, reject) => {
        bucket.upload(
          file.path,
          {
            destination: `tweetPictures/${file.filename}`,
          },
          (err, gcsFile) => {
            if (!err) {
              gcsFile
                .getSignedUrl({
                  action: "read",
                  expires: "03-09-2999",
                })
                .then((urlData) => {
                  console.log("public downloadable url: ", urlData[0]);
                  fs.unlinkSync(file.path); // Delete the local file

                  resolve(urlData[0]);
                })
                .catch((err) => {
                  console.error("Error getting signed URL:", err);
                  reject(err);
                });
            } else {
              console.error("Error uploading to GCS:", err);
              reject(err);
            }
          }
        );
      });
    });

    Promise.all(uploadedFiles)
      .then((urls) => {
        let array = urls;
        let addProduct = new tweetModel({
          projectName: body.projectName,
          projectDescription: body.projectDescription,
          imageUrl: array,
        });

        return addProduct.save(); 
      })
      .then(() => {
        console.log("Product added successfully");
        res.status(200).send();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        res.status(500).send();
      });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});
app.delete("/api/v1/customer/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await tweetModel.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.post("/api/v1/updates/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);

    const uploadedFiles = req.files.map((file) => {
      console.log("uploaded file name: ", file.originalname);
      console.log("file type: ", file.mimetype);
      console.log("file name in server folders: ", file.filename);
      console.log("file path in server folders: ", file.path);

      return new Promise((resolve, reject) => {
        bucket.upload(
          file.path,
          {
            destination: `tweetPictures/${file.filename}`,
          },
          (err, gcsFile) => {
            if (!err) {
              gcsFile
                .getSignedUrl({
                  action: "read",
                  expires: "03-09-2999",
                })
                .then((urlData) => {
                  console.log("public downloadable url: ", urlData[0]);
                  fs.unlinkSync(file.path); // Delete the local file

                  resolve(urlData[0]);
                })
                .catch((err) => {
                  console.error("Error getting signed URL:", err);
                  reject(err);
                });
            } else {
              console.error("Error uploading to GCS:", err);
              reject(err);
            }
          }
        );
      });
    });

    Promise.all(uploadedFiles).then((urls) => {
      let array = urls;
      tweetModel
        .findByIdAndUpdate(
          id,
          {
            projectName: body.projectName,
            projectDescription: body.projectDescription,
            imageUrl: array,
          },
          { new: true }
        )
        .then((updatedProduct) => {
          console.log("Product Updated successfully", updatedProduct);
          res.status(200).send();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          res.status(500).send();
        });
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
