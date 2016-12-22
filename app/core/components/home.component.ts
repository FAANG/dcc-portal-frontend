import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './home.component.html',
    styles: [`

div.intro {
  margin-bottom: 20px;
}
img.faang-logo {
  max-width: 100%;
}
@media (max-width: 767px) {
  img.faang-logo {
    width: 300px;
  }
}

    `],
})
export class HomeComponent implements OnInit {
  public constructor(private titleService: Title ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG data portal');
  }
};
