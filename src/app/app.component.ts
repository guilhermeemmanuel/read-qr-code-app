import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readEnable = false;
  lastDetection = 0;

  TIME_TO_DETECT = 3000;
  TIME_TO_SHOW_SNACK = 2000;

  constructor(private snackBar: MatSnackBar) {
  }

  private startCamera(): void {
    this.readEnable = true;
  }

  private stopCamera(): void {
    this.readEnable = false;
  }

  private camerasFoundHandler(event): void {
    console.log(event)
    console.log('Camera Found');
  }

  private camerasNotFoundHandler(event: Event): void {
    console.log('Camera Not Found');
  }

  private scanSuccessHandler(message): void {
    const timestamp = new Date().getTime()
    if (timestamp - this.lastDetection > this.TIME_TO_DETECT) {
      this.lastDetection = timestamp;
      this.snackBar.open('QR Code message: ' + message, 'OK!', {
        duration: this.TIME_TO_SHOW_SNACK,
      });
    }
  }

  private scanErrorHandler(event): void {
    this.readEnable = false;
    this.snackBar.open('Erro de leitura detectado. Posicione melhor o QR Code e tente novamente!', 'OK!', {
      duration: this.TIME_TO_SHOW_SNACK,
    });
  }


}
