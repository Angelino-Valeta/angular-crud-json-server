import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "Hello World"

  handleClick(){
    // to do
  }

  duplicateNumber(n: number){
    return n * 2
  }

}
