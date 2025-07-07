package com.luxuryclothes.Luxuryclothes_project.controller;

import com.luxuryclothes.Luxuryclothes_project.entity.Product;
import com.luxuryclothes.Luxuryclothes_project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            
            // Procesar URLs de imágenes
            products.forEach(product -> {
                if (product.getImage() != null && !product.getImage().isEmpty()) {
                    String imageUrl = processImageUrl(product.getImage());
                    product.setImage(imageUrl);
                }
            });
            
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        try {
            Optional<Product> product = productService.getProductById(id);
            if (product.isPresent()) {
                Product prod = product.get();
                if (prod.getImage() != null && !prod.getImage().isEmpty()) {
                    String imageUrl = processImageUrl(prod.getImage());
                    prod.setImage(imageUrl);
                }
                return ResponseEntity.ok(prod);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long categoryId) {
        try {
            List<Product> products = productService.getProductsByCategory(categoryId);
            
            // Procesar URLs de imágenes
            products.forEach(product -> {
                if (product.getImage() != null && !product.getImage().isEmpty()) {
                    String imageUrl = processImageUrl(product.getImage());
                    product.setImage(imageUrl);
                }
            });
            
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<Product>> getProductsByBrand(@PathVariable Long brandId) {
        try {
            List<Product> products = productService.getProductsByBrand(brandId);
            
            // Procesar URLs de imágenes
            products.forEach(product -> {
                if (product.getImage() != null && !product.getImage().isEmpty()) {
                    String imageUrl = processImageUrl(product.getImage());
                    product.setImage(imageUrl);
                }
            });
            
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        try {
            List<Product> products = productService.searchProducts(query);
            
            // Procesar URLs de imágenes
            products.forEach(product -> {
                if (product.getImage() != null && !product.getImage().isEmpty()) {
                    String imageUrl = processImageUrl(product.getImage());
                    product.setImage(imageUrl);
                }
            });
            
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Procesa la URL de la imagen para que sea accesible desde el frontend
     */
    private String processImageUrl(String imagePath) {
        if (imagePath == null || imagePath.isEmpty()) {
            return null;
        }
        
        // Si ya es una URL completa, devolverla tal como está
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }

        // Si la imagen viene de Django (media/products/...), servirla desde /media/
        if (imagePath.startsWith("products/") || imagePath.startsWith("media/products/")) {
            return "http://localhost:8084/media/" + imagePath.replace("media/", "");
        }

        // Si es solo el nombre del archivo, agregar la ruta completa
        if (!imagePath.startsWith("/")) {
            return "http://localhost:8084/media/products/" + imagePath;
        }

        return "http://localhost:8084" + imagePath;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product savedProduct = productService.saveProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        try {
            if (!productService.getProductById(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
            product.setId(id);
            Product updatedProduct = productService.saveProduct(product);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            if (!productService.getProductById(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
            productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}