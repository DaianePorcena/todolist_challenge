package com.daianeporcena.todolistchallenge.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
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

    // Método Get para mapear as tarefas por meio de um único id
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTaskById(@PathVariable Long id) {
        Optional<Todo> optionalTodo = todoService.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            return ResponseEntity.ok(todo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}") 
    public List<Todo> update(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return todoService.update(id, updatedTodo); 
    }

    @DeleteMapping("/{id}")
    List<Todo> delete(@PathVariable Long id){
        return todoService.delete(id);
    }
}
