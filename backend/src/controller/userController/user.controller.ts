import { UserModal } from "../../model/user.modal";
import bcrypt from "bcrypt";
import ContactModal from "../../model/constact.model";
import { generateToken } from "../../common/generateToken";
import logger from "../../utility/log";
import { MQ } from "../../common";
import { MODAL } from "../../constant";
import { UserIn } from "../../interface/User.intereface";
import fs from "fs";
import path from "path";
import ReviewIn from "../../interface/Review.interface";
const UserRegister = async (req: any, res: any) => {
  try {
    if (!req.body.role) {
      req.body.role = "user";
    }
    if (req.file) {
      req.body.profile = process.env.USER_PROFILE_PATH + "/" + req.file.filename;
    }
    req.body.isActive = true;
    const data = await UserModal.create(req.body);
    let token = await generateToken(data._id, data.email);
    res.status(200).json({ user: data, token });
  } catch (error) {
    logger.error(`CATCH ERROR : IN : user : register : 🐞🐞🐞 :\n ${error}`);
  }
};

const UserLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await MQ.findOne<UserIn>(MODAL.USER_MODAL, { email: email });
    if (!user) {
      return res.status(400).json({
        error: [{ path: "root", msg: "Invalid password or email " }],
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: [{ path: "root", msg: "Invalid password or email " }],
      });
    }
    let token = await generateToken(user._id, user.email);
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    logger.error(`CATCH ERROR : IN : user : UserLogin : 🐞🐞🐞 : \n ${error} `);
  }
};

const UserAddContact = async (req: any, res: any) => {
  try {
    const addData = await ContactModal.create(req.body);
    if (addData) {
      res.status(200).json({ message: "contact added successfully", contact: addData });
    } else {
      res.status(500).json({ message: "contact not added" });
    }
  } catch (error) {
    logger.error(`CATCH ERROR : IN : user : UserAddContact : 🐞🐞🐞 : \n `, error);
  }
};

const editProfile = async (req: any, res: any) => {
  try {
    let userData = await MQ.findById<UserIn>(MODAL.USER_MODAL, req.body.userId);
    if (!userData) {
      return res.status(401).json({ message: "user unauthenticated" });
    }
    if (req.file) {
      req.body.profile = process.env.USER_PROFILE_PATH + "/" + req.file.filename;
      if (userData.profile && fs.existsSync(path.join(__dirname, "../..", userData.profile))) {
        fs.unlinkSync(path.join(__dirname, "../..", userData.profile));
      }
    } else {
      req.body.profile = userData.profile;
    }
    let updateData = await MQ.findByIdAndUpdate<UserIn>(MODAL.USER_MODAL, userData._id, req.body, true);

    res.status(200).json({ user: updateData, message: "user updated successfully" });
  } catch (error) {
    logger.error(`CATCH ERROR : IN : user : editProfile : 🐞🐞🐞 : \n `, error);
  }
};

const addProductReview = async (req: any, res: any) => {
  try {
    const { userId, productId, reviewMessage, rating } = req.body;
    const reviewInsertData = {
      userId,
      productId,
      reviewMessage,
      rating,
    };
    let data = await MQ.addData(MODAL.PRODUCT_REVIEW_MODAL, reviewInsertData);
    logger.info("data ", data);
    let reviewData = await MQ.findWithPopulate<ReviewIn[]>(MODAL.PRODUCT_REVIEW_MODAL, { productId: productId }, "userId", "userName profile");
    let reviewSummary: any = {
      averageRating: 0,
      rating: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      },
    };
    if (reviewData && reviewData.length > 0) {
      let totalRating = 0;
      reviewData?.forEach((review: any) => {
        totalRating += review.rating;
        reviewSummary.rating[review.rating] += 1;
      });
      reviewSummary.averageRating = totalRating / reviewData.length;
      for (const key in reviewSummary.rating) {
        reviewSummary.rating[key] = reviewSummary.rating[key] != 0 ? ((reviewSummary.rating[key] / reviewData.length) * 100).toFixed(2) : 0;
      }
    }

    if (data && reviewSummary && reviewData) {
      res.status(200).json({ reviewData, reviewSummary });
    } else {
      res.status(400).json({ message: "some thing went wrong, please try again later." });
    }
  } catch (error) {
    logger.error(`CATCH ERROR : IN : user : addProductReview : 🐞🐞🐞 :\n ${error}`);
  }
};

export { UserRegister, UserLogin, UserAddContact, editProfile, addProductReview };
