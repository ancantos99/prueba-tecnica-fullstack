package com.prueba.tecnica.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.prueba.tecnica.model.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByIdentificacion(String identificacion);
}