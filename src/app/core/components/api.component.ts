import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './api.component.html',
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
export class ApiComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
};
