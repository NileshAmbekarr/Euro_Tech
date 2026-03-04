import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedTab = 'all';
  
  stats = [
    { icon: 'fas fa-briefcase', value: 0, target: 95, label: 'Placement Rate', suffix: '%' },
    { icon: 'fas fa-building', value: 0, target: 100, label: 'Partner Companies', suffix: '+' },
    { icon: 'fas fa-star', value: 4.8, target: 4.8, label: 'Average Rating', suffix: '/5' }
  ];

  allCourses = [
    {
      title: 'Full Stack Web Development',
      duration: '6 Months',
      price: 49999,
      rating: 4.8,
      students: 2000,
      icon: 'fas fa-code',
      category: 'fullstack'
    },
    {
      title: 'MERN Stack Development',
      duration: '4 Months',
      price: 39999,
      rating: 4.7,
      students: 1500,
      icon: 'fas fa-layer-group',
      category: 'mern'
    },
    {
      title: 'Frontend Development',
      duration: '3 Months',
      price: 29999,
      rating: 4.9,
      students: 1800,
      icon: 'fas fa-palette',
      category: 'frontend'
    },
    {
      title: 'AI / ML Fundamentals',
      duration: '5 Months',
      price: 54999,
      rating: 4.9,
      students: 1600,
      icon: 'fas fa-brain',
      category: 'aiml'
    }
  ];

  get featuredCourses() {
    return this.allCourses.slice(0, 3);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  getFilteredCourses() {
    if (this.selectedTab === 'all') {
      return this.allCourses;
    }
    return this.allCourses.filter(course => course.category === this.selectedTab);
  }

  ngOnInit() {
    this.animateCounters();
  }

  animateCounters() {
    this.stats.forEach((stat, index) => {
      if (stat.target !== stat.value) {
        const duration = 2000;
        const increment = stat.target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            stat.value = stat.target;
            clearInterval(timer);
          } else {
            stat.value = Math.ceil(current);
          }
        }, 16);
      }
    });
  }
}
