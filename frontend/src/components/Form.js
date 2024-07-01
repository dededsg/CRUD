import axios from "axios";
import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 20px;
    align-content: center;
    border: 1px solid #dbdbdb;
    border-radius: 20px;
    margin: 10px;
    flex-direction: column;
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
    border-radius: 20px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
    width: 400px;
    margin-top: 20px;
    box-shadow: 3px 3px 5px #ccc;
`;
const Title = styled.h2`
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`; 
const TitleArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;
const ButtonArea = styled.div`
`;
const InputContainer = styled.div`
    gap: 10px;
    display: flex;
    flex-direction: column;
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
            <TitleArea>  
                <Title>REGISTRO</Title>
            </TitleArea>
            <InputContainer>
                <InputArea>
                    <Input name = "nome" placeholder="Nome" />
                </InputArea>
                <InputArea>
                    <Input name = "sobrenome" placeholder="Sobrenome"/>
                </InputArea>
                <InputArea>
                    <Input name = "cpf" placeholder="CPF" />
                </InputArea>
                <InputArea>
                    <Input name = "email" type="email" placeholder="Email"/>
                </InputArea>
                <InputArea>
                    <Input name = "telefone" placeholder="Telefone" />
                </InputArea>
                <InputArea>
                    <Input name = "senha" type="password" placeholder="Senha"/>
                </InputArea>
            </InputContainer>
            <ButtonArea>
                <Button type="submit">Registrar</Button>
            </ButtonArea>
        </FormContainer>
    );
};

export default Form;