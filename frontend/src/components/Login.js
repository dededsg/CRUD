import axios from "axios";
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";

const LoginContainer = styled.form`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 20px;
    width: 400px;
    height: 550px;
    align-content: center;
    border: 1px solid #dbdbdb;
    border-radius:20px ;
    margin:10px ;
    
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

const Login = ({ setUser }) => {
    const ref = useRef();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get('https://server-rho-rouge.vercel.app/user/check-session', { withCredentials: true });
                if (response.data.user){
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Erro ao verificar a sessão:', error);
            }
        };

        fetchSession();
    }, [setUser])

    const handleSubmit = async (e) => {
        e.preventDefault(); // para não recarregar a página

        const user = ref.current; // referencia o login

        if ( //verifica se todos tem infos 
            !user.email.value || !user.senha.value
        ) {
            return toast.warn("Preencha todos os campos")
        } else {
            try {
                const response = await axios.post("https://server-rho-rouge.vercel.app/user/login", {
                    email: user.email.value,
                    senha: user.senha.value,
                },{ withCredentials: true});
                console.log("response.data")
                console.log(response.data);
                toast.success(response.data.message);
                setUser(response.data.user);
            } catch (error) {
                toast.error("Erro ao fazer login");
                console.error(error.response ? error.response.data : error.message);
            }
        }       
    }
    return (
        <LoginContainer ref={ref} onSubmit={handleSubmit}>   
        <Title>LOGIN</Title>

            <InputArea>
                <Input name = "email" type="email" placeholder="Email"/>
            </InputArea>        
            <InputArea>
                <Input name = "senha" type="password" placeholder="Senha"/>
            </InputArea>

            <Button type="submit">Entrar</Button>

        </LoginContainer>
    );

};
export default Login;