package com.donniegrubat2005.addressbookSpringboot.services;

import java.util.List;

import com.donniegrubat2005.addressbookSpringboot.models.Contact;

public interface IContactService {

	public List<Contact> getContacts();
	public Contact save(Contact contact);
	public Contact findById(Long id);
	public void delete(Contact contact);
}
