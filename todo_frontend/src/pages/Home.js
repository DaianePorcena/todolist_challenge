import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from "../components/TodoItem/TodoItem";
import AddTask from "../components/AddTask/AddTask";
import logoIcon from '../assets/logo.svg';
import './Home.css';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:8080/tasks')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/tasks/${id}`)
            .then(() => {
                // Atualiza a lista de tarefas após deletar a tarefa
                fetchTodos();
                console.log('Tarefa deletada com sucesso');
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchTodos(); // Atualiza a lista de tarefas após fechar o modal
    };

    return (
        <div className='home'>
            <div className='logo'>
                <h1>Todo List</h1>
                <img src={logoIcon} alt='logo'/>
            </div>
            
            <div className='container'>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}

                <button className='addTask' onClick={openModal}>
                   + ADICIONAR TAREFA
                </button>

                {isModalOpen && <div className="modal">
                    <div className="modal-content">
                        {/* <span className="close" onClick={closeModal}>&times;</span> */}
                        <AddTask onAdd={closeModal} onCancel={closeModal} selectedTodo={selectedTodo}/>
                    </div>

                    
                </div>}
            </div>
        </div>
    );
}

export default Home;
