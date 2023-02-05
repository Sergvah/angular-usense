import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

type PassStrength = 'empty' | 'easy' | 'medium' | 'strong';

const hasLetters = (str: string) => /[a-zA-Z]/.test(str);
const hasNumbers = (str: string) => /\d/.test(str);
const hasSymbols = (str: string) => /[^a-zA-Z\d]/.test(str);

const getPassStrength = (pass: string): PassStrength => {
  if (!pass.length) return 'empty';

  const strength = [
    hasLetters(pass),
    hasNumbers(pass),
    hasSymbols(pass),
  ].filter(Boolean).length;

  return strength === 3
    ? 'strong'
    : strength === 2
    ? 'medium'
    : strength === 1
    ? 'easy'
    : 'empty';
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public passwordControl = new FormControl('', [Validators.minLength(8)]);

  public get passStrength() {
    return this.passwordControl.invalid
      ? 'error'
      : getPassStrength(this.passwordControl.value!);
  }
}
