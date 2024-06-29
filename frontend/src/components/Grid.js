import React from 'react';
import axios from "axios"; //api
import styled from 'styled-components';
import { FaTrash, FaEdit } from "react-icons/fa"
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px 0px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px){
    ${(props) => props.onlyWeb && "display: none;"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px){
    ${(props) => props.onlyWeb && "display: none;"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {


    const handleEdit = (item) => {
        setOnEdit(item);  
    };


    const handleDelete = async(id) => { 
        console.log("chegou delete");
        await axios
            .delete("http://localhost:8800/user/" + id)
            .then(({ data }) => {                   //validação
                const newArray = users.filter((user) => user.id !== id);
                console.log("chegou delete");
                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
        setOnEdit(null);
    };

   
    const thStyle = { minWidth: '120px' };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th style={thStyle}>Nome</Th>
                    <Th style={thStyle}>Email</Th>
                    <Th style={thStyle}>Senha</Th>
                    <Th style={thStyle}>Telefone</Th>
                    <Th style={thStyle}>Empresa</Th>
                    <Th style={thStyle}>Tipo de Uso</Th>
                    <Th style={thStyle}>Veículos</Th>
                    <Th style={thStyle}>Conheceu por</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item) => (
                    <Tr key={item.id}>
                        <Td>{item.nome}</Td>
                        <Td>{item.email}</Td>
                        <Td>{item.senha}</Td>
                        <Td>{item.telefone}</Td>
                        <Td>{item.empresa}</Td>
                        <Td>{item.uso}</Td>
                        <Td>{item.veiculos}</Td>
                        <Td>{item.conheci}</Td>
                        <Td align="center">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td align="center">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;