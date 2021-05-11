package com.iqmsoft.service;


import java.util.List;

import com.iqmsoft.entity.Order;
import com.iqmsoft.exception.ResourceNotFoundException;

public interface OrderService {
	
	 List<Order> retrieveOrders();
	 void saveOrder(Order order);
	 void deleteOrder(Long orderId) throws ResourceNotFoundException;
	 void updateOrder(Order order);
	 Order getOrders (Long id) throws ResourceNotFoundException;
	
}
