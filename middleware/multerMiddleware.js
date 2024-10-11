import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  fileName: (req, file, cb) => {
    const fileName = file.originalName;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
