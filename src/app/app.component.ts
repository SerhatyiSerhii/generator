import { AfterViewInit, ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public maxLength: number = 5;
  public position: number = 0;
  public stringPickChar: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  public generatedString: string = 'Generated string';
  public source: Observable<number> = interval(3000);

  @ViewChild('igenerator') generator: ElementRef;

  ngAfterViewInit() {

    this.source.subscribe(() => {

      this.position = 0;
      this.generatedString = '';
      this.generator.nativeElement.style.color = 'black'
      this.generator.nativeElement.style.backgroundColor = '#d8d8d8';

      while (this.position < this.maxLength) {
        this.generatedString += this.stringPickChar[Math.floor(Math.random() * this.stringPickChar.length)];
        this.position++;
      }

      const generatedLoverCase = this.generatedString.toLowerCase();
      const generatedLoverCaseReverse = generatedLoverCase.split('').reverse().join('');

      this.generator.nativeElement.textContent = this.generatedString;

      if (generatedLoverCase == generatedLoverCaseReverse) {
        this.generator.nativeElement.style.color = 'red'
      }

      if (!isNaN(+this.generatedString)) {
        this.generator.nativeElement.style.color = 'blue'
      }

      if (this.generatedString.includes('0')) {
        this.generator.nativeElement.textContent = '';
        this.generator.nativeElement.style.backgroundColor = 'white';
      }
    });
  }
}
