import React, { useState, useEffect } from 'react';
import './AddTask.css'
import axios from 'axios';

const AddTask = ({ onAdd, onCancel, selectedTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NAO_INICIADO'); // Estado para armazenar o status da tarefa

    useEffect(() => {
        if (selectedTodo) {
            setTitle(selectedTodo.title);
            setDescription(selectedTodo.description);
            setStatus(selectedTodo.status);
        }
    }, [selectedTodo]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleCancel = () => { // Função para fechar o modal quando clicar em cancelar
        onCancel();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTask = {
            title: title,
            description: description,
            status: status // Usando o status selecionado pelo usuário
        };

        if (selectedTodo) {
            // Função para verificar se está em modo de ediçã e enviar uma requisição PUT
            axios.put(`http://localhost:8080/tasks/${selectedTodo.id}`, newTask)
                .then(response => {
                    onAdd(response.data);
                    setTitle('');
                    setDescription('');
                    setStatus('NAO_INICIADO');
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                });
        } else {
            // Caso contrário, uma requisição POST será enviada para adicionar uma nova tarefa
            axios.post('http://localhost:8080/tasks', newTask)
                .then(response => {
                    onAdd(response.data);
                    setTitle('');
                    setDescription('');
                    setStatus('NAO_INICIADO');
                })
                .catch(error => {
                    console.error('Error adding task:', error);
                });
        }
        
    };

    return (
        <div className='modalForm'>
            <h3>Adicione uma nova tarefa</h3>
            <form  className='form' onSubmit={handleSubmit}>
                <div className='taskTitle'>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Digite um título"
                        required
                    />
                </div>
                <div className='taskDescription'>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder='Informe uma descrição'
                        required
                    ></textarea>
                </div>
                <div className='taskStatus'>
                    <label htmlFor="status">Status:</label>
                    <select id="status" value={status} onChange={handleStatusChange}>
                        <option value="NAO_INICIADO">Não Iniciado</option>
                        <option value="EM_ANDAMENTO">Em Andamento</option>
                        <option value="CONCLUIDO">Concluído</option>
                    </select>
                </div>
                <div className='submit'>
                    <button className='cancel' type="button" onClick={handleCancel}>CANCELAR</button>
                    <button className='save' type="submit">SALVAR</button>
                </div>
                
            </form>
        </div>
    );
};

export default AddTask;
