import { UserModal } from "./../../model/user.modal";
import bcrypt from "bcrypt";
import logger from "../../utility/log";
import { MQ } from "../../common";
import { MODAL } from "../../constant";
import { AdminIn } from "../../interface/Admin.interefact";
import { generateToken } from "../../common/generateToken";
import fs from "fs";
import path from "path";
import { UserIn } from "../../interface/User.intereface";
import AddressIN from "../../interface/Address.interface";

const getAllUsers = async (page: any, limit: any, search: any) => {
  try {
    search = search.trim() ?? "";
    const totalDos = await MQ.find(MODAL.USER_MODAL, {
      $or: [
        { userName: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
        { phone: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    });
    const allData = await MQ.pagination(
      MODAL.USER_MODAL,
      {
        $or: [
          { userName: { $regex: ".*" + search + ".*", $options: "i" } },
          { email: { $regex: ".*" + search + ".*", $options: "i" } },
          { phone: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      },
      { skip: (page - 1) * limit, limit: limit }
    );
    if (allData && allData.length > 0 && totalDos && totalDos.length > 0) {
      return {
        allUser: allData,
        maxLimit: Math.ceil(totalDos.length / limit),
      };
    }
    return {
      allUser: [],
      maxLimit: 0,
    };
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : category : getAllCategoryData : 🐞🐞🐞 : \n ${error}`
    );
  }
};

const AdminLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const admin = await MQ.findOne<AdminIn>(MODAL.ADMIN_MODAL, { email });
    if (!admin || !admin.isActive) {
      return res.status(400).json({
        error: [{ path: "root", msg: "Invalid password or email " }],
      });
    }
    let passwordCheck = await bcrypt.compare(password, admin.password);
    if (!passwordCheck) {
      return res.status(400).json({
        error: [{ path: "root", msg: "Invalid password or email " }],
      });
    }
    let token = await generateToken(admin._id, admin.email);
    res.status(200).json({ token: token, admin });
  } catch (error) {
    logger.error(`CATCH ERROR : IN : admin : AdminLogin : 🐞🐞🐞 : \n `, error);
  }
};

const AdminAdd = async (req: any, res: any) => {
  try {
    if (req.body.editor) {
      const editorAdmin = await MQ.findById<AdminIn>(
        MODAL.ADMIN_MODAL,
        req.body.editor
      );
      if (!editorAdmin || editorAdmin.role != "admin") {
        return res.status(401).json({
          error: [{ path: "root", msg: "unauthenticated user " }],
        });
      }
    }
    if (req.file) {
      req.body.profile = process.env.PROFILE_PATH + "/" + req.file.filename;
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.isActive = false;
    let adminData = await MQ.addData<AdminIn>(MODAL.ADMIN_MODAL, req.body);
    if (adminData) {
      res
        .status(200)
        .json({ message: "admin added successfully ", admin: adminData });
    }
  } catch (error) {
    logger.error(`CATCH ERROR : IN : admin : AdminAdd : 🐞🐞🐞 : \n `, error);
  }
};

const AdminEditProfile = async (req: any, res: any) => {
  try {
    if (!req.body.adminId) {
      return res.status(400).json({
        error: [{ path: "root", msg: "invalid data " }],
      });
    }

    const admin = await MQ.findById<AdminIn>(
      MODAL.ADMIN_MODAL,
      req.body.adminId
    );

    if (!admin) {
      return res.status(401).json({
        error: [{ path: "root", msg: "unauthenticated user " }],
      });
    }
    if (req.body.editor) {
      const editorAdmin = await MQ.findById<AdminIn>(
        MODAL.ADMIN_MODAL,
        req.body.editor
      );
      if (!editorAdmin || editorAdmin.role != "admin") {
        return res.status(401).json({
          error: [{ path: "root", msg: "unauthenticated user " }],
        });
      }
    }
    if (typeof req.file != "undefined") {
      if (admin.profile && fs.existsSync(path.join(__dirname, "../..", admin.profile))) {
        fs.unlinkSync(path.join(__dirname, "../..", admin.profile));
      }
      req.body.profile = process.env.PROFILE_PATH + "/" + req.file.filename;
    }

    const upAdmin = await MQ.findByIdAndUpdate(
      MODAL.ADMIN_MODAL,
      admin.id,
      req.body,
      true
    );
    if (req.body.editor) {
      let page = req.body.page;
      let limit = req.body.limit;
      const allAdminData = await MQ.find<AdminIn>(MODAL.ADMIN_MODAL, {});
      const pageData = await MQ.pagination<AdminIn>(
        MODAL.ADMIN_MODAL,
        {},
        { skip: (page - 1) * limit, limit }
      );
      if (allAdminData && allAdminData.length > 0) {
        return res
          .status(200)
          .json({
            allAdmin: pageData,
            maxLimit: Math.round(allAdminData.length / limit),
          });
      }
    }
    if (upAdmin) {
      const token = await generateToken(admin.id, admin.email);
      return res.status(200).json({ admin: upAdmin, token });
    } else {
      return res
        .status(1001)
        .json({ message: "something was wrong try after some time " });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : AdminEditProfile : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const AdminAllAdminData = async (req: any, res: any) => {
  try {
    let limit = req.params.limit;
    let page = req.params.page;
    let search = req.query.search ?? "";
    const adminData = await MQ.find<AdminIn>(MODAL.ADMIN_MODAL, {
      $or: [
        { useName: { $regex: ".*" + search + ".*", $options: "i" } },
        { phone: { $regex: ".*" + search + ".*", $options: "i" } },
        { role: { $regex: ".*" + search + ".*", $options: "i" } },
        { companyName: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    });
    const pageData = await MQ.pagination<AdminIn>(
      MODAL.ADMIN_MODAL,
      {
        $or: [
          { useName: { $regex: ".*" + search + ".*", $options: "i" } },
          { phone: { $regex: ".*" + search + ".*", $options: "i" } },
          { role: { $regex: ".*" + search + ".*", $options: "i" } },
          { companyName: { $regex: ".*" + search + ".*", $options: "i" } },
          { email: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      },
      { skip: (page - 1) * limit, limit }
    );
    if (adminData && adminData.length > 0 && pageData && pageData.length > 0) {
      res
        .status(200)
        .json({
          allAdmin: pageData,
          maxLimit: Math.ceil(adminData.length / req.params.limit),
        });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : AdminAllAdminData : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const AdminDelete = async (req: any, res: any) => {
  try {
    const adminData = await MQ.findById<AdminIn>(
      MODAL.ADMIN_MODAL,
      req.params.id
    );
    if (!adminData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    if (adminData.profile) {
      if(fs.existsSync(path.join(__dirname, "../..", adminData.profile)))
      fs.unlinkSync(path.join(__dirname, "../..", adminData.profile));
    }
    await MQ.findByIdAndDelete(MODAL.ADMIN_MODAL, adminData.id);

    let page = req.params.page;
    let limit = req.params.limit;
    const allAdminData = await MQ.find<AdminIn>(MODAL.ADMIN_MODAL, {});
    const pageData = await MQ.pagination<AdminIn>(
      MODAL.ADMIN_MODAL,
      {},
      { skip: (page - 1) * limit, limit }
    );
    if (allAdminData && allAdminData.length > 0) {
      res
        .status(200)
        .json({
          allAdmin: pageData,
          maxLimit: Math.round(allAdminData.length / req.params.limit),
        });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : AdminDelete : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const AdminActive = async (req: any, res: any) => {
  try {
    const adminData = await MQ.findById<AdminIn>(
      MODAL.ADMIN_MODAL,
      req.params.id
    );
    if (!adminData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    let active = adminData.isActive ? false : true;

    await MQ.findByIdAndUpdate(MODAL.ADMIN_MODAL, adminData.id, {
      isActive: active,
    });

    let page = req.params.page;
    let limit = req.params.limit;
    const allAdminData = await MQ.find<AdminIn>(MODAL.ADMIN_MODAL, {});
    const pageData = await MQ.pagination<AdminIn>(
      MODAL.ADMIN_MODAL,
      {},
      { skip: (page - 1) * limit, limit }
    );
    if (allAdminData && allAdminData.length > 0) {
      res
        .status(200)
        .json({
          allAdmin: pageData,
          maxLimit: Math.round(allAdminData.length / req.params.limit),
        });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : AdminActive : 🐞🐞🐞 : \n ${error}`
    );
  }
};

// user functions
const allUserData = async (req: any, res: any) => {
  try {
    const page = req.params.page;
    const limit = req.params.limit;
    const search = req.query.search || "";

    const resData = await getAllUsers(page, limit, search);
    if (resData) {
      return res.status(200).json(resData);
    } else {
      return res.status(400).json({ message: "some thing went wrong" });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : allUserData : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const addUser = async (req: any, res: any) => {
  try {
    if (req.file) {
      req.body.profile =
        process.env.USER_PROFILE_PATH + "/" + req.file.filename;
    }
    req.body.role = "user";
    req.body.isActive = true;
    const userData = await MQ.addData(MODAL.USER_MODAL, req.body);
    if (userData) {
      return res
        .status(200)
        .json({ message: "user added successfully", userData });
    } else {
      return res.status(400).json({ message: "some thing went wrong" });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : allUserData : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const activeUser = async (req: any, res: any) => {
  try {
    const userData = await MQ.findById<AdminIn>(
      MODAL.USER_MODAL,
      req.params.id
    );
    if (!userData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    let active = userData.isActive ? false : true;

    await MQ.findByIdAndUpdate(MODAL.USER_MODAL, userData.id, {
      isActive: active,
    });

    let page = req.params.page;
    let limit = req.params.limit;
    let search = req.query.search || "";

    let resData = await getAllUsers(page, limit, search);

    if (resData) {
      return res.status(200).json(resData);
    } else {
      return res.status(400).json({ message: "some thing went wrong" });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : AdminActive : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const deleteUser = async (req: any, res: any) => {
  try {
    const userData = await MQ.findById<UserIn>(MODAL.USER_MODAL, req.params.id);
    if (!userData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    if (userData && userData.profile) {
      if (fs.existsSync(path.join(__dirname, "../..", userData?.profile))) {
        fs.unlinkSync(path.join(__dirname, "../..", userData?.profile));
      }
    }
    await MQ.findByIdAndDelete(MODAL.USER_MODAL, userData._id);

    let page = req.params.page;
    let limit = req.params.limit;
    let search = req.query.search || "";
    const resData = await getAllUsers(page, limit, search);
    res.status(200).json(resData);
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : userDelete : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const editUser = async (req: any, res: any) => {
  try {
    let userData = await MQ.findById<UserIn>(MODAL.USER_MODAL, req.body.userId);
    if (!userData) {
      return res.status(401).json({ message: "user unauthenticated" });
    }
    if (req.file) {
      req.body.profile =
        process.env.USER_PROFILE_PATH + "/" + req.file.filename;
      if (userData.profile && fs.existsSync(path.join(__dirname, "../..", userData.profile))) {
        fs.unlinkSync(path.join(__dirname, "../..", userData.profile));
      }
    } else {
      req.body.profile = userData.profile;
    }
    await MQ.findByIdAndUpdate<UserIn>(
      MODAL.USER_MODAL,
      userData._id,
      req.body,
      true
    );

    let page = req.body.page;
    let limit = req.body.limit;
    let search = req.body.search || "";
    const resData = await getAllUsers(page, limit, search);
    res.status(200).json(resData);
  } catch (error) {
    logger.error(`CATCH ERROR : IN : user : editProfile : 🐞🐞🐞 : \n `, error);
  }
};
const getSingleUserProfile = async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({message:"user not found"})
    }
    const userData = await MQ.findById<UserIn>(MODAL.USER_MODAL, req.params.id);
    if (!userData) {
      return res.status(400).json({ message: "user not found" });
    }
    const userAddress = await MQ.find<AddressIN[]>(MODAL.ADDRESS_MODAL, { userId: userData.id });
    return res.status(200).json({ userData, address: userAddress });
  } catch (error) {
    logger.error(`CATCH ERROR : IN : admin : getSingleUserProfile : 🐞🐞🐞 : \n `, error);

  }
}
export {
  AdminLogin,
  AdminAdd,
  AdminEditProfile,
  AdminAllAdminData,
  AdminDelete,
  AdminActive,
  allUserData,
  addUser,
  activeUser,
  deleteUser,
  editUser,
  getSingleUserProfile,
};
