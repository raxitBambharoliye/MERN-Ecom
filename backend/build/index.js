"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_router_1 = __importDefault(require("./router/index.router"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_conection_1 = require("./connection/mongo.conection");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const log_1 = __importDefault(require("./utility/log"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use('/upload', express_1.default.static(path_1.default.join(__dirname, 'upload')));
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use("/", index_router_1.default);
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    log_1.default.info(`Server is running on port : :  ${process.env.PORT} ❣ ❣ ❣ `);
    yield (0, mongo_conection_1.mongoConnection)();
}));
function logMid(req, res, next) {
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
