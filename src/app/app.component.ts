import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

type PassStrength = 'empty' | 'easy' | 'medium' | 'strong';

// RegExp.prototype.test()
//  Функция для поиска сопоставления только букв в указанной строке. Возвращает true или false
const hasLetters = (str: string) => /[a-zA-Z]/.test(str);

// RegExp.prototype.test()
//  Функция для поиска сопоставления только цифр в указанной строке. Возвращает true или false
const hasNumbers = (str: string) => /\d/.test(str);

// RegExp.prototype.test()
//  Функция для поиска сопоставления только символов в указанной строке. Возвращает true или false
const hasSymbols = (str: string) => /[^a-zA-Z\d]/.test(str);

// Функция на проверку введеного текста - "pass"
const getPassStrength = (pass: string): PassStrength => {
  //  Если текст пустой возвращаем "empty"
  if (!pass.length) return 'empty';
  // Создаем массив и проверяем сколько введено символов и каких
  const strength = [
    hasLetters(pass),
    hasNumbers(pass),
    hasSymbols(pass),
  ].filter(Boolean).length;
  // Возвращаем строку на основе введенных данных. Если во всех трех есть символы тогда "strong" и тд
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
