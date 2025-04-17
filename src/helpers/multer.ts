import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

// Configuración de almacenamiento
const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, 'uploads/img/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo
    }
});

// Configuración de multer
const fileFilter = (req: Request, file: any, cb: any) => {
    const validFiles = ["image/png", "image/jpg", "image/jpeg"]
    if(validFiles.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(new Error("Tipo de archivo no permitido"), false)
    }
}
const upload = multer({ storage, fileFilter });

export default upload;