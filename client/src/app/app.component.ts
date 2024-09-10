import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { hello } from '@mean-docker/shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';

  ngOnInit() {
    hello();
  }
}
