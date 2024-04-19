import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from "../components/TodoItem/TodoItem";
import logoIcon from '../assets/logo.svg'
import './Home.css'
const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tasks')
            .then(response => {
                setTodos(response.data);
                console.log(response.data)
                console.log('teste');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleEdit = (todo) => {
        console.log('Edit todo:', todo);
       
    };

    const handleDelete = (id) => {
        console.log('Delete todo with ID:', id);
        
    };

    return (
        <div className='home'>
            <div className='logo'>
            <h2>Todo List</h2>
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

                <button className='addTask'>
                   + ADICIONAR TAREFA
                </button>
            </div>


            
        </div>
    );
}

export default Home;