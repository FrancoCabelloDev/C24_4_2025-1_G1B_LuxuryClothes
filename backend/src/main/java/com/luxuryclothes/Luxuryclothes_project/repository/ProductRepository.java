package com.luxuryclothes.Luxuryclothes_project.repository;

import com.luxuryclothes.Luxuryclothes_project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByBrandId(Long brandId);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByGenderIgnoreCase(String gender);
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
}