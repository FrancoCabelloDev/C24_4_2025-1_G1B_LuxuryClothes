package com.luxuryclothes.Luxuryclothes_project.repository;

import com.luxuryclothes.Luxuryclothes_project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Puedes agregar métodos personalizados si lo necesitas
}
