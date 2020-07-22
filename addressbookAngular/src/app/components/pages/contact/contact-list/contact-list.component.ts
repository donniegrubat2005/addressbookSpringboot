import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ContactService } from 'src/app/components/services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  //this is for data tables configuration
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  rowData = [];
  contactList: any;
  isDtInitialized: boolean = false;

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.LoadDatatable();
    this.loadContactList();
  }

  loadContactList() {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.rowData = this.contactList = data;
        //this.dtTrigger.next();
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      },
      (error) => {
        //this.alertService.error("Unable to load email template.");
        console.log(error);
      }
    );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  LoadDatatable() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      processing: true,
      info: true,
      dom: "<'myfilter'f><'mylength'l>tp",
    };
  }

  edit(id: number) {
    this.router.navigate(['/home/contacts/' + id + '/edit']);
  }

  remove(contact: any): void {
    this.contactService.delete(contact.id).subscribe((res) => {
      this.toastr.warning('Deleted successfully!', 'Deleted!');
      this.loadContactList();
    });
  }
}
