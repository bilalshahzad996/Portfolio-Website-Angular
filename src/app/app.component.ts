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
    'Odoo Developer',
    'Game Developer'
  ];

  skills = [
    { name: 'Business Central / AL', level: 92, icon: 'fa-solid fa-database', color: '#7c3aed' },
    { name: 'F&O / X++', level: 88, icon: 'fa-solid fa-gears', color: '#06b6d4' },
    { name: 'Odoo / Python', level: 85, icon: 'fa-brands fa-python', color: '#a78bfa' },
    { name: 'UI/UX Design', level: 90, icon: 'fa-solid fa-pen-ruler', color: '#f59e0b' },
    { name: 'HTML / CSS / SCSS', level: 94, icon: 'fa-brands fa-html5', color: '#f97316' },
    { name: 'React / Next.js / Vue', level: 88, icon: 'fa-brands fa-react', color: '#22d3ee' },
    { name: 'TypeScript / JavaScript', level: 89, icon: 'fa-brands fa-js', color: '#eab308' },
    { name: 'C# / Unity 6', level: 82, icon: 'fa-brands fa-unity', color: '#94a3b8' },
    { name: 'SQL / RDLC / SSRS / Power BI', level: 84, icon: 'fa-solid fa-chart-pie', color: '#22c55e' },
  ];

  experience = [
    {
      role: 'Associate Technical Consultant',
      company: 'Tribox',
      period: 'Oct 2025 - Present',
      desc: 'Backend development in Business Central, mobile app design with strong UI/UX principles, custom Odoo ERP solutions across multiple industry verticals, and Dynamics 365 F&O customizations supporting business processes.'
    },
    {
      role: 'Intern Technical Consultant',
      company: 'Tribox',
      period: 'Jul 2025 - Sep 2025',
      desc: 'Learned to develop and customize Dynamics 365 F&O components using X++ and AOT objects, applying Microsoft best practices and design patterns.'
    }
  ];

  education = [
    { title: 'BS Computer Science', place: 'NCBA&E', period: '2020 - 2024' },
    { title: 'Full Stack Web Development (Certification)', place: 'Ideoversity', period: '2023' },
    { title: 'Intermediate (FSc Pre-Engineering)', place: 'The Crescent College', period: '2020' },
    { title: 'Matric', place: 'St. Anthony High School', period: '2018' }
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
      desc: 'Modern, responsive, SEO-friendly web apps using React, Next.js, Vue 3, Angular and TypeScript, deployed on Vercel and Azure.',
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
      desc: 'REST APIs, Peppol e-invoicing, Power BI connectors and integrations between ERP platforms, handheld devices and external systems.',
      gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)'
    },
    {
      icon: 'fa-solid fa-gamepad',
      title: 'Mobile Game Development',
      desc: 'Unity 6 and C# mobile games for Android with custom physics, procedural levels, AI opponents and responsive touch controls.',
      gradient: 'linear-gradient(135deg, #ec4899, #f97316)'
    }
  ];

  stats = [
    { value: '1+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: '10+', label: 'Happy Clients' },
    { value: '6', label: 'Core Specializations' }
  ];

  navLinks = ['Home', 'About', 'Experience', 'Skills', 'Services', 'Projects', 'Contact'];

  projects = [
    {
      icon: 'fa-solid fa-barcode',
      title: 'Shop-in-Shop Retail Integration',
      desc: 'Migrated a Shop-in-Shop retail module from D365 F&O to Business Central. Built 30+ REST APIs for handheld barcode scanning (transfers, purchase receiving, wastage, sales), Job Queue background posting and multi-company sales order creation.',
      tags: [{ icon: 'fa-solid fa-building-columns', label: 'Business Central' }, { icon: 'fa-solid fa-code', label: 'AL' }, { icon: 'fa-solid fa-plug', label: 'REST APIs' }],
      gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
      link: null
    },
    {
      icon: 'fa-solid fa-building-columns',
      title: 'POS Backend Project',
      desc: 'Custom backend system for a retail POS App in Business Central using AL: API integrations, store & warehouse management, automated sales posting, and transaction synchronization.',
      tags: [{ icon: 'fa-solid fa-building-columns', label: 'Business Central' }, { icon: 'fa-solid fa-code', label: 'AL' }],
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      link: null
    },
    {
      icon: 'fa-solid fa-file-invoice',
      title: 'E-Invoicing Extension (UAE)',
      desc: 'AL extension connecting Business Central to the Marmin Peppol e-invoicing platform: automated sales e-invoice sending with compliance checks before posting, and matching received purchase e-invoices on supplier and VAT amounts.',
      tags: [{ icon: 'fa-solid fa-building-columns', label: 'Business Central' }, { icon: 'fa-solid fa-file-invoice', label: 'Peppol' }],
      gradient: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
      link: null
    },
    {
      icon: 'fa-solid fa-coins',
      title: 'Multi-Currency Finance Extension',
      desc: 'A 52-object Business Central extension in AL with custom multi-currency exchange-rate handling, purchase classification with posting-time validation, and RDLC financial reports.',
      tags: [{ icon: 'fa-solid fa-code', label: 'AL' }, { icon: 'fa-solid fa-file-lines', label: 'RDLC' }],
      gradient: 'linear-gradient(135deg, #f59e0b, #7c3aed)',
      link: null
    },
    {
      icon: 'fa-solid fa-user-lock',
      title: 'Journal Access Control & Import',
      desc: 'Business Central extensions providing batch-level journal access control, plus Excel-based import and export of journal data.',
      tags: [{ icon: 'fa-solid fa-building-columns', label: 'Business Central' }, { icon: 'fa-solid fa-code', label: 'AL' }],
      gradient: 'linear-gradient(135deg, #4f46e5, #ec4899)',
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
      title: 'Odoo Custom Modules',
      desc: 'Suite of Odoo custom modules covering Hospitality (POS), Healthcare (HMS/Dental) and Supply Chain Logistics (Freight Forwarding), plus a Power BI connector. Extended core models (sale, account, hr, stock) via inheritance.',
      tags: [{ icon: 'fa-brands fa-python', label: 'Python' }, { icon: 'fa-solid fa-cubes', label: 'Odoo' }, { icon: 'fa-solid fa-chart-pie', label: 'Power BI' }],
      gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
      link: null
    },
    {
      icon: 'fa-brands fa-figma',
      title: 'SIS & HRMS Mobile App Designs',
      desc: 'Designed a comprehensive SIS App (Inventory Management) featuring sales processing, purchase receiving, purchase returns, and more. Also designed an HRMS App, all crafted in Figma for a seamless UX.',
      tags: [{ icon: 'fa-brands fa-figma', label: 'Figma' }, { icon: 'fa-solid fa-mobile-screen', label: 'UI/UX' }],
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      link: null
    },
    {
      icon: 'fa-solid fa-globe',
      title: 'Tribox Corporate Website',
      desc: '19-page responsive company website with light and dark themes built with React and Vite, deployed on Azure. Every page pre-rendered to static HTML with structured data for SEO, plus custom SVG diagrams, an interactive product tour and an animated office map.',
      tags: [{ icon: 'fa-brands fa-react', label: 'React' }, { icon: 'fa-solid fa-bolt', label: 'Vite' }, { icon: 'fa-brands fa-microsoft', label: 'Azure' }],
      gradient: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
      link: 'https://tribox365.com/'
    },
    {
      icon: 'fa-brands fa-react',
      title: 'Jewellery E-commerce Website',
      desc: 'Live jewellery e-commerce website built from scratch with React: product management, cart logic, multi-step checkout, and real-time order notifications via WhatsApp. Currently serving real customers in Pakistan.',
      tags: [{ icon: 'fa-brands fa-react', label: 'React' }, { icon: 'fa-solid fa-cart-shopping', label: 'E-Commerce' }],
      gradient: 'linear-gradient(135deg, #06b6d4, #22c55e)',
      link: 'https://mbn-store-pi.vercel.app/'
    },
    {
      icon: 'fa-solid fa-brain',
      title: 'Sales Brain',
      desc: 'AI-powered sales call intelligence platform (Next.js, TypeScript, Prisma) that transcribes and analyzes calls using Groq Whisper/LLaMA models: coaching insights, pipeline analytics, one-click CRM sync (HubSpot/Salesforce), multi-provider auth and role-based access control.',
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
    {
      icon: 'fa-solid fa-person-snowboarding',
      title: 'Ridgeline Stunt',
      desc: '2D snowboard stunt game for Android with 50 levels, flips, rail grinds, combo scoring and medals. Fixed-step physics simulation, a procedural level generator with rising difficulty, and a responsive touch UI for portrait and landscape.',
      tags: [{ icon: 'fa-brands fa-unity', label: 'Unity 6' }, { icon: 'fa-solid fa-code', label: 'C#' }, { icon: 'fa-brands fa-android', label: 'Android' }],
      gradient: 'linear-gradient(135deg, #38bdf8, #6366f1)',
      link: null
    },
    {
      icon: 'fa-solid fa-flag-checkered',
      title: 'F1 Racing',
      desc: 'Mobile racing game with 5 tracks, AI rivals with three difficulty levels, timed laps, replays and weather/day-night modes. Custom car physics tuned to real F1 figures, plus gyroscope tilt and on-screen steering wheel controls.',
      tags: [{ icon: 'fa-brands fa-unity', label: 'Unity 6' }, { icon: 'fa-solid fa-code', label: 'C#' }, { icon: 'fa-brands fa-android', label: 'Android' }],
      gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
      link: null
    },
  ];

  techStack = [
    { icon: 'fa-solid fa-building-columns', label: 'Business Central' },
    { icon: 'fa-solid fa-gears', label: 'Dynamics 365 F&O' },
    { icon: 'fa-solid fa-cubes', label: 'Odoo' },
    { icon: 'fa-solid fa-code', label: 'AL' },
    { icon: 'fa-solid fa-code', label: 'X++' },
    { icon: 'fa-brands fa-python', label: 'Python' },
    { icon: 'fa-brands fa-react', label: 'React' },
    { icon: 'fa-brands fa-js', label: 'Next.js' },
    { icon: 'fa-brands fa-vuejs', label: 'Vue 3' },
    { icon: 'fa-brands fa-angular', label: 'Angular' },
    { icon: 'fa-brands fa-figma', label: 'Figma' },
    { icon: 'fa-brands fa-unity', label: 'Unity 6' },
    { icon: 'fa-brands fa-microsoft', label: 'Azure' },
    { icon: 'fa-solid fa-chart-pie', label: 'Power BI' },
  ];

  /** Feeds the cursor position to cards so they can draw a spotlight glow. */
  @HostListener('document:pointermove', ['$event'])
  onPointerMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    document.querySelectorAll<HTMLElement>('.spotlight').forEach(card => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

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
    const sections = ['home', 'about', 'experience', 'skills', 'services', 'projects', 'contact'];
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
