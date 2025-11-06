 gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

        // Detect mobile/touch devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                        (window.innerWidth <= 943) || 
                        ('ontouchstart' in window);

        // Global smoother variable
        let smoother = null;

        // Hero animations on load with SplitText
        window.addEventListener('load', () => {
            // Split the tagline text
          
                const infoBtn = document.querySelector('.btn-secondary')
                let words = document.querySelectorAll(".trusted-logo")
                
                // Only create ScrollSmoother on desktop devices
                if (!isMobile) {
                    smoother = ScrollSmoother.create({
                        wrapper:'#smooth-wrapper',
                        content:'#smooth-content',
                        smooth:2
                    });
                    // Refresh ScrollTrigger after ScrollSmoother is created
                    ScrollTrigger.refresh();
                } else {
                    // On mobile, add a class to enable normal scrolling
                    const smoothWrapper = document.getElementById('smooth-wrapper');
                    if (smoothWrapper) {
                        smoothWrapper.classList.add('mobile-scroll');
                    }
                }

                if (infoBtn) {
                    infoBtn.addEventListener('click',(e) => {
                        e.preventDefault();
                        const statsSection = document.querySelector(".stats-section");
                        if (statsSection) {
                            if (smoother) {
                                smoother.scrollTo(".stats-section", true, "center center");
                            } else {
                                // Fallback for mobile
                                statsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }
                    });
                }
               document.fonts.ready.then(() => {
                        let split = SplitText.create([".hero-tagline"], { type: "words" });
                        let split2 = SplitText.create(".hero-subtitle", {type:"words"})
                        let split3 = SplitText.create(".hero-subtext",{type:"words"})
                        let split4 = SplitText.create(".trusted-logo", {type:"words"})
                        let split5 = SplitText.create(".stats-content h2", {type:"words"})
                        let split6 = SplitText.create(".stats-content p",{type:"words"})
                        
                
                    gsap.fromTo(split.words, {opacity: 0,filter:'blur(10px)',},{opacity:1,filter:'blur(0px)',duration: 1,stagger: 0.1,delay:0.5,});
                    gsap.fromTo(split2.words,{opacity:0,},{opacity:1,duration:1,stagger:0.1})
                    gsap.fromTo(split3.words,{opacity:0},{opacity:1,duration:1,stagger:0.1,delay:1.2})
                    gsap.fromTo(".stats-image",{opacity:0, width:0},{
                        opacity:1,width:'100%',duration:1.5,scrollTrigger: {
                                trigger: ".stats-section",
                                start: "top 50%",
                                toggleActions: "play none none none",
                            }})
                    gsap.from(split4.words,{opacity:0, stagger:0.2,
                        scrollTrigger: {
                        trigger: split4.words[0].parentElement,
                        start: "top 85%", // adjust this value (higher % = triggers sooner)
                        toggleActions: "play none none none", // only play once when entering
                    }
                    })
                    gsap.fromTo(".hero-cta > a",{y:20,opacity:0},{y:0,opacity:1,duration:1,delay:1.5})
                    
                    // Stats animation with ScrollTrigger
                    gsap.fromTo(".stat-item",
                        {
                            x: -50,
                            opacity: 0,
                            filter: 'blur(10px)'
                        },
                        {
                            x: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            stagger: 0.2,
                            duration: 0.8,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: ".stats-section",
                                start: "top 50%",
                                toggleActions: "play none none none",
                            }
                        }
                    )

                      document.querySelectorAll('.stat-number').forEach((statNumber) => {
                        const text = statNumber.textContent.trim();
                        // Extract number by removing all non-digits
                        const number = parseInt(text.replace(/\D/g, ''));
                        // Extract suffix - get everything after the last digit (including commas, +, etc.)
                        const suffix = text.replace(/[\d,]/g, '');
                        
                        // Function to format number with commas
                        const formatNumber = (num) => {
                            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        };
                        
                        gsap.fromTo(statNumber, 
                            { textContent: 0 },
                            {
                                textContent: number,
                                duration: 2,
                                ease: 'power1.out',
                                snap: { textContent: 1 },
                                scrollTrigger: {
                                    trigger: ".stats-section",
                                    start: "top 50%",
                                    toggleActions: "play none none none",
                                },
                                onUpdate: function() {
                                    const currentValue = Math.ceil(statNumber.textContent);
                                    statNumber.textContent = formatNumber(currentValue) + suffix;
                                }
                            }
                        );
                    });
                    
                    gsap.fromTo(split5.words,{opacity:0,filter:'blur(5px)'},{opacity:1,filter:'blur(0px)',duration: 1,stagger: 0.1,delay:0.5,
                        scrollTrigger: {
                                trigger: ".stats-section",
                                start: "top 50%",
                                toggleActions: "play none none none",
                        }
                    })
                     gsap.fromTo(split6.words,{opacity:0},{opacity:1,duration:1,stagger:0.1,delay:1.2,
                         scrollTrigger: {
                                 trigger: ".stats-section",
                                 start: "top 50%",
                                 toggleActions: "play none none none",
                         }
                     })

                     // Animate reviews heading on scroll
                     const reviewsHeading = document.querySelector('.reviews-heading');
                     if (reviewsHeading) {
                         let splitReviewsHeading = SplitText.create([".reviews-heading"], { type: "words" });
                         gsap.fromTo(splitReviewsHeading.words, {
                             opacity: 0,
                             filter: 'blur(10px)'
                         }, {
                             opacity: 1,
                             filter: 'blur(0px)',
                             duration: 1,
                             stagger: 0.1,
                             delay: 0.5,
                             scrollTrigger: {
                                 trigger: reviewsHeading,
                                 start: "top 80%",
                                 toggleActions: "play none none none"
                             }
                         });
                     }

                     // Services Section Pin Animation
                    const servicesSection = document.querySelector('.services-section');
                    const serviceItems = document.querySelectorAll('.service-item');
                    const servicesHeading = document.querySelector('.services-heading');
                    
                    if (servicesSection && serviceItems.length > 0) {
                        // Animate the heading with SplitText (same as hero-tagline)
                        if (servicesHeading) {
                            let splitServices = SplitText.create([".services-heading"], { type: "words" });
                            gsap.fromTo(splitServices.words, {
                                opacity: 0,
                                filter: 'blur(10px)'
                            }, {
                                opacity: 1,
                                filter: 'blur(0px)',
                                duration: 1,
                                stagger: 0.1,
                                delay: 0.5,
                                scrollTrigger: {
                                    trigger: servicesHeading,
                                    toggleActions: "play none none none",
                                    markers: false
                                }
                            });
                        }

                        // Only pin on desktop devices
                        if (!isMobile) {
                            ScrollTrigger.create({
                                trigger: servicesSection,
                                start: "top top",
                                end: "+=4000",
                                pin: ".services-container",
                                anticipatePin: 1,
                                scrub: 1
                            });
                        }

                        // Animate each service item as it comes into view
                        serviceItems.forEach((item, index) => {
                            const title = item.querySelector('.service-title');
                            const description = item.querySelector('.service-description');
                            const number = item.querySelector('.service-number');
                            const featureItems = item.querySelectorAll('.service-feature-item');
                            
                            // On mobile, use simpler animations without scrub
                            if (isMobile) {
                                // Set initial states
                                gsap.set([title, description], { 
                                    opacity: 0, 
                                    y: 30,
                                    filter: 'blur(10px)'
                                });
                                gsap.set(number, { 
                                    opacity: 0, 
                                    y: 30,
                                    scale: 0.8 
                                });
                                gsap.set(featureItems, {
                                    opacity: 0,
                                    x: -30,
                                    filter: 'blur(5px)'
                                });

                                // Simple scroll-triggered animation for mobile
                                const mobileTimeline = gsap.timeline({
                                    scrollTrigger: {
                                        trigger: item,
                                        start: "top 80%",
                                        toggleActions: "play none none none"
                                    }
                                });

                                mobileTimeline
                                    .to([number, title, description], {
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0px)',
                                        scale: 1,
                                        duration: 0.8,
                                        stagger: 0.2,
                                        ease: 'power3.out'
                                    })
                                    .to(featureItems, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 0.6,
                                        stagger: 0.1,
                                        ease: 'power2.out'
                                    }, '-=0.3');
                            } else {
                                // Desktop animation with scrub
                                // Alternate between left and right animation
                                const isEven = index % 2 === 0;
                                const xOffset = isEven ? -200 : 200;
                                
                                // Set initial states - animate from x-axis
                                gsap.set([title, description], { 
                                    opacity: 0, 
                                    x: xOffset,
                                    filter: 'blur(10px)'
                                });
                                gsap.set(number, { 
                                    opacity: 0, 
                                    x: xOffset,
                                    scale: 0.8 
                                });
                                gsap.set(featureItems, {
                                    opacity: 0,
                                    x: xOffset + 50,
                                    filter: 'blur(5px)'
                                });
                                gsap.set(item, {
                                    x: 0
                                });

                                // Create timeline for each service
                                const serviceTimeline = gsap.timeline({
                                    scrollTrigger: {
                                        trigger: servicesSection,
                                        start: `top+=${index * 800} top`,
                                        end: `top+=${(index + 1) * 800} top`,
                                        scrub: 1,
                                        onEnter: () => {
                                            // Remove active class from all items
                                            serviceItems.forEach(si => si.classList.remove('active'));
                                            // Add active class to current item
                                            item.classList.add('active');
                                        },
                                        onEnterBack: () => {
                                            serviceItems.forEach(si => si.classList.remove('active'));
                                            item.classList.add('active');
                                        },
                                        onLeave: () => {
                                            if (index < serviceItems.length - 1) {
                                                item.classList.remove('active');
                                            }
                                        },
                                        onLeaveBack: () => {
                                            if (index > 0) {
                                                item.classList.remove('active');
                                            }
                                        }
                                    }
                                });

                                // Animate from x-axis - number first, then title, then description, then features
                                serviceTimeline
                                    .to(number, {
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                        duration: 0.8,
                                        ease: 'power3.out'
                                    })
                                    .to(title, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 1,
                                        ease: 'power3.out'
                                    }, '-=0.4')
                                    .to(description, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 1,
                                        ease: 'power3.out'
                                    }, '-=0.6')
                                    .to(featureItems, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 0.8,
                                        stagger: 0.1,
                                        ease: 'power2.out'
                                    }, '-=0.4');
                            }
                        });

                        // Set first service as active initially (only on desktop)
                        if (!isMobile) {
                            serviceItems[0]?.classList.add('active');
                        }
                    }
               })

             // Number counter animation
           
            
            

        });

        // Custom smooth scroll function using requestAnimationFrame
        function smoothScrollTo(element, duration = 800) {
            const startPosition = window.pageYOffset;
            const targetPosition = element.getBoundingClientRect().top + startPosition - 80; // Offset for header
            const distance = targetPosition - startPosition;
            let startTime = null;

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    window.scrollTo(0, targetPosition);
                }
            }

            requestAnimationFrame(animation);
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                    
                    // Use different scrolling method based on device
                    if (isMobile) {
                        // Special handling for Services link on mobile - use custom smooth scroll
                        if (href === '#services') {
                            smoothScrollTo(target);
                        } else {
                            // Use native smooth scroll on mobile for other links
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    } else {
                        // Use GSAP scrollTo on desktop
                        if (smoother) {
                            // Use selector string for ScrollSmoother
                            smoother.scrollTo(href, true, "top top");
                        } else {
                            gsap.to(window, {
                                duration: 1,
                                scrollTo: target,
                                ease: 'power3.inOut'
                            });
                        }
                    }
                }
            });
        });

        let lastScrollY = 0;
        const navbar = document.querySelector('header'); // or whatever your navbar selector is

        ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
            const currentScrollY = self.scroll();
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past hero section
            gsap.to(navbar, {
                y: -100, // adjust based on your navbar height
                duration: 0.3,
            });
            } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
            });
            }
            
            lastScrollY = currentScrollY;
        }
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Hero Image Slider
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        let isAnimating = false;
        let slideClicked = false;

        function goToSlide(index, direction) {
            if (isAnimating || index === currentSlide) return;
            isAnimating = true;

            const oldSlide = slides[currentSlide];
            const newSlide = slides[index];

            

            // GSAP animation for smooth transition
            gsap.to(oldSlide, {
                transform:`${direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)'}`,
                ease: "power2.out",
                duration:0.2
            });

            gsap.fromTo(newSlide, 
                { transform:`${direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)'}` },
                { 
                    duration:0.2,
                    transform:'translateX(0)',
                    ease: "power2.out",
                    onComplete: () => {
                        oldSlide.classList.remove('active');
                        newSlide.classList.add('active');
                        isAnimating = false;
                    }
                }
            );

            currentSlide = index;
        }

         // Auto-play (optional - every 5 seconds)
         setInterval(() => {
             if(slideClicked) {
                 slideClicked = false
                 return;
             }
             const nextIndex = (currentSlide + 1) % slides.length;
             goToSlide(nextIndex, 'right');
         }, 5000);

         // Reviews Section Animation
         const reviewCards = document.querySelectorAll('.review-card');
         const reviewDots = document.querySelectorAll('.review-dot');
         const reviewNavPrev = document.querySelector('.review-nav-prev');
         const reviewNavNext = document.querySelector('.review-nav-next');
         
         if (reviewCards.length > 0 && reviewDots.length > 0) {
             let currentReview = 0;
             let isReviewAnimating = false;

             function showReview(index) {
                 if (isReviewAnimating || index === currentReview) return;
                 isReviewAnimating = true;

                 const oldCard = reviewCards[currentReview];
                 const newCard = reviewCards[index];

                 // Animate out current card with blur/opacity
                 gsap.to(oldCard, {
                     opacity: 0,
                     filter: 'blur(10px)',
                     duration: 0.6,
                     ease: 'power2.in',
                     onComplete: () => {
                         oldCard.classList.remove('active');
                     }
                 });

                 // Animate in new card with blur/opacity
                 gsap.fromTo(newCard, 
                     { opacity: 0, filter: 'blur(10px)' },
                     { 
                         opacity: 1,
                         filter: 'blur(0px)',
                         duration: 0.6,
                         ease: 'power2.out',
                         delay: 0.1,
                         onComplete: () => {
                             newCard.classList.add('active');
                             isReviewAnimating = false;
                         }
                     }
                 );

                 // Update dots
                 reviewDots[currentReview].classList.remove('active');
                 reviewDots[index].classList.add('active');

                 currentReview = index;
             }

             // Initialize first review
             reviewCards[0].classList.add('active');
             gsap.set(reviewCards[0], { opacity: 1, filter: 'blur(0px)' });

             // Dot navigation
             reviewDots.forEach((dot, index) => {
                 dot.addEventListener('click', () => {
                     showReview(index);
                 });
             });

             // Arrow navigation
             if (reviewNavPrev) {
                 reviewNavPrev.addEventListener('click', () => {
                     const prevIndex = (currentReview - 1 + reviewCards.length) % reviewCards.length;
                     showReview(prevIndex);
                 });
             }

             if (reviewNavNext) {
                 reviewNavNext.addEventListener('click', () => {
                     const nextIndex = (currentReview + 1) % reviewCards.length;
                     showReview(nextIndex);
                 });
             }
         }

         // Get In Touch Section Animation
         document.fonts.ready.then(() => {
             const getInTouchHero = document.querySelector('.get-in-touch-hero');
             if (getInTouchHero) {
                 let splitTouchHero = SplitText.create([".get-in-touch-hero"], { type: "words" });
                 gsap.fromTo(splitTouchHero.words, {
                     opacity: 0,
                     filter: 'blur(10px)'
                 }, {
                     opacity: 1,
                     filter: 'blur(0px)',
                     duration: 1,
                     stagger: 0.1,
                     delay: 0.5,
                     scrollTrigger: {
                         trigger: getInTouchHero,
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });
             }

             // Animate arrow indicator
             const heroArrowIndicator = document.getElementById('heroArrowIndicator');
             if (heroArrowIndicator) {
                 gsap.fromTo(heroArrowIndicator, {
                     opacity: 0,
                     scale: 0
                 }, {
                     opacity: 1,
                     scale: 1,
                     duration: 0.6,
                     delay: 1.2,
                     ease: 'back.out(1.7)',
                     scrollTrigger: {
                         trigger: getInTouchHero,
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });

                 // Click handler to scroll to form
                 heroArrowIndicator.addEventListener('click', () => {
                     const form = document.querySelector('.get-in-touch-right');
                     if (form) {
                         if (isMobile) {
                             form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                         } else {
                             if (smoother) {
                                 smoother.scrollTo('.get-in-touch-right', true, "top top");
                             } else {
                                 gsap.to(window, {
                                     duration: 1,
                                     scrollTo: form,
                                     ease: 'power3.inOut'
                                 });
                             }
                         }
                     }
                 });
             }

             // Animate left content
             const getInTouchLeft = document.querySelector('.get-in-touch-left');
             if (getInTouchLeft) {
                 gsap.fromTo(getInTouchLeft, {
                     opacity: 0,
                     x: -50
                 }, {
                     opacity: 1,
                     x: 0,
                     duration: 0.8,
                     scrollTrigger: {
                         trigger: getInTouchLeft,
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });
             }

             // Animate form fields
             const formFields = document.querySelectorAll('.get-in-touch-form .form-field-group');
             formFields.forEach((field, index) => {
                 gsap.fromTo(field, {
                     opacity: 0,
                     y: 30
                 }, {
                     opacity: 1,
                     y: 0,
                     duration: 0.6,
                     delay: 0.2 + (index * 0.1),
                     scrollTrigger: {
                         trigger: '.get-in-touch-right',
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });
             });
         });

         // Get In Touch Form Submission
         const getInTouchForm = document.getElementById('getInTouchForm');
         if (getInTouchForm) {
             getInTouchForm.addEventListener('submit', (e) => {
                 e.preventDefault();
                 const formData = new FormData(getInTouchForm);
                 const data = Object.fromEntries(formData);
                 console.log('Get in Touch form submitted:', data);
                 
                 // You can add your form submission logic here
                 // For example, using fetch to send to an API
                 
                 // Show success message
                 alert('Thank you for reaching out! We\'ll get back to you soon.');
                 getInTouchForm.reset();
                 
                 // Form reset handled by browser
             });
         }

         // Contact Form Animation - Declare variables first
        const contactOverlay = document.getElementById('contactOverlay');
        const contactFormPanel = document.getElementById('contactFormPanel');
        const contactCloseBtn = document.getElementById('contactCloseBtn');
        const getQuoteBtn = document.getElementById('getQuoteBtn');
        const contactForm = document.getElementById('contactForm');
        
        // Only initialize if elements exist
        if (contactOverlay && contactFormPanel && getQuoteBtn) {
            const formGroups = document.querySelectorAll('.form-group');
            const formTitle = document.querySelector('.contact-form-title');
            const formSubtitle = document.querySelector('.contact-form-subtitle');

        // Create timeline for opening animation
        const openTimeline = gsap.timeline({ paused: true });

        // Set initial states
        gsap.set(contactOverlay, { opacity: 0 });
        gsap.set(contactFormPanel, { x: '100%' });
        gsap.set([formTitle, formSubtitle, ...formGroups, contactForm.querySelector('.btn-submit')], { 
            opacity: 0, 
            y: 30 
        });

        // Open animation
        openTimeline
            .to(contactOverlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(contactFormPanel, {
                x: '0%',
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.1')
            .to([formTitle, formSubtitle], {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.4')
            .to(formGroups, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.3')
            .to(contactForm.querySelector('.btn-submit'), {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.2');

        // Close animation
        const closeTimeline = gsap.timeline({ paused: true });

        closeTimeline
            .to([contactForm.querySelector('.btn-submit'), ...formGroups].reverse(), {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in'
            })
            .to([formTitle, formSubtitle], {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.in'
            }, '-=0.2')
            .to(contactFormPanel, {
                x: '100%',
                duration: 0.6,
                ease: 'power3.in'
            }, '-=0.1')
            .to(contactOverlay, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    contactOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

        // Open contact form
        function openContactForm() {
            contactOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            openTimeline.restart();
        }

        // Close contact form
        function closeContactForm() {
            closeTimeline.restart();
        }

        // Event listeners
        getQuoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactForm();
        });

        contactCloseBtn.addEventListener('click', () => {
            closeContactForm();
        });

        // Close on overlay click (outside panel)
        contactOverlay.addEventListener('click', (e) => {
            if (e.target === contactOverlay) {
                closeContactForm();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactOverlay.classList.contains('active')) {
                closeContactForm();
            }
        });

        // Form submission
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Here you can add form submission logic
                // For now, just show an alert
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                console.log('Form submitted:', data);
                
                // You can add your form submission logic here
                // For example, using fetch to send to an API
                
                // Show success message (you can customize this)
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                closeContactForm();
            });
        }
        } // End of contact form initialization check

        // FAQ Accordion and Search Functionality
        document.addEventListener('DOMContentLoaded', () => {
            const faqItems = document.querySelectorAll('.faq-item');
            const faqSearchInput = document.getElementById('faqSearch');

            if (faqItems.length > 0) {
                // Accordion toggle functionality
                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question');
                    if (question) {
                        question.addEventListener('click', () => {
                            const isActive = item.classList.contains('active');
                            
                            // Close all items
                            faqItems.forEach(faqItem => {
                                faqItem.classList.remove('active');
                            });
                            
                            // Open clicked item if it wasn't active
                            if (!isActive) {
                                item.classList.add('active');
                            }
                        });
                    }
                });

                // FAQ Search Functionality
                const faqSearchClear = document.getElementById('faqSearchClear');
                
                // Function to toggle clear button visibility
                const toggleClearButton = () => {
                    if (faqSearchClear && faqSearchInput) {
                        if (faqSearchInput.value.trim().length > 0) {
                            faqSearchClear.classList.add('visible');
                        } else {
                            faqSearchClear.classList.remove('visible');
                        }
                    }
                };

                // Function to perform search
                const performSearch = (searchTerm) => {
                    faqItems.forEach(item => {
                        const questionText = item.getAttribute('data-question')?.toLowerCase() || '';
                        const answerElement = item.querySelector('.faq-answer p');
                        const answerText = answerElement ? answerElement.textContent.toLowerCase() : '';
                        
                        // Check if search term matches question or answer
                        if (searchTerm === '' || questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                };

                if (faqSearchInput) {
                    // Show/hide clear button on input
                    faqSearchInput.addEventListener('input', (e) => {
                        const searchTerm = e.target.value.toLowerCase().trim();
                        toggleClearButton();
                        performSearch(searchTerm);
                    });

                    // Show/hide clear button on page load
                    toggleClearButton();
                }

                // Clear button functionality
                if (faqSearchClear && faqSearchInput) {
                    faqSearchClear.addEventListener('click', () => {
                        faqSearchInput.value = '';
                        faqSearchInput.focus();
                        toggleClearButton();
                        performSearch('');
                    });
                }
            }
        });

        // FAQ Section Animation
        document.fonts.ready.then(() => {
            const faqTitle = document.querySelector('.faq-title');
            if (faqTitle) {
                let splitFaqTitle = SplitText.create([".faq-title"], { type: "words" });
                gsap.fromTo(splitFaqTitle.words, {
                    opacity: 0,
                    filter: 'blur(10px)'
                }, {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    stagger: 0.1,
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: faqTitle,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }

            // Animate FAQ items on scroll
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
                gsap.fromTo(item, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Animate search input
            const faqSearchContainer = document.querySelector('.faq-search-container');
            if (faqSearchContainer) {
                gsap.fromTo(faqSearchContainer, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: faqSearchContainer,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            }

            // Animate FAQ header background
            const faqHeader = document.querySelector('.faq-header');
            if (faqHeader) {
                gsap.fromTo(faqHeader, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: faqHeader,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });