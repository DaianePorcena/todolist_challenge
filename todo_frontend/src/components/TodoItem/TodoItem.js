// TodoItem.js
import React from 'react';
import './TodoItem.css';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

const TodoItem = ({ todo, onEdit, onDelete }) => {
    const { id, title, description, status } = todo;

    const handleEditClick = () => {
        onEdit(todo);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <div className="todo-item">
            <div className='task'>
                <h3 className='title'>{title}</h3>
                <p className='description'>{description}</p>
            </div>
            <div className='status'>
                <p className='statusTitile'>Status:</p>
                <p>{status}</p>
            </div>
            <div className='actions'>
                <button onClick={handleEditClick}>
                    <img src={editIcon} alt='Editar'/>
                </button>
                <button onClick={handleDeleteClick}>
                    <img src={deleteIcon} alt='Excluir'/>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
