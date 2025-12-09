// Luxury Website Interactions - Sandra Kostić

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animations when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const sections = document.querySelectorAll('.about, .who-i-help, .how-it-works, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        fadeInObserver.observe(section);
    });
    
    // Animate cards with stagger
    const cards = document.querySelectorAll('.credential-card, .service-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.8s ease-out ${index * 0.15}s, transform 0.8s ease-out ${index * 0.15}s`;
        fadeInObserver.observe(card);
    });
    
    // Animate process items
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`;
        fadeInObserver.observe(item);
    });
});

// Parallax effect for background decorations
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const decorations = document.querySelectorAll('.bg-decoration');
    
    decorations.forEach((decoration, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrolled * speed);
        decoration.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(button => {
    // Magnetic effect on hover
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
    
    // Click tracking for analytics (ready for implementation)
    button.addEventListener('click', function() {
        const buttonText = this.querySelector('.btn-text')?.textContent || this.textContent.trim();
        console.log(`Button clicked: ${buttonText}`);
        
        // Future: Add analytics tracking here
        // gtag('event', 'button_click', {
        //     'button_name': buttonText,
        //     'location': window.location.pathname
        // });
    });
});

// Smooth reveal for service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Frame corner animations for hero image
const frameCorners = document.querySelectorAll('.frame-corner');
frameCorners.forEach((corner, index) => {
    setTimeout(() => {
        corner.style.opacity = '0';
        corner.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        setTimeout(() => {
            corner.style.opacity = '1';
        }, 100);
    }, index * 200 + 800);
});

// Add grain texture effect (optional performance optimization)
function addGrainTexture() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const gray = Math.random() * 50;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
        data[i + 3] = 8; // Low opacity
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const grainURL = canvas.toDataURL();
    document.body.style.backgroundImage = `url(${grainURL})`;
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundBlendMode = 'multiply';
}

// Uncomment to enable grain texture
// addGrainTexture();

// Scroll progress indicator (optional)
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Can be used for a progress bar if needed
    // document.getElementById('scroll-progress').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Lazy load images (performance optimization)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message for developers
console.log('%c Sandra Kostić Coaching', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%c Website designed with care ✨', 'font-size: 14px; color: #6B5644;');
