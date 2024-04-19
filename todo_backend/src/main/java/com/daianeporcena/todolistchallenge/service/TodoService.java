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

    // Filtra todas as tarefas, mas precisa ser revisado.
    public List<Todo> list(){
        Sort sort = Sort.by("id").descending();
        return todoRepository.findAll(sort);
    }


    public List<Todo> create(Todo todo){
        todoRepository.save(todo);
        return list();
    }

    // Endpoint para  atualizar as tarefas pelo id. Precisa realizar alguna ajustes.
    public List<Todo> update(Long id, Todo updatedTodo){  
        Optional<Todo> optionalTodo = todoRepository.findById(id); 
        if (optionalTodo.isPresent()) {
            Todo todoToUpdate = optionalTodo.get(); 
            todoToUpdate.setTitle(updatedTodo.getTitle());
            todoToUpdate.setDescription(updatedTodo.getDescription());
            todoToUpdate.setStatus(updatedTodo.getStatus());
            todoRepository.save(todoToUpdate); 
        }
        return list();
    }

    public List<Todo> delete(Long id){
        todoRepository.deleteById(id);
        return list();
    }

    // Endpoint para filtrar as tarefas pelo id
    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

}
