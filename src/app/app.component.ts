import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';
  displayedText = '';
  currentRoleIndex = 0;
  isDeleting = false;
  typingSpeed = 100;
  scrollRotation = 0;
  scrollProgress = 0;
  formSending = false;
  formSent = false;
  formError = false;
  form = { name: '', email: '', subject: '', message: '' };
  private typingTimer: any;
  private observerMap = new Map<Element, IntersectionObserver>();

  private readonly WEB3FORMS_KEY = 'bf865602-6b18-44f7-9cdc-d0e5c879493a';

  roles = [
    'Business Central Developer',
    'UI/UX Designer',
    'F&O Technical Consultant',
    'Front End Developer',
    'Odoo Developer'
  ];

  skills = [
    { name: 'Business Central / AL', level: 92, icon: 'fa-solid fa-database', color: '#7c3aed' },
    { name: 'F&O / X++', level: 88, icon: 'fa-solid fa-gears', color: '#06b6d4' },
    { name: 'Odoo / Python', level: 85, icon: 'fa-brands fa-python', color: '#a78bfa' },
    { name: 'UI/UX Design', level: 90, icon: 'fa-solid fa-pen-ruler', color: '#f59e0b' },
    { name: 'HTML / CSS / SCSS', level: 94, icon: 'fa-brands fa-html5', color: '#f97316' },
    { name: 'Angular / TypeScript', level: 87, icon: 'fa-brands fa-angular', color: '#ef4444' },
    { name: 'JavaScript', level: 89, icon: 'fa-brands fa-js', color: '#eab308' },
  ];

  services = [
    {
      icon: 'fa-solid fa-building-columns',
      title: 'Business Central Dev',
      desc: 'Custom AL extensions, integrations, and workflow automation for Microsoft Dynamics 365 Business Central.',
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)'
    },
    {
      icon: 'fa-solid fa-pen-nib',
      title: 'UI/UX Design',
      desc: 'User-centered interface design with Figma — wireframes, prototypes, and design systems that delight users.',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    },
    {
      icon: 'fa-solid fa-industry',
      title: 'F&O Technical Consulting',
      desc: 'Microsoft Dynamics 365 Finance & Operations customizations, X++ development, and technical architecture.',
      gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
    },
    {
      icon: 'fa-solid fa-code',
      title: 'Front End Development',
      desc: 'Modern, responsive web apps using Angular, TypeScript, HTML5, SCSS, and component-driven architecture.',
      gradient: 'linear-gradient(135deg, #f97316, #eab308)'
    },
    {
      icon: 'fa-solid fa-cubes',
      title: 'Odoo Development',
      desc: 'Custom Odoo modules, business process automation, and ERP integrations using Python and OWL framework.',
      gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)'
    },
    {
      icon: 'fa-solid fa-plug-circle-bolt',
      title: 'ERP Integrations',
      desc: 'Seamless integrations between ERP platforms, third-party APIs, payment gateways, and external systems.',
      gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)'
    }
  ];

  stats = [
    { value: '1+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: '15+', label: 'Happy Clients' },
    { value: '5', label: 'Core Specializations' }
  ];

  navLinks = ['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'];

  projects = [
    {
      icon: 'fa-brands fa-figma',
      title: 'Designed Mobile Apps',
      desc: 'Designed a comprehensive SIS App (Inventory Management) featuring sales processing, purchase receiving, purchase returns, and more. Also designed a HRMS App — all crafted with Figma for seamless UX.',
      tags: [{ icon: 'fa-brands fa-figma', label: 'Figma' }, { icon: 'fa-solid fa-mobile-screen', label: 'UI/UX' }],
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      link: null
    },
    {
      icon: 'fa-solid fa-building-columns',
      title: 'POS Backend Project',
      desc: 'Custom backend system for a retail POS App in Business Central using AL — API integrations, store & warehouse management, automated sales posting, and transaction synchronization.',
      tags: [{ icon: 'fa-solid fa-building-columns', label: 'Business Central' }, { icon: 'fa-solid fa-code', label: 'AL' }],
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      link: null
    },
    {
      icon: 'fa-solid fa-gears',
      title: 'D365 F&O Customizations',
      desc: 'Customized and developed D365 F&O components including tables, forms, extensions, data entities, batch jobs, number sequences, and X++ business logic to support business requirements.',
      tags: [{ icon: 'fa-solid fa-gears', label: 'F&O' }, { icon: 'fa-solid fa-code', label: 'X++' }],
      gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
      link: null
    },
    {
      icon: 'fa-brands fa-python',
      title: 'Odoo Development',
      desc: 'Engineered Odoo 19 vertical solutions covering Hospitality (POS), Healthcare (HMS/Dental), and Supply Chain Logistics (Freight Forwarding). Extended Odoo base models via inheritance.',
      tags: [{ icon: 'fa-brands fa-python', label: 'Python' }, { icon: 'fa-solid fa-cubes', label: 'Odoo 19' }],
      gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
      link: null
    },
    {
      icon: 'fa-brands fa-react',
      title: 'Ecommerce Website',
      desc: 'Live jewellery e-commerce website built with React — product management, cart logic, multi-step checkout, and real-time order notifications via WhatsApp. Currently serving real customers in Pakistan.',
      tags: [{ icon: 'fa-brands fa-react', label: 'React' }, { icon: 'fa-solid fa-cart-shopping', label: 'E-Commerce' }],
      gradient: 'linear-gradient(135deg, #06b6d4, #22c55e)',
      link: 'https://mbn-store-pi.vercel.app/'
    },
    {
      icon: 'fa-solid fa-brain',
      title: 'Sales Brain',
      desc: 'AI-powered sales call intelligence platform (Next.js, TypeScript, Prisma) that transcribes and analyzes calls using Groq Whisper/LLaMA models — coaching insights, pipeline analytics, and one-click CRM sync.',
      tags: [{ icon: 'fa-brands fa-js', label: 'Next.js' }, { icon: 'fa-solid fa-robot', label: 'AI / LLM' }, { icon: 'fa-solid fa-database', label: 'Prisma' }],
      gradient: 'linear-gradient(135deg, #ec4899, #7c3aed)',
      link: null
    },
    {
      icon: 'fa-brands fa-react',
      title: 'HRMS App',
      desc: 'Full-featured HR management web app in React and TypeScript with modules for employee directory, attendance tracking, leave management, and an interactive analytics dashboard.',
      tags: [{ icon: 'fa-brands fa-react', label: 'React' }, { icon: 'fa-brands fa-js', label: 'TypeScript' }, { icon: 'fa-solid fa-chart-bar', label: 'Analytics' }],
      gradient: 'linear-gradient(135deg, #f97316, #eab308)',
      link: null
    },
    {
      icon: 'fa-brands fa-vuejs',
      title: 'Booking Platform',
      desc: 'Multi-tenant booking platform (Vue 3, TypeScript, Pinia) with real-time admin calendar and a customer self-booking flow.',
      tags: [{ icon: 'fa-brands fa-vuejs', label: 'Vue 3' }, { icon: 'fa-brands fa-js', label: 'TypeScript' }, { icon: 'fa-solid fa-calendar-days', label: 'Pinia' }],
      gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
      link: null
    },
  ];

  ngOnInit() {
    this.startTyping();
    this.initScrollObserver();
    this.updateScrollCircle();
  }

  ngOnDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.observerMap.forEach(obs => obs.disconnect());
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
    this.updateScrollCircle();
  }

  updateScrollCircle() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    this.scrollRotation = ratio * 720;
    this.scrollProgress = ratio * 100;
  }

  updateActiveSection() {
    const sections = ['home', 'about', 'skills', 'services', 'projects', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
          break;
        }
      }
    }
  }

  initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    // Mark elements already in viewport visible immediately
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        }
        observer.observe(el);
      });
    }, 50);
  }

  startTyping() {
    const currentRole = this.roles[this.currentRoleIndex];

    if (!this.isDeleting) {
      this.displayedText = currentRole.substring(0, this.displayedText.length + 1);
      this.typingSpeed = 100;
    } else {
      this.displayedText = currentRole.substring(0, this.displayedText.length - 1);
      this.typingSpeed = 50;
    }

    if (!this.isDeleting && this.displayedText === currentRole) {
      this.typingSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayedText === '') {
      this.isDeleting = false;
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.typingSpeed = 300;
    }

    this.typingTimer = setTimeout(() => this.startTyping(), this.typingSpeed);
  }

  scrollTo(section: string) {
    const el = document.getElementById(section.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/BilalShahzad-Resume.pdf';
    link.download = 'BilalShahzad-Resume.pdf';
    link.click();
  }

  sendMessage() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.formSending = true;
    this.formError = false;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: this.WEB3FORMS_KEY,
        name:       this.form.name,
        email:      this.form.email,
        subject:    this.form.subject || 'Portfolio Contact Form',
        message:    this.form.message,
      })
    })
    .then(res => res.json())
    .then(data => {
      this.formSending = false;
      if (data.success) {
        this.formSent = true;
        this.form = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => this.formSent = false, 5000);
      } else {
        this.formError = true;
        setTimeout(() => this.formError = false, 5000);
      }
    })
    .catch(() => {
      this.formSending = false;
      this.formError = true;
      setTimeout(() => this.formError = false, 5000);
    });
  }
}
