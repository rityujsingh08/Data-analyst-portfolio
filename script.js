// ==================== Modal Functions ====================
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// ==================== Resume Functions ====================
function downloadResume(e) {
    if (e) e.preventDefault();
    // Replace with your actual resume file URL
    const resumeUrl = 'path/to/your/resume.pdf'; // Update this path
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Rityuj_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('✓ Resume downloaded successfully!');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const resumeBtn = document.getElementById('resumeBtn');
    const dropdown = document.getElementById('resumeDropdown');
    
    if (resumeBtn && dropdown) {
        if (!resumeBtn.contains(e.target) && !dropdown.contains(e.target)) {
            closeResumeMenu();
        }
    }
});

// ==================== Toast Notification ====================
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// ==================== Scroll Animations ====================
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.box').forEach(box => {
        observer.observe(box);
    });
}

// ==================== Smooth Scrollbar ====================
function smoothScroll() {
    const contentSection = document.querySelector('.content-section');
    if (contentSection) {
        contentSection.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                this.scrollTop += e.deltaY;
                e.preventDefault();
            }
        }, { passive: false });
    }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', function() {
    observeElements();
    smoothScroll();

    // Add focus styles for better accessibility
    document.querySelectorAll('.social-links a, .social-links button').forEach(link => {
        link.addEventListener('focus', function() {
            this.style.outline = 'none';
            this.style.boxShadow = '0 0 15px rgba(255, 165, 0, 0.6)';
        });
        
        link.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });

    // Add keyboard navigation for resume menu
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleResumeMenu();
            }
        });
    }

    console.log('Portfolio initialized successfully!');
});