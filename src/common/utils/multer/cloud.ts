import multer from "multer";
import path from "path";
import { MultersStorge } from "../../enums/multer.enum";

export const uploadFile = ({storageKey=MultersStorge.memoryStorge}:{storageKey:MultersStorge}) => {
    //1  const storage = multer.memoryStorage() >>buffer
    // 2 disk >> object >>path
    const uploadPath = path.resolve("uploads");
    const storage =storageKey == MultersStorge.memoryStorge ?multer.memoryStorage() : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const fileName = Date.now() + "-" + file.originalname;
            cb(null, fileName);
        }
    });
    return multer({storage});
};
