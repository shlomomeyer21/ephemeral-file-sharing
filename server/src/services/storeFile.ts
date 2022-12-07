import multer from "@koa/multer";
import { Middleware, DefaultState, DefaultContext } from "koa";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './memes')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage });

export default function multerUploadImage(): Middleware<DefaultState, DefaultContext, any>{
    return upload.single('image');
}