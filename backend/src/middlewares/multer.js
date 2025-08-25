import multer from "multer";

const storage = multer.memoryStorage();

const singleImage = multer({ storage }).single("file");

export default { singleImage };
