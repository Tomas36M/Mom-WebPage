import { Router } from "express";
import userRoutes from "./userRoutes";
import appointmentRoutes from "./appointmentRoutes";
import productRouter from "./productRoutes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/products", productRouter)

export default router;
