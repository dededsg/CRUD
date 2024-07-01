import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Login from "./components/Login.js";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  margin-top 20px;
  display: flex;
  align-items: center;
  gap: 10px;
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
const Box = styled.div`
    display: flex;
    border-radius: 15px;
    background-color: #fff;
    flex-wrap: wrap;
    justify-content: center;
`;

function App() {
  
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try{
      const res = await axios.get("https://server-rho-rouge.vercel.app/user", { withCredentials:true });
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      console.log("Deu erro meu xapa")
      toast.error(error);
    }
  };

  const handleLogout = async () => {
    try {
        const response = await axios.get("https://server-rho-rouge.vercel.app/user/logout", { withCredentials:true });
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
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      </Container>
      ) : (
      <Container>
        <Box>
          <Login setUser={setUser}/>
          <Form setOnEdit={setOnEdit} getUsers={getUsers}/>
        </Box>
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

