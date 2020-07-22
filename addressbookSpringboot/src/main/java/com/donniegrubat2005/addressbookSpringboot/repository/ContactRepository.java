package com.donniegrubat2005.addressbookSpringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.donniegrubat2005.addressbookSpringboot.models.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {

}
