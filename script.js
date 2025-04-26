document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            } else if (button.href.includes('linkedin') || button.href.includes('resume')) {
                window.location.href = button.href;
            }
        });
    });

//Nav menu section for mobile
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Contact form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message')
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                form.reset();
            })
            .catch(error => {
                alert('Error sending message');
                console.error('Error:', error);
            });
        });
    }
});