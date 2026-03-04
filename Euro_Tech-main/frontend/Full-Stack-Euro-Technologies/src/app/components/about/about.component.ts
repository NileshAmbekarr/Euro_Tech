import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers = [
    { name: 'Kaushal Lahamge', role: 'Strategy and Operation Executive' },
    { name: 'Purva Patil', role: 'Placement Head' },
    { name: 'Aniket Suryawanshi', role: 'CEO & Founder' },
    { name: 'Kaustubh Khairnar', role: 'Trainer' }
  ];
}
