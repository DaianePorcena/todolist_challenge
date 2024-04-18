package com.daianeporcena.todolistchallenge.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daianeporcena.todolistchallenge.entity.Todo;
import com.daianeporcena.todolistchallenge.service.TodoService;

@RestController
@RequestMapping("/tasks")
public class TodoController {
    
    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    List<Todo> create(@RequestBody Todo todo){
        return todoService.create(todo);
    }

    @GetMapping
    List<Todo> list(){
        return todoService.list();
    }

    @PutMapping("/{id}") 
    public List<Todo> update(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return todoService.update(id, updatedTodo); // Passe o id e a tarefa atualizada para o serviço
    }

    @DeleteMapping("/{id}")
    List<Todo> delete(@PathVariable Long id){
        return todoService.delete(id);
    }
}
