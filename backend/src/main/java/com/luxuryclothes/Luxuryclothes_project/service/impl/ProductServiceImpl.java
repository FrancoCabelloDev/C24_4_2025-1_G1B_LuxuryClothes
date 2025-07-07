package com.luxuryclothes.Luxuryclothes_project.service.impl;

import com.luxuryclothes.Luxuryclothes_project.entity.Product;
import com.luxuryclothes.Luxuryclothes_project.repository.ProductRepository;
import com.luxuryclothes.Luxuryclothes_project.service.ProductService; // ⭐ IMPORTAR LA INTERFAZ
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service // ⭐ TIENE @Service
@Transactional
public class ProductServiceImpl implements ProductService { // ⭐ IMPLEMENTA LA INTERFAZ

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Product> getProductsByBrand(Long brandId) {
        return productRepository.findByBrandId(brandId);
    }

    @Override
    public List<Product> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllProducts();
        }
        return productRepository.findByNameContainingIgnoreCase(query.trim());
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }

    @Override
    public List<Product> getProductsByGender(String gender) {
        return productRepository.findByGenderIgnoreCase(gender);
    }

    @Override
    public List<Product> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }
}
// (Este archivo ya está correcto, no necesitas cambiar nada aquí. Solo asegúrate de que la implementación esté aquí y no en ProductService.java)