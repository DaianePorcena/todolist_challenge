package com.daianeporcena.todolistchallenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daianeporcena.todolistchallenge.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{
    
}
