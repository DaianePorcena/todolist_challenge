import React, { useState } from 'react';
import './AddTask.css'
import axios from 'axios';

const AddTask = ({ onAdd, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NAO_INICIADO'); // Estado para armazenar o status da tarefa

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

        axios.post('http://localhost:8080/tasks', newTask)
            .then(response => {
                // Chamando a função onAdd passada como prop para atualizar a lista de tarefas
                onAdd(response.data);
                // Resetando os campos do formulário após a adição da tarefa
                setTitle('');
                setDescription('');
                setStatus('NAO_INICIADO'); // Resetando o status para o padrão
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
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
