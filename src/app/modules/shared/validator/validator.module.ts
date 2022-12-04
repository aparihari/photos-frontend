import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailValidatorDirective } from './custom-validators/email-validator/email-validator.directive';
import { FormFieldErrorsComponent } from './components/form-field-errors/form-field-errors.component';

@NgModule({
  declarations: [EmailValidatorDirective, FormFieldErrorsComponent],
  imports: [CommonModule],
  exports: [EmailValidatorDirective, FormFieldErrorsComponent],
})
export class ValidatorModule {}
