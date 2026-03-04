import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  faqs = [
    {
      question: 'What are the prerequisites for joining?',
      answer: 'No prior coding experience required for beginner courses. Basic computer knowledge and passion to learn are enough.',
      isOpen: false
    },
    {
      question: 'What is the duration of the course?',
      answer: 'Course duration varies from 3 to 6 months depending on the program.',
      isOpen: false
    },
    {
      question: 'Do you provide placement assistance?',
      answer: 'Yes, we provide placement assistance. Our students have been placed in companies like Infosys, TCS, Capgemini, and fast-growing startups.',
      isOpen: false
    },
    {
      question: 'What is the fee structure?',
      answer: 'Starting from ₹25,000. EMI Options Available. Free Career Counseling Session included.',
      isOpen: false
    },
    {
      question: 'Can I pay in installments?',
      answer: 'Yes, we offer flexible EMI options with zero interest on selected payment methods.',
      isOpen: false
    }
  ];

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      course: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        courseInterest: this.contactForm.value.course,
        message: this.contactForm.value.message
      };
      this.contactService.sendMessage(formData).subscribe({
        next: (response) => {
          this.contactForm.reset();
          if (typeof window !== 'undefined') {
            const event = new CustomEvent('showToast', { 
              detail: { message: 'Thank you! We will get back to you soon.', type: 'success' } 
            });
            window.dispatchEvent(event);
          }
        },
        error: (error) => {
          console.error('Error submitting contact form:', error);
          if (typeof window !== 'undefined') {
            const event = new CustomEvent('showToast', { 
              detail: { message: 'Failed to send message. Please try again.', type: 'error' } 
            });
            window.dispatchEvent(event);
          }
        }
      });
    } else {
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('showToast', { 
          detail: { message: 'Please fill in all required fields correctly.', type: 'error' } 
        });
        window.dispatchEvent(event);
      }
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
