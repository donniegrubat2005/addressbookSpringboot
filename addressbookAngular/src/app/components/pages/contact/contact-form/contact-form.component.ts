import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/components/services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contactId = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });

    this.contactId = this.route.snapshot.params.id;
    if (this.contactId) {
      this.getContact();
    }
  }

  getContact() {
    this.contactService.getContact(this.contactId).subscribe(
      (resp) => {
        this.contactForm.patchValue(resp);
        console.log(resp);
      },
      (error) => {
        alert(error);
      }
    );
  }

  submitContactForm() {
    if (this.contactId) {
      this.updateContact();
    } else {
      this.createContact();
    }
  }

  createContact() {
    this.contactService.save(this.contactForm.value).subscribe((result) => {
      this.router.navigate(['/home/contacts/list']),
        this.toastr.success('Save Successfully!', 'Saved!');
      (error) => {
        this.toastr.error('everything is broken', 'Major Error', {
          timeOut: 3000,
        });
      };
    });
  }

  updateContact() {
    this.contactService.update(this.contactForm.value).subscribe((contact) => {
      contact = contact;
      this.router.navigate(['/home/contacts/list']),
        this.toastr.success('Updated Successfully!', 'Saved!');
      (error) => console.log(error);
    });
  }
}
