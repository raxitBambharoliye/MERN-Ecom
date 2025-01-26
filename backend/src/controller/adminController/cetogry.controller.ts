import { MQ } from "../../common";
import { MODAL } from "../../constant";
import { AdminIn } from "../../interface/Admin.interefact";
import CategoryIn from "../../interface/Category.interface";
import logger from "../../utility/log";
import fs from "fs";
import path from "path";

const getAllCategoryData = async (page: any, limit: any, search: any) => {
  try {
    search = search.trim() ?? "";
    const totalDos = await MQ.find(MODAL.CATEGORY_MODAL, {
      categoryName: { $regex: ".*" + search + ".*", $options: "i" },
    });
    const allCategoryData = await MQ.pagination(
      MODAL.CATEGORY_MODAL,
      {
        categoryName: { $regex: ".*" + search + ".*", $options: "i" },
      },
      { skip: (page - 1) * limit, limit: limit }
    );
    if (
      allCategoryData &&
      allCategoryData.length > 0 &&
      totalDos &&
      totalDos.length > 0
    ) {
      return {
        allCategory: allCategoryData,
        maxLimit: Math.ceil(totalDos.length / limit),
      };
    }
    return {
      allCategory: [],
      maxLimit: 0,
    };
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : category : getAllCategoryData : 🐞🐞🐞 : \n ${error}`
    );
  }
};

const addCategory = async (req: any, res: any) => {
  try {
    if (req.file) {
      req.body.categoryImage =
        process.env.CATEGORY_IMAGE_PATH + "/" + req.file.filename;
    } else {
      res
        .status(400)
        .json({ message: "category image is required", path: "categoryImage" });
    }
    req.body.isActive = false;
    const categoryData = await MQ.addData(MODAL.CATEGORY_MODAL, req.body);
    if (categoryData) {
      const allCategory = await MQ.find<CategoryIn>(MODAL.CATEGORY_MODAL, {});
      res
        .status(200)
        .json({ message: "category added successfully ", allCategory });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : category : addCategory : 🐞🐞🐞 : \n ${error}`
    );
  }
};

const allCategory = async (req: any, res: any) => {
  try {
    const page = req.params.page;
    const limit = req.params.limit;
    const search = req.query.search ?? "";
    const totalDos = await MQ.find(MODAL.CATEGORY_MODAL, {
      categoryName: { $regex: ".*" + search + ".*", $options: "i" },
    });
    let allCategoryData;
    if (page > 0 && limit > 0) {
      allCategoryData = await MQ.pagination(
        MODAL.CATEGORY_MODAL,
        {
          categoryName: { $regex: ".*" + search + ".*", $options: "i" },
        },
        { skip: (page - 1) * limit, limit: limit }
      );
    } else {
      allCategoryData = totalDos;
    }

    if (
      allCategoryData &&
      allCategoryData.length > 0 &&
      totalDos &&
      totalDos.length > 0
    ) {
      res.status(200).json({
        allCategory: allCategoryData,
        maxLimit: Math.ceil(totalDos.length / req.params.limit),
      });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : category : addCategory : 🐞🐞🐞 : \n ${error}`
    );
  }
};

const activeCategory = async (req: any, res: any) => {
  try {
    const { id, page, limit } = req.params;
    const search = req.query.search || "";
    const categoryData: any = await MQ.findById<CategoryIn>(
      MODAL.CATEGORY_MODAL,
      id
    );
    if (!categoryData) {
      res.send(400).json({ error: { message: "something was wrong" } });
    }
    const updateData = await MQ.findByIdAndUpdate(MODAL.CATEGORY_MODAL, id, {
      isActive: !categoryData.isActive,
    });
    if (updateData) {
      let resData: any = await getAllCategoryData(page, limit, search);
      res.status(200).json(resData);
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : category : addCategory : 🐞🐞🐞 : \n ${error}`
    );
  }
};

const deleteCategory = async (req: any, res: any) => {
  try {
    const categoryData = await MQ.findById<CategoryIn>(
      MODAL.CATEGORY_MODAL,
      req.params.id
    );
    if (!categoryData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    if (fs.existsSync(path.join(__dirname, "../..", categoryData.categoryImage))) {
      fs.unlinkSync(path.join(__dirname, "../..", categoryData.categoryImage));
    }

    await MQ.findByIdAndDelete(MODAL.CATEGORY_MODAL, categoryData.id);

    let page = req.params.page;
    let limit = req.params.limit;
    let search = req.query.search || "";
    const resData = await getAllCategoryData(page, limit, search);
    res.status(200).json(resData);
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : admin : AdminDelete : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const editCategory = async (req: any, res: any) => {
  try {
    const { categoryId, editor } = req.body;
    const editorData = await MQ.findById<AdminIn>(MODAL.ADMIN_MODAL, editor);
    const categoryData = await MQ.findById<CategoryIn>(
      MODAL.CATEGORY_MODAL,
      categoryId
    );
    if (
      (!editorData || editorData.role != "admin") &&
      categoryData?.creator != editor._id
    ) {
      return res.status(401).json({
        error: [{ path: "root", msg: "unauthenticated user " }],
      });
    }
    if (!categoryData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }

    if (req.file) {
      if (fs.existsSync(path.join(__dirname, "../..", categoryData?.categoryImage))) {
        fs.unlinkSync(path.join(__dirname, "../..", categoryData?.categoryImage));
      }
      req.body.categoryImage =
        process.env.CATEGORY_IMAGE_PATH + "/" + req.file.filename;
    } else {
      req.body.categoryImage = categoryData.categoryImage;
    }
    const updateData = await MQ.findByIdAndUpdate(
      MODAL.CATEGORY_MODAL,
      categoryData._id,
      req.body
    );
    if (updateData) {
      let resData = await getAllCategoryData(
        Number(req.body.page),
        Number(req.body.limit),
        req.body.search
      );
      res.status(200).json(resData);
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : category : editCategory : 🐞🐞🐞 : \n ${error}`
    );
  }
};

export {
  addCategory,
  allCategory,
  activeCategory,
  deleteCategory,
  editCategory,
};
