import axios from "axios";
import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    flex-direction: column;
    width: 400px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 380px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) { // condição para verificar se tem item de edição e substitui valores do formulario para edição
            const user = ref.current;
            console.log(onEdit);
            
            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.senha.value = onEdit.senha;
            user.telefone.value = onEdit.telefone;
            user.empresa.value = onEdit.empresa;
            user.uso.value = onEdit.uso;
            user.veiculos.value = onEdit.veiculos;
            user.conheci.value = onEdit.conheci;
            console.log(user.nome);
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // para não recarregar a página

        const user = ref.current; // referencia o formulario

        if ( //verifica se todos tem infos 
            !user.nome.value ||
            !user.email.value ||
            !user.senha.value ||
            !user.telefone.value ||
            !user.empresa.value ||
            !user.uso.value ||
            !user.veiculos.value ||
            !user.conheci.value
        ) {
            console.log("Preencha todos os campos")
            return toast.warn("Preencha todos os campos")
            
        }

        if (onEdit){
            await axios
                .put("http://localhost:8800/user/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    senha: user.senha.value,
                    telefone: user.telefone.value,
                    empresa: user.empresa.value,
                    veiculos: user.veiculos.value,
                    conheci: user.conheci.value,
                },{ witchCredentials: true})
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800/user/cadastro", {
                    nome: user.nome.value,
                    email: user.email.value,
                    senha: user.senha.value,
                    telefone: user.telefone.value,
                    empresa: user.empresa.value,
                    uso: user.uso.value,
                    veiculos: user.veiculos.value,
                    conheci: user.conheci.value,
                }, { witchCredentials: true})
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.nome.value = ""; 
        user.email.value = ""; 
        user.senha.value = ""; 
        user.telefone.value = ""; 
        user.empresa.value = ""; 
        user.uso.value = ""; 
        user.veiculos.value = ""; 
        user.conheci.value = "";

        setOnEdit(null);
        getUsers(); // atualiza o grid
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>   
            <InputArea>
                <Label>Nome</Label>
                <Input name = "nome" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name = "email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Senha</Label>
                <Input name = "senha" type="password"/>
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name = "telefone" />
            </InputArea>
            <InputArea>
                <Label>Empresa</Label>
                <Input name = "empresa" />
            </InputArea>
            <InputArea>
                <Label>Tipo de Uso</Label>
                <Input name = "uso" />
            </InputArea>
            <InputArea>
                <Label>Veículos</Label>
                <Input name = "veiculos" />
            </InputArea>
            <InputArea>
                <Label>Conheceu por</Label>
                <Input name = "conheci" />
            </InputArea>

            <Button type="submit">CADASTRAR</Button>

        </FormContainer>
    );
};

export default Form;