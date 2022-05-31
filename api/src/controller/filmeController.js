import { alterarImagem, inserirFilme } from '../repository/filmeRepository.js';

import multer from 'multer'

import { Router } from 'express'
const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' })


server.post('/filme', async (req, resp) => {
    try {
        const newfilme = req.body;

        if(!newfilme.nome)
           throw new Error('Nome do filme indefinido!, por favor insira um nome ao filme.');

        if(!newfilme.sinopse)
           throw new Error('Sinopse indefinida!, por favor insira a sinopse do filme.');

        if(newfilme.avaliacao == undefined || newfilme.avaliacao < 0)
           throw new Error('Avaliação indefinida!, por favor insira uma avaliação ao filme.');

        if(!newfilme.lancamento)
           throw new Error('Data de lançamento indefinida!, por favor insira um lançamento ao filme.');

        if(!newfilme.disponivel)
           throw new Error('Campo disponível indefinido!');

        if(!newfilme.usuario)
           throw new Error('Usuário não logado');


        const filmePI = await inserirFilme(newfilme);

        resp.send(filmePI);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);
        if (resposta != 1)
            throw new Error('Imagem não salva!');
        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server; 