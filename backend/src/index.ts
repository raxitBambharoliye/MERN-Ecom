import express from "express";
import router from "./router/index.router";
import dotenv from "dotenv";
import { mongoConnection } from "./connection/mongo.conection";
import cors from 'cors'
import path from 'path'
import logger from "./utility/log";
dotenv.config({ path: "./.env" });


const app = express();


app.use(express.json());
app.use(express.urlencoded());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(cors({
  origin:'*'
}))




app.use("/", router);
app.listen(process.env.PORT, async () => {
  logger.info(`Server is running on port : :  ${process.env.PORT} ❣ ❣ ❣ `);
  await mongoConnection();
});

function logMid(req: any, res: any, next: any) {
  console.log("--- Middleware Called ---");

  // Access request data (if applicable)
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Path: ${req.path}`);

  // Perform any actions before sending the response (optional)
  // ...

  // Call the next middleware or send the response (depending on your flow)s
  next(); // Pass control to the next middleware function

  // Alternatively, if you want to send the response directly from the middleware:
  // res.status(200).send('Custom response from middleware');
}
