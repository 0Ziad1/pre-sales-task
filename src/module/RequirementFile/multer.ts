import multer from "multer";

const storage = multer.diskStorage({
    filename: (_req, file, cb) => {
        cb(null,Date.now()+'-'+file.originalname);
    }
    , destination: (
        req,
        file,
        cb
    ) => {
        cb(null, "uploads/");
    },
});
const allowedTypes = [
    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "text/plain",
];
export const upload = multer({
    storage,

    limits: {
        fileSize:
            5 * 1024 * 1024,
    },

    fileFilter(
        req,
        file,
        cb
    ) {
        if (
            !allowedTypes.includes(
                file.mimetype
            )
        ) {
            return cb(
                new Error(
                    "Only pdf, docx and txt files are allowed."
                )
            );
        }

        cb(null, true);
    },
});
