import express from "express"
import { loginController, signupController } from "../controllers/AuthController.js"
import { JWTAuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { dashboardgetController, dashboardpostController } from "../controllers/dashboardControllers.js"
import upload from "../utils/multerconfig.js"
import savecharts from "../controllers/ChartSaveController.js"
import deletecharts from "../controllers/DeleteCharts.js"
import GetCharts from "../controllers/GetCharts.js"
import historyController from "../controllers/historyController.js"
import deleteHistoryController from "../controllers/deleteHistory.js"
import userCheckMiddleware from "../middlewares/userCheckMiddleware.js"
import adminCheckMiddleware from "../middlewares/adminCheckMidlleware.js"
import { adminManagementController,adminInfoManagement } from "../controllers/adminControllers.js"
import { userDeleteController } from "../controllers/adminControllers.js"
import { makeAdminController } from "../controllers/adminControllers.js"

const router = express.Router()

router.get("/", (req,res)=>{
    res.send("Welcome to the dashboard")
})

router.post('/login',loginController);
router.post('/signup', signupController);
router.get('/dashboard', JWTAuthMiddleware,userCheckMiddleware, dashboardgetController)
router.post('/dashboard', JWTAuthMiddleware,userCheckMiddleware, upload.single('excelFile') ,dashboardpostController)
router.post('/savecharts',JWTAuthMiddleware,userCheckMiddleware,savecharts);
router.get('/getcharts',JWTAuthMiddleware,userCheckMiddleware,GetCharts);
router.delete('/deletechart/:id',JWTAuthMiddleware,userCheckMiddleware,deletecharts);
router.get('/history',JWTAuthMiddleware,userCheckMiddleware,historyController)
router.delete('/history/:id', JWTAuthMiddleware,userCheckMiddleware,deleteHistoryController)
router.get('/admin',  JWTAuthMiddleware,adminCheckMiddleware, adminManagementController)
router.get('/adminManagement',JWTAuthMiddleware,adminCheckMiddleware, adminInfoManagement)
router.delete('/adminManagement/:id',JWTAuthMiddleware,adminCheckMiddleware, userDeleteController)
router.put('/makeAdmin/:id',JWTAuthMiddleware,adminCheckMiddleware,makeAdminController )
export default router;