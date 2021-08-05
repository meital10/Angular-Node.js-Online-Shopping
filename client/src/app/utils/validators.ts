import { FormGroup,FormControl } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
export function validateCreditCard(c: FormControl) {
    const VISA_REGEX = /^4[0-9]{12}(?:[0-9]{3})?$/; // Regular Expression 1
    const MASTERCARD_REGEX = /^5[1-5][0-9]{14}$/; // Regular Expression 2
    const AMEX_REGEX = /^3[47][0-9]{13}$/; // Regular Expression 3
    return (VISA_REGEX.test(c.value) || MASTERCARD_REGEX.test(c.value) || AMEX_REGEX.test(c.value)) ? null : {
      validateInput: {
        valid: false
      }
    };
  }
