import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './uploads/')
      },

      filename: (req,file,cb)=>{
        cb(null,  new Date().toISOString().replace(/:/g, '-') + file.originalname)
      }
});

export const upload = multer({storage:storageConfig});