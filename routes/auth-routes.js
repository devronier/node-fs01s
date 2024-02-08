
import { Router } from "express";
import bcrypt from "bcrypt"
import sql from "../config/db.js";

const authRoutes = Router();

authRoutes.post("/auth/login", async (req, res) => {
    const loginUsuario = req.body;
    
    const resposta = await sql`SELECT * FROM USUARIO WHERE email = '${loginUsuario.email}'`;
    
    if (resposta.length && await bcrypt.compare(loginUsuario.senha, resposta[0].senha)) {
    
        const usuario = resposta[0]
    
        delete usuario.senha
    
        res.send(usuario);
    } else {
        res.status(401).send("Não autorizado");
    }
});

export { authRoutes } 