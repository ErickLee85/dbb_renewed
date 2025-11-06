const form = document.querySelector('.my-form');
const submitBtn = document.querySelector('.form-submit-btn')
const successToast = document.querySelector('.success-toast')
const failToast = document.querySelector('.fail-toast')
const closeTimer = document.querySelector('.close-timer');
const closeTimerFail = document.querySelector('.close-timer-fail');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get the reCAPTCHA response token
        const recaptchaToken = grecaptcha.getResponse();
        
        if (!recaptchaToken) {
            alert('Please complete the reCAPTCHA');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        document.querySelector('.form-inactive').style.display = 'none';
        document.querySelector('.form-active').style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        
        try {
            
       
            
            const response = await fetch('https://nodemailer-gold.vercel.app/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    recaptchaToken
                })
            });
            // const response = await fetch('http://localhost:3000/sendMessage', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         ...data,
            //         recaptchaToken
            //     })
            // });
            
            const result = await response.json();
            if (result.success) {
               successToast.classList.add('open')
               closeTimer.classList.add('start')
    
               setTimeout(() => {
                successToast.classList.add('close')
               }, 5000);
                form.reset();
                grecaptcha.reset(); // Reset the reCAPTCHA widget
            } else {
               failToast.classList.add('open')
               closeTimerFail.classList.add('start')
               setTimeout(() => {
                failToast.classList.add('close')
               }, 5000);
               submitBtn.disabled = false;
               submitBtn.style.opacity = '1';
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            document.querySelector('.form-inactive').style.display = 'flex';
            document.querySelector('.form-active').style.display = 'none';
        }
    });
    
}
const successClose = document.querySelector('.close-btn-success');
const failClose = document.querySelector('.close-btn-fail')
if(successClose) {
    successClose.addEventListener('click', () => {
        document.querySelector('.success-toast').classList.add('close')
      })
}

if(failClose) {
    failClose.addEventListener('click', () => {
        document.querySelector('.fail-toast').classList.add('close')
      })
}

// Get all navigation links in the mobile menu
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

// Function to handle smooth navigation
function handleMobileNavigation(e) {
    // Only handle links that navigate to other pages (not tel: links)
    if (!e.target.href.startsWith('tel:')) {
        e.preventDefault(); // Prevent immediate navigation
        const targetHref = e.target.href;
        
        // Toggle menu closed
        mobileMenu.classList.remove('is-active');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';

        // Wait for the menu closing animation to complete
        // The CSS transition is 0.3s, so we wait slightly longer
        setTimeout(() => {
            window.location.href = targetHref;
        }, 600); // Match this with your CSS transition duration
    }
}

// Add click event listeners to all mobile menu links
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', handleMobileNavigation);
});

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu .hamburger');

function toggleMenu() {
    mobileMenu.classList.toggle('is-active');
    overlay.classList.toggle('is-active');
    document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
mobileMenuClose.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Testimonial Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    initTestimonialSlider();
});

function initTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (!track || !cards.length || !prevBtn || !nextBtn || !dotsContainer) return;
    
    // Variables
    let currentIndex = 0;
    let cardWidth;
    let visibleCards = 3;
    const totalCards = cards.length;
    const gap = 24; // Gap between cards in pixels (from CSS)
    
    // Create dots
    createDots();
    
    // Mark first card as active
    updateActiveCard();
    
    // Calculate how many cards to show based on screen width
    function calculateVisibleCards() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) {
            visibleCards = 1;
            // For mobile view, show all cards in a column layout
            track.style.transform = 'none';
            
            // Make sure ALL cards are visible
            cards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.classList.add('active');
                // Remove any width limitations
                card.style.width = '100%';
                card.style.minWidth = '100%';
            });
            
            // Force column layout on the track
            track.style.display = 'flex';
            track.style.flexDirection = 'column';
            
            // Hide controls on mobile
            const controls = document.querySelector('.testimonial-controls');
            if (controls) controls.style.display = 'none';
            
            // Clear any intervals to prevent auto-sliding on mobile
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
            return;
        } else if (windowWidth < 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }
        
        // Restore desktop view properties
        track.style.display = 'flex';
        track.style.flexDirection = 'row';
        cards.forEach(card => {
            card.style.display = '';
            card.style.width = '';
            card.style.minWidth = '';
        });
        const controls = document.querySelector('.testimonial-controls');
        if (controls) controls.style.display = 'flex';
        
        cardWidth = (track.clientWidth - ((visibleCards - 1) * gap)) / visibleCards;
        goToSlide(currentIndex);
    }
    
    // Initialize
    calculateVisibleCards();
    window.addEventListener('resize', calculateVisibleCards);
    
    // Create dot indicators
    function createDots() {
        // Calculate how many dots we need based on cards and visible cards
        const totalDots = Math.max(1, totalCards - visibleCards + 1);
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update active card
    function updateActiveCard() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth < 768) {
            // For mobile, show ALL cards, no exceptions
            cards.forEach((card) => {
                card.classList.add('active');
                card.style.display = 'block';
            });
        } else {
            // For desktop, use the original logic
            cards.forEach((card, index) => {
                if (index >= currentIndex && index < currentIndex + visibleCards) {
                    card.classList.add('active');
                    card.style.display = 'block';
                } else {
                    card.classList.remove('active');
                    card.style.display = 'block';
                }
            });
        }
        
        // Update active dot
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Enforce boundaries
        if (index < 0) index = 0;
        if (index > totalCards - visibleCards) index = totalCards - visibleCards;
        
        currentIndex = index;
        
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) {
            // For mobile, don't use transform, show all cards
            updateActiveCard();
        } else {
            // For desktop, use transform logic
            const offset = -index * (cardWidth + gap);
            track.style.transform = `translateX(${offset}px)`;
            updateActiveCard();
        }
        
        updateButtonStates();
    }
    
    // Update button states (disabled at boundaries)
    function updateButtonStates() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalCards - visibleCards;
        
        // Visual feedback for button state
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // Button click handlers
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Initialize button states
    updateButtonStates();
    
    // Auto-advance the slider every 5 seconds
    let autoplayInterval = setInterval(() => {
        if (currentIndex < totalCards - visibleCards) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back to start
        }
    }, 5000);
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    // Resume autoplay on mouse leave
    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex < totalCards - visibleCards) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 5000);
    });
}



window.addEventListener('load', () => {
    
    document.querySelector('body').classList.add('active-bod');
    
    // GSAP Split Text Animation for Hero Description
    const heroDescription = document.querySelector('.hero-title');
    
    if (heroDescription) {
        // Split text into individual words and wrap each in a span
        gsap.registerPlugin(SplitText)
        // Animate the words
         let split = SplitText.create(".hero-title", { type: "words" });
         let split2 = SplitText.create(".hero-description", { type: "chars" });

 
          gsap.from(split2.chars, {
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "sine.out",
            stagger: 0.1,
        });
            gsap.from(split.words, {
            delay:1,
            opacity: 0,
            duration: 2,
            ease: "sine.out",
            stagger: 0.1,
        });
    }
});




