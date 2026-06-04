// Splash screen transition
        document.addEventListener('DOMContentLoaded', function() {
            const splashScreen = document.getElementById('splash-screen');
            const mainContent = document.getElementById('main-content');
            const progressBar = document.querySelector('.loading-progress');
            
            // Animate progress bar
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 100);
            
            // Hide splash screen and show main content after 3 seconds
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    mainContent.classList.add('content-visible');
                }, 800);
            }, 3000);

            // Rest of your existing JavaScript code...
            // Download App Popup
            const downloadAppBtn = document.getElementById('downloadAppBtn');
            const appPopup = document.getElementById('appPopup');
            const popupCloseBtn = document.getElementById('popupCloseBtn');

            downloadAppBtn.addEventListener('click', () => {
                appPopup.classList.add('active');
            });

            popupCloseBtn.addEventListener('click', () => {
                appPopup.classList.remove('active');
            });

            // Close popup when clicking outside
            appPopup.addEventListener('click', (e) => {
                if (e.target === appPopup) {
                    appPopup.classList.remove('active');
                }
            });

            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on a link
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
            
            // Smooth scrolling for anchor links
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
            
            // Scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                observer.observe(el);
            });
            
            // BMI Calculator
            const heightInput = document.getElementById('heightInput');
            const weightInput = document.getElementById('weightInput');
            const calculateBtn = document.getElementById('calculateBtn');
            const resetBtn = document.getElementById('resetBtn');
            const bmiPlaceholder = document.getElementById('bmiPlaceholder');
            const bmiResult = document.getElementById('bmiResult');
            const bmiValue = document.getElementById('bmiValue');
            const bmiCategory = document.getElementById('bmiCategory');
            const caloriesValue = document.getElementById('caloriesValue');
            const healthStatus = document.getElementById('healthStatus');
            
            calculateBtn.addEventListener('click', () => {
                const height = parseFloat(heightInput.value);
                const weight = parseFloat(weightInput.value);
                
                if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                    alert('Please enter valid height and weight values.');
                    return;
                }
                
                // Calculate BMI
                const heightInMeters = height / 100;
                const bmi = weight / (heightInMeters * heightInMeters);
                const roundedBmi = Math.round(bmi * 10) / 10;
                
                // Determine category and calories
                let category, calories;
                
                if (bmi < 18.5) {
                    category = 'Underweight';
                    calories = 2500;
                } else if (bmi < 25) {
                    category = 'Normal Weight';
                    calories = 2200;
                } else if (bmi < 30) {
                    category = 'Overweight';
                    calories = 1800;
                } else {
                    category = 'Obese';
                    calories = 1600;
                }
                
                // Update UI
                bmiValue.textContent = roundedBmi;
                bmiCategory.textContent = category;
                caloriesValue.textContent = `${calories} kcal`;
                healthStatus.textContent = category;
                
                // Show results
                bmiPlaceholder.style.display = 'none';
                bmiResult.style.display = 'block';
            });
            
            resetBtn.addEventListener('click', () => {
                heightInput.value = '';
                weightInput.value = '';
                bmiPlaceholder.style.display = 'flex';
                bmiResult.style.display = 'none';
            });
            
            // Contact Form
            const contactForm = document.getElementById('contactForm');
            const formSuccess = document.getElementById('formSuccess');
            
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('nameInput').value;
                const email = document.getElementById('emailInput').value;
                const message = document.getElementById('messageInput').value;
                
                // Create mailto link with form data
                const subject = encodeURIComponent(`New Message from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                const mailtoLink = `mailto:flexnutri1@gmail.com?subject=${subject}&body=${body}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 3000);
            });
            
            // Initialize animations on page load
            window.addEventListener('load', () => {
                // Trigger initial animations
                document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            });
            
            // Splash screen transition
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.querySelector('.loading-progress');
    
    // Animate progress bar
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
    
    // Hide splash screen and show main content after 3 seconds
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.add('content-visible');
            // Initialize star field after splash screen is gone
            initStarField();
        }, 800);
    }, 3000);

    // Download App Popup
    const downloadAppBtn = document.getElementById('downloadAppBtn');
    const appPopup = document.getElementById('appPopup');
    const popupCloseBtn = document.getElementById('popupCloseBtn');

    if (downloadAppBtn) {
        downloadAppBtn.addEventListener('click', () => {
            appPopup.classList.add('active');
        });
    }

    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', () => {
            appPopup.classList.remove('active');
        });
    }

    // Close popup when clicking outside
    if (appPopup) {
        appPopup.addEventListener('click', (e) => {
            if (e.target === appPopup) {
                appPopup.classList.remove('active');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // BMI Calculator
    const heightInput = document.getElementById('heightInput');
    const weightInput = document.getElementById('weightInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const bmiPlaceholder = document.getElementById('bmiPlaceholder');
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const caloriesValue = document.getElementById('caloriesValue');
    const healthStatus = document.getElementById('healthStatus');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);
            
            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                alert('Please enter valid height and weight values.');
                return;
            }
            
            // Calculate BMI
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            const roundedBmi = Math.round(bmi * 10) / 10;
            
            // Determine category and calories
            let category, calories;
            
            if (bmi < 18.5) {
                category = 'Underweight';
                calories = 2500;
            } else if (bmi < 25) {
                category = 'Normal Weight';
                calories = 2200;
            } else if (bmi < 30) {
                category = 'Overweight';
                calories = 1800;
            } else {
                category = 'Obese';
                calories = 1600;
            }
            
            // Update UI
            bmiValue.textContent = roundedBmi;
            bmiCategory.textContent = category;
            caloriesValue.textContent = `${calories} kcal`;
            healthStatus.textContent = category;
            
            // Show results
            bmiPlaceholder.style.display = 'none';
            bmiResult.style.display = 'block';
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            heightInput.value = '';
            weightInput.value = '';
            bmiPlaceholder.style.display = 'flex';
            bmiResult.style.display = 'none';
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const message = document.getElementById('messageInput').value;
            
            // Create mailto link with form data
            const subject = encodeURIComponent(`New Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:flexnutri1@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 3000);
        });
    }
    
    // Initialize animations on page load
    window.addEventListener('load', () => {
        // Trigger initial animations
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    });
});

// ===== CANVAS STAR/DOT FIELD WITH MOUSE FOLLOW =====
function initStarField() {
    const canvas = document.getElementById('starCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('home');

    // Resize canvas to match hero section
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Premium green color
    const GREEN = '59, 213, 51';
    const WHITE  = '255, 255, 255';

    // Build star list
    const STAR_COUNT = 220;
    const stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
        const isGreen = Math.random() < 0.45; // ~45% green, 55% white
        // Vary sizes: most are tiny (1-2 px), a few bigger (3-5 px)
        const r = Math.random();
        const radius = r < 0.6 ? 1 + Math.random() * 0.8      // tiny
                     : r < 0.9 ? 1.8 + Math.random() * 1.2    // medium
                     :           3 + Math.random() * 2;         // accent

        stars.push({
            // base position (pixels)
            bx: Math.random() * canvas.width,
            by: Math.random() * canvas.height,
            // current render position (follows base + mouse offset)
            x: 0,
            y: 0,
            radius,
            color: isGreen ? GREEN : WHITE,
            alpha: 0.25 + Math.random() * 0.65,
            // slow autonomous drift
            driftAngle: Math.random() * Math.PI * 2,
            driftSpeed: 0.08 + Math.random() * 0.12,
            // twinkle
            twinkleSpeed: 0.005 + Math.random() * 0.015,
            twinkleOffset: Math.random() * Math.PI * 2,
            // how strongly this star responds to the mouse (0.02 – 0.12)
            mouseFactor: 0.02 + Math.random() * 0.10,
            // influence radius in px (stars react only when mouse is within this)
            influenceRadius: 120 + Math.random() * 160,
        });
    }

    // Mouse tracking (in canvas-local coords)
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let targetMouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let mouseInside = false;

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        targetMouse.x = e.clientX - rect.left;
        targetMouse.y = e.clientY - rect.top;
        mouseInside = true;
    });
    heroSection.addEventListener('mouseleave', () => { mouseInside = false; });

    let lastTime = 0;

    function draw(ts) {
        const dt = Math.min(ts - lastTime, 50); // cap delta to avoid jumps
        lastTime = ts;

        // Smooth mouse interpolation
        const lerpSpeed = mouseInside ? 0.06 : 0.02;
        mouse.x += (targetMouse.x - mouse.x) * lerpSpeed;
        mouse.y += (targetMouse.y - mouse.y) * lerpSpeed;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const s of stars) {
            // Autonomous slow drift
            s.driftAngle += s.driftSpeed * 0.01;
            s.bx += Math.cos(s.driftAngle) * s.driftSpeed * 0.04;
            s.by += Math.sin(s.driftAngle) * s.driftSpeed * 0.04;

            // Wrap around edges
            if (s.bx < -10) s.bx = canvas.width + 10;
            if (s.bx > canvas.width + 10) s.bx = -10;
            if (s.by < -10) s.by = canvas.height + 10;
            if (s.by > canvas.height + 10) s.by = -10;

            // Mouse repulsion / attraction
            const dx = mouse.x - s.bx;
            const dy = mouse.y - s.by;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let offsetX = 0, offsetY = 0;
            if (dist < s.influenceRadius && dist > 0) {
                // Stars gently drift TOWARD cursor (same feel as the Hazel site)
                const strength = (1 - dist / s.influenceRadius) * s.mouseFactor * 60;
                offsetX = (dx / dist) * strength;
                offsetY = (dy / dist) * strength;
            }

            s.x = s.bx + offsetX;
            s.y = s.by + offsetY;

            // Twinkle: pulse alpha
            const twinkle = Math.sin(ts * s.twinkleSpeed + s.twinkleOffset);
            const alpha = Math.max(0.08, s.alpha + twinkle * 0.25);

            // Draw dot
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);

            // Larger green dots get a subtle glow via radial gradient
            if (s.radius > 2.5 && s.color === GREEN) {
                const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 3);
                grad.addColorStop(0,   `rgba(${s.color}, ${alpha})`);
                grad.addColorStop(0.4, `rgba(${s.color}, ${alpha * 0.5})`);
                grad.addColorStop(1,   `rgba(${s.color}, 0)`);
                // Draw glow halo first
                ctx.save();
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();
                // Then the solid dot
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            }

            ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
}





        });