// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initPortfolio();
});

// Portfolio Initialization
function initPortfolio() {
    // Initialize theme
    initTheme();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize hover effects for footer links
    initFooterLinkHovers();
}

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('portfolio-theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Theme toggle event
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('portfolio-theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        }
    });
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', theme);
    
    // Dispatch custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

// Navigation Management
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Set active link on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Create mobile menu for small screens
    createMobileMenu();
}

function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Only create mobile menu if nav exists and screen is small
    if (nav && window.innerWidth <= 768) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone the navigation links
        const clonedLinks = navLinks.cloneNode(true);
        mobileMenu.appendChild(clonedLinks);
        
        // Add to DOM
        nav.appendChild(mobileMenuBtn);
        document.body.appendChild(mobileMenu);
        
        // Add event listener
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }
}

// Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filterValue = this.getAttribute('data-filter');
            filterProjects(filterValue, projectCards);
        });
    });
}

function filterProjects(filterValue, projectCards) {
    projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            // Add fade-in animation
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Footer Link Hover Effects
function initFooterLinkHovers() {
    const footerLinks = document.querySelectorAll('.footer-column a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.color = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseout', function() {
            this.style.color = 'var(--text-light)';
        });
    });
}

// Add CSS for mobile menu (dynamically injected)
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-color);
            cursor: pointer;
        }
        
        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--header-bg);
            z-index: 9999;
            padding: 80px 20px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .mobile-menu.active {
            display: block;
            transform: translateX(0);
        }
        
        .mobile-menu ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .mobile-menu a {
            font-size: 1.2rem;
            padding: 10px 0;
            display: block;
            border-bottom: 1px solid var(--border-color);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize mobile menu styles
addMobileMenuStyles();

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPortfolio,
        toggleTheme,
        filterProjects
    };
}
