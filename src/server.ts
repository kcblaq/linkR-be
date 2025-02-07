import express from "express";
import appRouter from "./routes/index";
import { connect } from "./config/db";

connect();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000

app.use("/",appRouter);
app.use(express.json());




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


