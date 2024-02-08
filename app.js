import cors from "cors";
import 'dotenv/config';
import express from "express";
import { usuarioRoutes } from "./routes/usuario-routes.js";
import { authRoutes } from "./routes/auth-routes.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use(authRoutes)
server.use(usuarioRoutes)

server.listen(8080, () => console.log("Estou rodando"));
