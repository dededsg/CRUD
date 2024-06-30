import axios from "axios";
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";

const LoginContainer = styled.form`
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

            <InputArea>
                <Label>E-mail</Label>
                <Input name = "email" type="email" placeholder="nome@gmail.com"/>
            </InputArea>        
            <InputArea>
                <Label>Senha</Label>
                <Input name = "senha" type="password" placeholder="********"/>
            </InputArea>

            <Button type="submit">LOGIN</Button>

        </LoginContainer>
    );

};
export default Login;