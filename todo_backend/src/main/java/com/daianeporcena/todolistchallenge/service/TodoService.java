package com.daianeporcena.todolistchallenge.service;

import java.util.Optional;
import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Sort;
import com.daianeporcena.todolistchallenge.entity.Todo;
import com.daianeporcena.todolistchallenge.repository.TodoRepository;

@Service
public class TodoService {

    private TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> list(){
        Sort sort = Sort.by("id").descending();
        return todoRepository.findAll(sort);
    }


    public List<Todo> create(Todo todo){
        todoRepository.save(todo);
        return list();
    }

    
    public List<Todo> update(Long id, Todo updatedTodo){ // Corrija a assinatura do método para incluir o parâmetro 'id'
    Optional<Todo> optionalTodo = todoRepository.findById(id); // Adicione o parâmetro 'id' ao método 'findById'
    if (optionalTodo.isPresent()) {
        Todo todoToUpdate = optionalTodo.get(); // Renomeie a variável para evitar conflito de nomes
        todoToUpdate.setTitle(updatedTodo.getTitle());
        todoToUpdate.setDescription(updatedTodo.getDescription());
        todoToUpdate.setStatus(updatedTodo.getStatus());
        todoRepository.save(todoToUpdate); // Use a instância atualizada da tarefa
    }
    return list();
}

    public List<Todo> delete(Long id){
        todoRepository.deleteById(id);
        return list();
    }
}
