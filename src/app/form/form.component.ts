import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  contactForm = new FormGroup ({
    firstName: new FormControl(),
    lastName: new FormControl(),
    message: new FormControl(),
    emailAddress: new FormControl(),
  });

  formMessage = 'Fill up the form';
  sendMail() {
    this.contactForm.reset();
    setTimeout(function() {
      this.formMessage = 'Email Sent!';
    }, 500);
    setTimeout(function() {
      this.formMessage = 'Fill up the form';
    }, 2000);

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    this.http.post('/send-mail', JSON.stringify(this.contactForm.value), {
    headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
