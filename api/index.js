import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";
import session from "express-session";
import { db } from "./db.js";

db.connect(err => {
  if(err) {
    console.error("Error connecting to", err.stack);
    return;
  }
  console.log("Deu certo a conexão", db.threadId);
})

const app = express();
const PORT = "8800"; //define a porta do localhost


app.use(cors({
  origin: "https://client-ten-zeta-20.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(session({
  key: 'session_key',
  secret: 'seu_segredo_aqui', 
  resave: false,
  saveUninitialized: true, 
  cookie: { secure: false }
}));
app.use("/user", userRoutes)

app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
}) 



  



