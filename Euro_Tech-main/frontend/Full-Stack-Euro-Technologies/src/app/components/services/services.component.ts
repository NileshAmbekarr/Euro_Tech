import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    { 
      icon: 'fas fa-laptop-code', 
      title: 'Full Stack Development', 
      benefit: 'Become a job-ready full stack developer using modern technologies like Java, Spring Boot, React and MySQL.',
      duration: '6 Months',
      level: 'Beginner to Advanced'
    },
    { 
      icon: 'fas fa-layer-group', 
      title: 'MERN Stack Development', 
      benefit: 'Master MongoDB, Express, React, and Node.js to build scalable web applications.',
      duration: '4 Months',
      level: 'Intermediate'
    },
    { 
      icon: 'fas fa-paint-brush', 
      title: 'Frontend Development', 
      benefit: 'Create beautiful, responsive user interfaces with HTML, CSS, JavaScript, and React.',
      duration: '3 Months',
      level: 'Beginner'
    },
    { 
      icon: 'fas fa-brain', 
      title: 'AI / ML Fundamentals', 
      benefit: 'Learn Artificial Intelligence and Machine Learning with Python and real-world projects.',
      duration: '5 Months',
      level: 'Advanced'
    },
    { 
      icon: 'fas fa-cloud', 
      title: 'DevOps & Cloud', 
      benefit: 'Master deployment, CI/CD pipelines, Docker, Kubernetes, and cloud platforms.',
      duration: '3 Months',
      level: 'Advanced'
    },
    { 
      icon: 'fas fa-user-graduate', 
      title: 'Career Counseling', 
      benefit: 'Get personalized career guidance, resume building, and interview preparation.',
      duration: 'Ongoing',
      level: 'All Levels'
    }
  ];
}
