import express from "express";
import appRouter from "./routes/index";
import { connect } from "./config/db";
import path from "path";
import fs from "fs"

connect();

const app = express();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(express.json());
const PORT = process.env.PORT || 5000

app.use("/",appRouter);
app.use(express.json());




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


