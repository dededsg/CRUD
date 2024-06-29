import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Login from "./components/Login.js";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SpeedInsights } from "@vercel/speed-insights/next"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  margin-top: 20px;
`; 

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

function App() {
  
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800/user", { withCredentials:true });
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      console.log("Deu erro meu xapa")
      toast.error(error);
    }
  };

  const handleLogout = async () => {
    try {
        const response = await axios.get("http://localhost:8800/user/logout", { withCredentials:true });
        setUser(null); // Remove o usuário do estado após logout
        console.log(response.data.message); // "Logout bem-sucedido"
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
};

  useEffect(() => {
    console.log(user)
    getUsers();
  }, [setUsers, user, setUser]);

  
  return (
    <>
     { user ? (
      <Container>
        <Button onClick={handleLogout}>Logout</Button>
        <Title>CADASTRO</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      </Container>
      ) : (
        <Container>
        <Title>LOGIN</Title>
        <Login setUser={setUser}/>
        <Form setOnEdit={setOnEdit} getUsers={getUsers}/>
      </Container>
      )}
      <ToastContainer 
        autoClose={3000}
      />
      <GlobalStyle/>
    </>
  );
}

export default App;

