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
            user.sobrenome.value = onEdit.sobrenome;
            user.cpf.value = onEdit.cpf;
            user.email.value = onEdit.email;
            user.telefone.value = onEdit.telefone;
            user.senha.value = onEdit.senha;
            console.log(user.nome);
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // para não recarregar a página

        const user = ref.current; // referencia o formulario

        if ( //verifica se todos tem infos 
            !user.nome.value ||
            !user.sobrenome.value ||
            !user.cpf.value ||
            !user.email.value ||
            !user.telefone.value ||
            !user.senha.value
        ) {
            console.log("Preencha todos os campos")
            return toast.warn("Preencha todos os campos")
        }

        if (onEdit){
            await axios
                .put("https://server-rho-rouge.vercel.app/user/" + onEdit.id, {
                    nome: user.nome.value,
                    sobrenome: user.sobrenome.value,
                    cpf: user.cpf.value,
                    email: user.email.value,
                    telefone: user.telefone.value,
                    senha: user.senha.value,

                },{ witchCredentials: true})
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("https://server-rho-rouge.vercel.app/user/cadastro", {
                    nome: user.nome.value,
                    sobrenome: user.sobrenome.value,
                    cpf: user.cpf.value,
                    email: user.email.value,
                    telefone: user.telefone.value,
                    senha: user.senha.value,

                }, { witchCredentials: true})
                .then(({ data }) => {if(data.error == true){toast.success(data.message) }else{toast.error(data.message)}})
                .catch(({ data }) => toast.error(data));
        }
        user.nome.value = ""; 
        user.sobrenome.value = "";
        user.cpf.value = "";
        user.email.value = ""; 
        user.telefone.value = ""; 
        user.senha.value = ""; 

        setOnEdit(null);
        getUsers(); // atualiza o grid
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>   
            <InputArea>
                <Label>Nome</Label>
                <Input name = "nome" placeholder="nome" />
            </InputArea>
            <InputArea>
                <Label>Sobrenome</Label>
                <Input name = "sobrenome" placeholder="sobrenome"/>
            </InputArea>
            <InputArea>
                <Label>Cpf</Label>
                <Input name = "cpf" placeholder="000.000.000-00" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name = "email" type="email" placeholder="nome@gmail.com"/>
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name = "telefone" placeholder="(48)99123-1234" />
            </InputArea>
            <InputArea>
                <Label>Senha</Label>
                <Input name = "senha" type="password" placeholder="********"/>
            </InputArea>
            <Button type="submit">CADASTRAR</Button>

        </FormContainer>
    );
};

export default Form;