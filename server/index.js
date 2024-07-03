const express = require("express");
const app = express();

const cookieparser = require("cookie-parser");
app.use(cookieparser());
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
dotenv.config();

// Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Morgan
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const port = 9000;

const bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://frontend-packurbags.onrender.com"],
    credentials: true,
  })
);


//connect to mongo
mongoose
  .connect(process.env.MONGODB_LINK_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb  Connected..."))
  .catch((err) => console.log(err));

// Static Files
app.use(express.static("public"));

// Morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

// Implement Swagger

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel API",
      version: "1.0.0",
      description: "Travel API Information",
      contact: {
        name: "Travel API",
      },
      servers: [
        {
          url: "http://localhost:9000",
          url: "https://backend-packurbags.onrender.com",
        },
      ],
    },
  },
  apis: ["./index.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/users", require("./routes/users"));
app.use("/profile", require("./routes/profile"));
app.use("/index", require("./routes/index"));
app.use("/places", require("./routes/places"));
app.use("/book", require("./routes/book"));
app.use("/admins", require("./routes/admins"));
app.use("/payment", require("./routes/payments"));

module.exports = app.listen(port, function () {
  console.log("server is running on the port 9000");
});

// Swagger Testing --------------------------------------------------------------------------------
/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method is working or not
 *      tags: [Sample]
 *      responses:
 *          200:
 *              description: To test Get Method
 */

// Admin --------------------------------------------------------------------------------------------
/**
 * @swagger
 * /admins/feedbacks:
 *  get:
 *      summary: Fetching feedbacks from database
 *      description: Fetching feedbacks from database
 *      tags: [Admin]
 *      responses:
 *          200:
 *              description: To test Get Method
 *              content:
 *                  application/json:
 *                    schema:
 *                     type: object
 *                    properties:
 */

/**
 * @swagger
 * /admins/tours/{id}:
 *  get:
 *      summary: Fetching tours of particular user from the database
 *      description: Fetching tours of particular user from the database
 *      tags: [Admin]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /admins/users/?role={role}:
 *  get:
 *      summary: List of all users
 *      description: List of all users
 *      tags: [Admin]
 *      parameters:
 *          - in: path
 *            name: role
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *              content:
 *                  application/json:
 *                    schema:
 *                     type: object
 *                    properties:
 */

/**
 * @swagger
 * /admins/delete/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      description: Deletes a single user by ID
 *      tags: [Admin]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID of the user
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: User Deleted
 *          500:
 *              description: Error
 *
 */

// Book --------------------------------------------------------------------------------------------
/**
 * @swagger
 * /book/booking/{id}:
 *  get:
 *      summary: List all the bookings of a particular user
 *      description: List all the bookings of a particular user
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /book/book/{id}:
 *  get:
 *      summary: List all the bookings of a particular user
 *      description: List all the bookings of a particular user
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

// index --------------------------------------------------------------------------------------------
/**
 * @swagger
 * /index/fd:
 *  post:
 *     summary: Give feedback
 *     description: Give feedback
 *     tags: [Index]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         username:
 *                             type: string
 *                         fdbk:
 *                             type: string
 *     responses:
 *         200:
 *             description: Added Successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Internal Server Error
 */

// payment--------------------------------------------------------------------------------------------
/**
 * @swagger
 * /payment/pay/{id}:
 *  get:
 *      summary: List all the payments of a particular user
 *      description: List all the payments of a particular user
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /payment/mybookings/{id}:
 *  get:
 *      summary: List all the bookings of a particular user
 *      description: List all the bookings of a particular user
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /payment/post/{id}:
 *  post:
 *     summary: Doing Payment for a particular booking
 *     description: Doing Payment for a particular booking
 *     tags: [Payment]
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         username:
 *                             type: string
 *                         number:
 *                             type: string
 *                         name:
 *                             type: string
 *                         expmonth:
 *                             type: string
 *                         expyear:
 *                             type: string
 *                         cvv:
 *                             type: string
 *     responses:
 *         200:
 *             description: Added Successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Internal Server Error
 */

/**
 * @swagger
 * /payment/getTransactions/{id}:
 *  get:
 *      summary: This api is used to check payment history
 *      description: This api is used to check payment history
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

// places--------------------------------------------------------------------------------------------

/**
 * @swagger
 * /places/places/{id}:
 *  get:
 *      summary: This api is used to list all the places with the id
 *      description: This api is used to list all the places with the id
 *      tags: [Places]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /places/placedetails/{id}:
 *  get:
 *      summary: This api is used to list the details about a particular place
 *      description: This api is used to list the details about a particular place
 *      tags: [Places]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

// profile--------------------------------------------------------------------------------------------
/**
 * @swagger
 * /profile/edit:
 *  post:
 *     summary: This is used to edit profile
 *     description: This is used to edit profile
 *     tags: [Profile]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         username:
 *                             type: string
 *                         name:
 *                             type: string
 *                         phonenumber:
 *                             type: string
 *                         gender:
 *                             type: string
 *                         email:
 *                             type: string
 *     responses:
 *         200:
 *             description: Added Successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Internal Server Error
 */

/**
 * @swagger
 * /profile/changepass:
 *  post:
 *     summary: This is used to change password
 *     description: This is used to change password
 *     tags: [Profile]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         email:
 *                             type: string
 *                         oldpassword:
 *                             type: string
 *                         newpassword:
 *                             type: string
 *     responses:
 *         200:
 *             description: Added Successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Internal Server Error
 */

/**
 * @swagger
 * /profile/remove:
 *  post:
 *     summary: This is used to remove profile image
 *     description: This is used to remove profile image
 *     tags: [Profile]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         email:
 *                             type: string
 *     responses:
 *         200:
 *             description: Added Successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Internal Server Error
 */

/**
 * @swagger
 * /profile/feedback:
 *  post:
 *     summary: This is used to change feedback from profile page
 *     description: This is used to change feedback from profile page
 *     tags: [Profile]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         username:
 *                             type: string
 *                         feedback:
 *                             type: string
 *     responses:
 *         200:
 *             description: Added Successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Internal Server Error
 */

/**
 * @swagger
 * /profile/deletefeedback/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      description: Deletes a single user by ID
 *      tags: [Profile]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID of the user
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: User Deleted
 *          500:
 *              description: Error
 *
 */

// users--------------------------------------------------------------------------------------------

/**
 * @swagger
 * /users/loguser/{id}:
 *  get:
 *      summary: This api is used to show the user details which is logged in
 *      description: This api is used to show the user details which is logged in
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /users/login:
 *  post:
 *     summary: This API is used to login and whether the user present or not
 *     description: This API is used to login and whether the user present or not
 *     tags: [Users]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         username:
 *                             type: string
 *                         password:
 *                             type: string
 *     responses:
 *         200:
 *             description: Added Successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Internal Server Error
 */
