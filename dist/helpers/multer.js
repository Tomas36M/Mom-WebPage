"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Configuración de almacenamiento
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/img/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo
    }
});
// Configuración de multer
const fileFilter = (req, file, cb) => {
    const validFiles = ["image/png", "image/jpg", "image/jpeg"];
    if (validFiles.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Tipo de archivo no permitido"), false);
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
