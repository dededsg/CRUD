import { db } from '../db.js';

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = 
    "INSERT INTO usuarios(`nome`, `email`, `senha`, `telefone`, `empresa`, `uso`, `veiculos`, `conheci`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.senha,
        req.body.telefone,
        req.body.empresa,
        req.body.uso,
        req.body.veiculos,
        req.body.conheci,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso.")
    });
};

export const updateUser = (req, res) => {
    console.log("cgegou");
    const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `senha` = ?, `telefone` = ?, `empresa` = ?, `veiculos` = ? WHERE `id` = ?";
    
    const values = [
        req.body.nome,
        req.body.email,
        req.body.senha,
        req.body.telefone,
        req.body.empresa,
        req.body.veiculos
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuario atualizado com sucesso.")
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";
    db.query(q, [req.params.id], (err) => {      
        if(err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.")
    });
};

export const verificaUser = (req, res) => {
    console.log("chegou verificaUser");
    const q = "SELECT * FROM usuarios WHERE `email` = ? AND `senha` = ?";

    const values = [
        req.body.email,
        req.body.senha,
    ];
    db.query(q, values, (err, data) => {
        console.log("entrou db verificaUser");
        if (err) {
            console.error(err);
            return res.status(500).json("Database query failed.");
        }

        if (data.length == 0) {
            
            res.status(400).json("Login incorreto"); //faz a checagem se tem algum dado no data  
            return;
        }
        
        const senha = data[0].senha; // para conseguir usar aqui, com o indice [0]
        const email = data[0].email; 
        if (senha != req.body.senha && email != req.body.email){
          res.status(400).json("Login incorreto");  
          return;
        }
        
        req.session.user = { nome: data[0].nome, email: data[0].email, id: data[0].id};
        
        return res.status(200).json({mensage: "Login correto.", user: req.session.user});
    });
    
};

export const fetchSession = (req, res) => {
    

    if(req.session.user) {
        res.json({ user: req.session.user});
    } else {
        res.json({ message: "Nenhum usuário logado"});
    }
};



