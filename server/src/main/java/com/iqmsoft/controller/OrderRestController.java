package com.iqmsoft.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.iqmsoft.entity.Order;
import com.iqmsoft.exception.ResourceNotFoundException;
import com.iqmsoft.service.OrderService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController // Annotation @RestController is applied to a class to mark it as a request handler, used to create REST web services
@Api(description ="Orders Database CRUD operations")
@RequestMapping("/api")
public class OrderRestController {				
 
	@Autowired
	private OrderService orderService;
	
	public void setBundleService(OrderService orderService) {
		this.orderService = orderService;
	}

	@ApiOperation(value="View available Orders")
	@GetMapping(value="/orders", produces = MediaType.APPLICATION_JSON_VALUE)		//	Get All Orders
	public List<Order> getOrders() {
		List<Order> orders = orderService.retrieveOrders();
		return orders;
	}

	@ApiOperation(value="Add Order to database")			//Add Order 
	@PostMapping("/editOrder")
	public HttpStatus saveOrder(@Valid @RequestBody Order order) {
		orderService.saveOrder(order);
		return HttpStatus.CREATED;
	}

	@ApiOperation(value="Delete Order from database")		//Delete Orders
	@RequestMapping(method = RequestMethod.DELETE, value = "/deleteOrder/{orderId}")
	public void deleteOrder(@PathVariable(name="orderId")Long orderId) throws ResourceNotFoundException {
		orderService.deleteOrder(orderId);
	}
	
	@ApiOperation(value="Find a Order by Id")								// Order Id Find
	@GetMapping("/getOrderById/{FindOrderById}")
	public @ResponseBody Order getOrders(@PathVariable(name="FindOrderById") Long FindOrderById) throws ResourceNotFoundException {
		return orderService.getOrders(FindOrderById);
	}
	
	@ApiOperation(value="Update Order information")		//Update Order	fields
	@PutMapping("/editOrder")
	public ResponseEntity<Order> updateOrder(@Valid @RequestBody Order order) throws ResourceNotFoundException {
		 orderService.updateOrder(order);
		 return new ResponseEntity<Order>(order, HttpStatus.OK);
		 
	}

}