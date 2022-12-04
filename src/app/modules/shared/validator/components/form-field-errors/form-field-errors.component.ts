import { Component, DoCheck, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-errors',
  templateUrl: './form-field-errors.component.html',
  styleUrls: ['./form-field-errors.component.css'],
})
export class FormFieldErrorsComponent implements DoCheck {
  @Input() control!: any;
  errorsList = '';

  private errorMessages = {
    required: () => 'This field is required',
    minlength: (params: any) =>
      'The min number of characters is ' + params.requiredLength,
    maxlength: (params: any) =>
      'The max allowed number of characters is ' + params.requiredLength,
    pattern: (params: any) =>
      'The required pattern is: ' + params.requiredPattern,
    emailValidator: (params: any) => params.message,
  };

  ngDoCheck() {
    this.errorsList = this.getError();
  }

  haveErrors() {
    return (
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  getError() {
    if (this.haveErrors()) {
      const error = Object.keys(this.control.errors!)[0];
      return (this.errorMessages as any)[error](this.control.errors![error]);
    }
  }
}
