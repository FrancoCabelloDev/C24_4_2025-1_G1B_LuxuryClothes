package com.luxuryclothes.Luxuryclothes_project.repository;

import com.luxuryclothes.Luxuryclothes_project.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
