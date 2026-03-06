import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers = [
    { name: 'Kaushal Lahamge', role: 'Strategy and Operation Executive', path:'assets/Kaushal.png' },
    { name: 'Purva Patil', role: 'Placement Head', path:'assets/Purva.jpeg' },
    { name: 'Kaustubh Khairnar', role: 'Trainer', path:'assets/default.png' }
  ];
}
