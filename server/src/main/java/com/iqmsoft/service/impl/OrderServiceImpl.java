package com.iqmsoft.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.iqmsoft.entity.Order;
import com.iqmsoft.exception.ResourceNotFoundException;
import com.iqmsoft.repository.OrderRepository;
import com.iqmsoft.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;


@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepository;

	public void setBundleRepository(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}
	 
	public List<Order> retrieveOrders() {						//	Get All Orders
		List<Order> orders = orderRepository.findAll();
		return orders;
	}
 
	public Order getOrders(Long id) throws ResourceNotFoundException {	// Order Id Find
		Optional<Order> optEmp = orderRepository.findById(id);
		if (!optEmp.isPresent()) {
			throw new ResourceNotFoundException();
		}else return optEmp.get();
	}
	
	public void saveOrder (Order order){						//Order Create
	  
	  orderRepository.save(order);
	}
	
	public void  deleteOrder(Long orderId) throws ResourceNotFoundException{	//Order Delete
		Optional<Order> optEmp = orderRepository.findById(orderId);
		if (!optEmp.isPresent()) {
			throw new ResourceNotFoundException();
		}
		else orderRepository.deleteById(orderId);
	}
	
 	public void updateOrder(Order order) {				//Order Update	
 		 orderRepository.save(order);
	}

}