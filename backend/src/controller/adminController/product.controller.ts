import { MQ } from "../../common";
import { MODAL } from "../../constant";
import ProductIn from "../../interface/Product.intereface";
import logger from "../../utility/log";
import path from "path";
import fs from "fs";
const getAllProduct = async (page: any, limit: any, search: any) => {
  try {
    search = search.trim() ?? "";
    const totalDos = await MQ.find(MODAL.PRODUCT_MODAL, {
      $or: [
        { name: { $regex: ".*" + search + ".*", $options: "i" } },
        { description: { $regex: ".*" + search + ".*", $options: "i" } },
        // { discount: { $regex: '.*' + search + '.*', $options: 'i' } },
        // { price: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    });
    const allData = await MQ.pagination(
      MODAL.PRODUCT_MODAL,
      {
        $or: [
          { name: { $regex: ".*" + search + ".*", $options: "i" } },
          { description: { $regex: ".*" + search + ".*", $options: "i" } },
          // { discount: { $regex: '.*' + search + '.*'} },
          // { price: { $regex: '.*' + search + '.*', $options: 'i' } },
        ],
      },
      { skip: (page - 1) * limit, limit: limit }
    );
    if (allData && allData.length > 0 && totalDos && totalDos.length > 0) {
      return {
        allProduct: allData,
        maxLimit: Math.ceil(totalDos.length / limit),
      };
    }
    return {
      allProduct: [],
      maxLimit: 0,
    };
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : category : getAllProduct : 🐞🐞🐞 : \n ${error}`
    );
  }
};

const addProduct = async (req: any, res: any) => {
  try {
    if (req.files) {
      req.body.bannerImage = process.env.PRODUCT_BANNER_IMAGE_PATH +"/" +req.files.bannerImage[0].filename;
      let mulImg: any = [];
      if (req.files.mulImage && req.files.mulImage.length > 0) {
        req.files.mulImage.forEach((element: any) => {
          mulImg.push(
            process.env.PRODUCT_MUL_IMAGE_PATH + "/" + element.filename
          );
        });
        req.body.mulImage = mulImg;
      }
      req.body.inStock = true;
      req.body.isActive = true;
      let productData = await MQ.addData(MODAL.PRODUCT_MODAL, req.body);
      if (productData) {
        res.status(200).json({
          message: "product added successfully",
          productData: productData,
        });
      } else {
        return res
          .status(1001)
          .json({ message: "something was wrong try after some time " });
      }
    } else {
      return res
        .status(1001)
        .json({ message: "something was wrong try after some time " });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : product : addProduct : 🐞🐞🐞 : \n ${error}`
    );
  }
};
const activeProduct = async (req: any, res: any) => {
  try {
    const productData = await MQ.findById<ProductIn>(
      MODAL.PRODUCT_MODAL,
      req.params.id
    );
    if (!productData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    let active = productData.isActive ? false : true;

    await MQ.findByIdAndUpdate(MODAL.PRODUCT_MODAL, productData.id, {
      isActive: active,
    });

    let page = req.params.page;
    let limit = req.params.limit;
    let search = req.query.search || "";

    let resData = await getAllProduct(page, limit, search);

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

const inStockProduct = async (req: any, res: any) => {
  try {
    const productData = await MQ.findById<ProductIn>(
      MODAL.PRODUCT_MODAL,
      req.params.id
    );
    if (!productData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    let active = productData.inStock ? false : true;

    await MQ.findByIdAndUpdate(MODAL.PRODUCT_MODAL, productData.id, {
      inStock: active,
    });

    let page = req.params.page;
    let limit = req.params.limit;
    let search = req.query.search || "";

    let resData = await getAllProduct(page, limit, search);

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

const deleteProduct = async (req: any, res: any) => {
  try {
    const product = await MQ.findById<ProductIn>(
      MODAL.PRODUCT_MODAL,
      req.params.id
    );
    if (product) {
      if (product.bannerImage) {
        let img = path.join(__dirname, "../..", product.bannerImage);
        if (  fs.existsSync(img) ) {
          fs.unlinkSync(img);
        }
      }
      if (product.mulImage && product.mulImage.length > 0) {
        product.mulImage.forEach((element: string) => {
          let img = path.join(__dirname, "../..", element);
          if (img&&  fs.existsSync(img)) {
            fs.unlinkSync(img);
          }
        });
      }
      await MQ.findByIdAndDelete(MODAL.PRODUCT_MODAL, req.params.id);

      let page = req.params.page;
      let limit = req.params.limit;
      let search = req.query.search || "";

      let resData = await getAllProduct(page, limit, search);

      if (resData) {
        return res.status(200).json(resData);
      } else {
        return res.status(400).json({ message: "some thing went wrong" });
      }
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : Product : deleteProduct : 🐞🐞🐞 : \n ${error}`
    );
  }
};

const allProduct = async (req: any, res: any) => {
  try {
    let page = req.params.page;
    let limit = req.params.limit;
    let search = req.query.search || "";

    let resData = await getAllProduct(page, limit, search);
    if (resData) {
      return res.status(200).json(resData);
    } else {
      return res.status(400).json({ message: "some thing went wrong" });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : product : allProduct : 🐞🐞🐞 : \n ${error}`
    );
  }
};  
const editProduct = async (req: any, res: any) => {
  try {
    console.log(req.body.inStock);
    console.log(req.body.isActive);

    console.log(req.files)
    console.log( req.body.removeImage)  


    const productData = await MQ.findById<ProductIn>(
      MODAL.PRODUCT_MODAL,
      req.body.product_id
    );
    if (!productData) {
      return res
        .status(400)
        .json({ message: "something was wrong try after some time " });
    }
    if (req.body.removeImage && req.body.removeImage.length > 0) {
      req.body.removeImage.split(",").forEach((element: any, index: any) => {
        const img = path.join(__dirname, '../..', productData.mulImage[element - index]);
        if (fs.existsSync(img)) {
          fs.unlinkSync(img);
        }
        productData.mulImage.splice(element-index, 1);
      });
    }
    if (req.files) {
      if (req.files.bannerImage && req.files.bannerImage[0]) {
        req.body.bannerImage = process.env.PRODUCT_BANNER_IMAGE_PATH + "/" + req.files.bannerImage[0].filename;
        if (productData.bannerImage) {
          let img = path.join(__dirname, '../..', productData.bannerImage);
          if (fs.existsSync(img)) {
            fs.unlinkSync(img);
          }
        }
      } else {
        req.body.bannerImage = productData.bannerImage;
      }
      if (req.files.mulImage && req.files.mulImage.length > 0) {
        req.files.mulImage.forEach((element: any) => {
          productData.mulImage.push(
            process.env.PRODUCT_MUL_IMAGE_PATH + "/" + element.filename
          );
        });
      }
      req.body.mulImage = productData.mulImage;
    } else {
      req.body.bannerImage = productData.bannerImage;
      req.body.mulImage = productData.mulImage;
    }
    req.body.isActive = productData.isActive;
    req.body.inStock = productData.inStock;

    await MQ.findByIdAndUpdate(MODAL.PRODUCT_MODAL, productData.id, req.body);
    let page = req.body.page;
    let limit = req.body.limit;
    let search = req.query.search || "";

    let resData = await getAllProduct(page, limit, search);
    if (resData) {
      return res.status(200).json(resData);
    } else {
      return res.status(400).json({ message: "some thing went wrong" });
    }
  } catch (error) {
    logger.error(
      `CATCH ERROR : IN : product : editProduct : 🐞🐞🐞 : \n ${error}`
    );
  }
};
export { addProduct, activeProduct, deleteProduct, inStockProduct, allProduct ,editProduct};
