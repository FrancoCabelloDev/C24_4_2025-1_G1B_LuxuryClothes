package com.luxuryclothes.Luxuryclothes_project.service;

import com.luxuryclothes.Luxuryclothes_project.entity.Product;
import java.util.List;
import java.util.Optional;

// ⚠️ INTERFACE - SIN @Service
public interface ProductService {
    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    List<Product> getProductsByCategory(Long categoryId);
    List<Product> getProductsByBrand(Long brandId);
    List<Product> searchProducts(String query);
    Product saveProduct(Product product);
    void deleteProduct(Long id);
    boolean existsById(Long id);
    List<Product> getProductsByGender(String gender);
    List<Product> getProductsByPriceRange(Double minPrice, Double maxPrice);
}