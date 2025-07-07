package com.luxuryclothes.Luxuryclothes_project.controller;

import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.luxuryclothes.Luxuryclothes_project.entity.Order;
import com.luxuryclothes.Luxuryclothes_project.entity.OrderItem;
import com.luxuryclothes.Luxuryclothes_project.entity.Product;
import com.luxuryclothes.Luxuryclothes_project.entity.User;
import com.luxuryclothes.Luxuryclothes_project.repository.OrderRepository;
import com.luxuryclothes.Luxuryclothes_project.repository.OrderItemRepository;
import com.luxuryclothes.Luxuryclothes_project.repository.ProductRepository;
import com.luxuryclothes.Luxuryclothes_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public PaymentController(@Value("${stripe.secretKey}") String secretKey) {
        Stripe.apiKey = secretKey;
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@RequestBody Map<String, Object> body) {
        try {
            double amount = Double.parseDouble(body.get("amount").toString());
            long amountInCents = (long) (amount * 100);

            // 1. Crear PaymentIntent en Stripe
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("pen")
                    .build();
            PaymentIntent intent = PaymentIntent.create(params);

            // 2. Registrar la orden en la base de datos
            String email = (String) body.get("email");
            List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("items");

            User user = userRepository.findByEmail(email).orElse(null);

            Order order = new Order();
            order.setUser(user);
            order.setOrderDate(LocalDateTime.now());
            order.setTotal(amount);
            order.setStatus("pending");
            // Guardar dirección de envío
            order.setShippingAddress((String) body.get("shippingAddress"));
            order.setShippingCity((String) body.get("shippingCity"));
            order.setShippingDistrict((String) body.get("shippingDistrict"));
            order.setShippingPostalCode((String) body.get("shippingPostalCode"));
            order.setShippingCountry((String) body.get("shippingCountry"));
            order = orderRepository.save(order);

            for (Map<String, Object> item : items) {
                Long productId = Long.valueOf(item.get("productId").toString());
                Integer quantity = Integer.valueOf(item.get("quantity").toString());
                Double price = Double.valueOf(item.get("price").toString());
                Product product = productRepository.findById(productId).orElse(null);

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setProduct(product);
                orderItem.setQuantity(quantity);
                orderItem.setPrice(price);
                orderItemRepository.save(orderItem);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());
            response.put("orderId", order.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}