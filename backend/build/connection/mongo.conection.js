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
exports.mongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const log_1 = __importDefault(require("../utility/log"));
const mongoConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/MERN';
    // `mongodb+srv://raxitbambharoliya:raxit08@cluster0.h789rwv.mongodb.net/lampMERN`
    mongoose_1.default.connect(dbUrl);
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        log_1.default.info('Connected to MongoDB 💓💓💓 ');
    });
});
exports.mongoConnection = mongoConnection;
