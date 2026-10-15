import express from "express";

let pets = [
  {
    idPet: 1,
    dsNome: "Joana",
    dsEspecie: "Poodle",
    nuIdade: 2,
    fgAdotado: true,
  },
    {
    idPet: 2,
    dsNome: "Carlos",
    dsEspecie: "Pastor Alemao",
    nuIdade: 1,
    fgAdotado: true,
  },
    {
    idPet: 3,
    dsNome: "Rex",
    dsEspecie: "Rotwailer",
    nuIdade: 3,
    fgAdotado: true,
  },
];
const app = express();
app.use(express.json());

app.get("/pets", (req, res) => {
    res.status(200).json(pets);
});

app.get("/pets/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { //caso n seja numero
        return res.status(400).json({
            mensagem: "Deve ser  um numero o id"
        });
    }
    const pet = pets.find(pet => pet.idPet === id);

    if (!pet) {
        return res.status(404).json({mensagem:"Nao foi encontrado o que voce pediu"});
    }
    res.status(200).json(pet);
});

app.post("/pets", (req, res) => {
    const { dsNome, dsEspecie, nuIdade } = req.body;

    if (!dsNome || !dsEspecie) {
        return res.status(400).json({
            mensagem: "Tem dados faltando aí"
        });
    }
    if (nuIdade === undefined ||typeof nuIdade !== "number" ||nuIdade < 0) {
        return res.status(400).json({
            mensagem: "Idade invalida"
        });
    }
    ultimoId++;

    const pet_criado = {
        idPet: ultimoId,
        dsNome: dsNome,
        dsEspecie: dsEspecie,
        nuIdade: nuIdade,
        fgAdotado: false};
    pets.push(pet_criado);
    return res.status(201).json(pet_criado);
});

app.delete("/pets/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {return res.status(400).json({mensagem: "identificador precisa ser um numero"});
    }


    const ind = pets.findIndex(pet => pet.idPet === id);
    if (ind === -1) {
        return res.status(404).send()
    }
    pets.splice(indice, 1)
    return res.status(204).send();
})


app.listen(3000); 