import express from "express";
import appRouter from "./routes/index";
import { connect } from "./config/db";
import session from "express-session";
import { passportConfig } from "./config/PassportConfig";
import { env } from "./utils/env";
import passport from "passport";

connect();

const app = express();


app.use(session({secret: env.SESSION_SECRET || '', resave: false, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
const PORT = process.env.PORT || 5000
passportConfig();

app.use("/",appRouter);
app.use(express.json());




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


