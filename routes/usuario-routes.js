
import { Router } from "express";
import bcrypt from "bcrypt";
import sql, { prisma } from "../config/db.js";

const usuarioRoutes = Router()

const selectFields = {
    email: true,
    login: true,
    nome: true
}
  
usuarioRoutes.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        select: selectFields
    })
    res.send(usuarios);
});
  
usuarioRoutes.get("/usuarios/:id", async (req, res) => {

    const id = Number(req.params.id)

    if(!id) { 
        return res.status(400).send({error: "id precisa ser um número"})
    }

    const usuario = await prisma.usuario.findUnique({
        where: {
            id: id
        },
        select: selectFields
    });

    if(usuario) {
        res.send(usuario);
    } else {
        res.sendStatus(404)
    }

});  
  
usuarioRoutes.post("/usuarios", async (req, res) => {

    try {
        const usuario = req.body;

        const senhaEncriptada = await bcrypt.hash(usuario.senha, 10)

        usuario.senha = senhaEncriptada

        await prisma.usuario.create({
            data: usuario  
        })

        res.sendStatus(201) 
    } catch (error) {
        res.status(400).send({error: error.sqlMessage})
    }

});

export { usuarioRoutes };
