import { db } from '../db.js';

export const getUsers = (req, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = async (req, res) => {

    const q = "INSERT INTO usuarios(`nome`, `sobrenome`, `cpf`, `email`, `telefone`, `senha`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.sobrenome,
        req.body.cpf,
        req.body.email,
        req.body.telefone,
        req.body.senha,
    ];
    const query = 'SELECT * FROM usuarios WHERE `email` = ? OR `cpf` = ?';
    const valor = [req.body.email, req.body.cpf];
    try{
    const [teste] = await db.promise().query(query, valor);
          if (teste.length > 0) {
            console.log("foi não");
            return res.status(200).json({message: "Usuário já existente.", error: false});

          } else {
            db.query(q, [values], (err) => {
                if (err) return res.json(err);
                    console.log("foi");
                    return res.status(200).json({message: "Usuário criado com sucesso.", error: true});

                })
          }
        }catch (err) {
            return res.status(500).json("ERROR");
        }
        };

export const updateUser = (req, res) => {
    const q = "UPDATE usuarios SET `nome` = ?, `sobrenome` = ?, `cpf` = ?, `email` = ?, `telefone` = ?, `senha` = ? WHERE `id` = ?";
    
    const values = [
        req.body.nome,
        req.body.sobrenome,
        req.body.cpf,
        req.body.email,
        req.body.telefone,
        req.body.senha
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err).json("Usuario não atualizado.");

        return res.status(200).json("Usuario atualizado com sucesso.");
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

export const logoutSession = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao fazer logout" });
        }
        console.log("ClearCookie");
        res.clearCookie('session_key'); // Limpa o cookie da sessão
        res.json({ message: "Logout bem-sucedido" });
    });
};



