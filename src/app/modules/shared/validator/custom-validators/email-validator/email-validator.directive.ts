import { Directive, Input } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
} from '@angular/forms';

import validator from 'validator';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  @Input('appEmailValidator') emailValidatorValue = '';

  validate(email: FormControl): ValidationErrors | null {
    const message = this.emailValidatorValue
      ? this.emailValidatorValue
      : 'Please enter a valid email';
    const emailValidatorMessage: ValidationErrors = {
      emailValidator: {
        message,
      },
    };

    const result =
      email.value == null || validator.isEmail(email.value)
        ? null
        : emailValidatorMessage;
    return result;
  }
}
