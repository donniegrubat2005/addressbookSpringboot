package com.donniegrubat2005.addressbookSpringboot.serviceimpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.donniegrubat2005.addressbookSpringboot.models.Contact;
import com.donniegrubat2005.addressbookSpringboot.repository.ContactRepository;
import com.donniegrubat2005.addressbookSpringboot.services.IContactService;

@Service(value="contactService")
@Transactional

public class ContactService implements IContactService {

	@Autowired
	private ContactRepository contactRepository;
	
	@Override
	public List<Contact> getContacts() {
		return contactRepository.findAll();
	}

	@Override
	public Contact save(Contact contact) {
		return contactRepository.save(contact);
	}

	@Override
	public Contact findById(Long id) {
		return contactRepository.findById(id).orElse(null);
	}

	@Override
	public void delete(Contact contact) {
		contactRepository.delete(contact);

	}

}
