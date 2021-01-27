import { Router } from "http://deno.land/x/oak/mod.ts"
import Controller from "../controllers/controller.ts"
const router = new Router();
// const Router = new Router({prefix:"/user"});

router
.get("/adduser",Controller.addUser)
.get("/getalluser",Controller.getAllUser)
.get("/addbook",Controller.addBook)
.get("/getallbook",Controller.getAllBook)
// .post("/test",Controller.body)
router.get("/searchParams",Controller.searchParams);
router.get("/params/:id/:name",Controller.params);

router.get("/helper/:id/:name",Controller.helper);
router.get("/helper",Controller.helper);

router.post("/body",Controller.body);
router.post("/header",Controller.header);

export default router;