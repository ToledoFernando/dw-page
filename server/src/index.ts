import express from "express";
import cors from "cors";
import {
  searchNameMusic,
  searchTestMusic,
  searchURLMusic,
} from "./controllers/nameControllers";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();

app.use(express.static("public"));

router.post("/name", searchNameMusic);

router.post("/url", searchURLMusic);

router.post("/test", searchTestMusic);

app.use(router);

app.listen(PORT);

console.log(`Server on port ${PORT}`);
