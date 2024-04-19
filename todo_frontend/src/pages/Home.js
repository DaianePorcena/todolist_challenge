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
    const [statusFilter, setStatusFilter] = useState('');

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

    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
    };

    const filteredTodos = statusFilter ? todos.filter(todo => todo.status === statusFilter) : todos;

    return (
        <div className='home'>
            <div className='logo'>
                <h1>Todo List</h1>
                <img src={logoIcon} alt='logo'/>
            </div>
            
            <div className='container'>
                <div className="filter-buttons">
                <button className={statusFilter === '' ? 'selected' : ''} onClick={() => handleStatusFilterChange('')}>TODOS</button>
                    <button className={statusFilter === 'NAO_INICIADO' ? 'selected' : ''} onClick={() => handleStatusFilterChange('NAO_INICIADO')}>NAO_INICIADO</button>
                    <button className={statusFilter === 'EM_ANDAMENTO' ? 'selected' : ''} onClick={() => handleStatusFilterChange('EM_ANDAMENTO')}>EM_ANDAMENTO</button>
                    <button className={statusFilter === 'CONCLUIDO' ? 'selected' : ''} onClick={() => handleStatusFilterChange('CONCLUIDO')}>CONCLUÍDO</button>
                </div>

                {filteredTodos.map(todo => (
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
                        <AddTask onAdd={closeModal} onCancel={closeModal} selectedTodo={selectedTodo}/>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Home;
