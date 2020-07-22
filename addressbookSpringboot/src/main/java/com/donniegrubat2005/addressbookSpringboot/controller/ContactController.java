package com.donniegrubat2005.addressbookSpringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donniegrubat2005.addressbookSpringboot.models.Contact;
import com.donniegrubat2005.addressbookSpringboot.services.IContactService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController

@RequestMapping(path="/api/")
public class ContactController {

	@Autowired
	private IContactService contactService;
	
	@GetMapping(path="contacts")
	public List<Contact> getContacts() {
		return contactService.getContacts();
	}
	
	@GetMapping(path="contacts/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable Long id) {
		Contact contact = contactService.findById(id);
        return ResponseEntity.ok().body(contact);

    }
	
	 @PostMapping(path = "contacts")
	    public Contact create(@RequestBody Contact contact) {
	    	contactService.save(contact);
	        return contact;
	    }

	    @PutMapping(path="contacts/{id}")
	    public ResponseEntity<Contact> update(@PathVariable(value = "id") Long id,
	        @Validated @RequestBody Contact contact) {
	    	contactService.save(contact);
	        return new ResponseEntity<>(HttpStatus.OK);
	    }

	    @DeleteMapping(path="contacts/{id}")
	    public ResponseEntity<Contact> delete(@PathVariable Long id) {
	    	Contact contact = contactService.findById(id);
	    	contactService.delete(contact);
	        return new ResponseEntity<>(HttpStatus.OK);

	    }

}
