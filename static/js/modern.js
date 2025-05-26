// Modern JavaScript for ShiftKeys.ai

// Navigation functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('.nav-toggle');
const sections = document.querySelectorAll('section');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Add shadow to navbar on scroll
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('mobile-active');
});

// Video player functionality
const demoVideo = document.getElementById('demo-video');
const playButton = document.getElementById('play-button');

if (demoVideo && playButton) {
    // Hide play button if video can autoplay
    demoVideo.addEventListener('loadedmetadata', () => {
        if (!demoVideo.paused) {
            playButton.style.display = 'none';
        }
    });

    playButton.addEventListener('click', () => {
        demoVideo.play();
        playButton.style.display = 'none';
    });

    demoVideo.addEventListener('pause', () => {
        playButton.style.display = 'flex';
    });

    demoVideo.addEventListener('play', () => {
        playButton.style.display = 'none';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .problem-item, .pricing-card');
animateElements.forEach(el => observer.observe(el));

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-links.mobile-active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: var(--shadow-lg);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .ai-query-box {
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        display: none; /* Initially hidden */
        position: absolute;
        top: 50%; /* Changed from bottom: 120% */
        left: 50%;
        transform: translate(-50%, calc(-50% + 20px)) scale(0.95); /* Start centered H, slightly down V, and smaller */
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        width: 480px; /* Increased width */
        padding: 20px;
        z-index: 1000;
        text-align: left;
        color: #333;
    }

    .ai-query-box.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1); /* End centered H & V, and full size */
        display: block;
    }
    
    .ai-query-content {
        display: flex;
        flex-direction: column;
    }

    .ai-query-input {
        display: flex;
        align-items: center;
        border: 1px solid #e0e0e0;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 15px;
        min-height: 20px; /* Ensure it has some height */
        user-select: none;
        pointer-events: none;
    }

    .ai-cursor {
        display: inline-block;
        width: 8px;
        height: 1.2em; /* Relative to font size */
        background-color: var(--dark-color, #333);
        animation: blink 1s step-end infinite;
        vertical-align: middle;
        margin-right: 4px;
    }

    @keyframes blink {
        from, to { background-color: transparent; }
        50% { background-color: var(--dark-color, #333); }
    }

    .ai-placeholder {
        color: #aaa;
        font-style: normal;
        font-weight: normal;
    }

    .ai-query-text {
        flex-grow: 1;
        outline: none;
        color: #333;
        user-select: none;
        pointer-events: none;
        font-style: normal;
        font-weight: normal;
    }
    
    .ai-timer {
        color: #6c757d;
        font-style: normal;
        font-weight: normal;
    }

    .ai-answer {
        color: var(--dark-color, #333);
        font-style: normal;
        font-weight: normal;
        margin-top: 5px;
    }

    .ai-action-buttons {
        display: flex;
        justify-content: flex-end; /* Align buttons to the right */
        gap: 10px; /* Space between buttons */
        margin-top: 15px;
    }

    .ai-btn {
        padding: 8px 15px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s ease, transform 0.1s ease;
    }
    
    .ai-btn:active {
        transform: scale(0.98);
    }

    .ai-btn-accept {
        background-color: var(--primary-color, #007bff);
        color: white;
    }
    .ai-btn-accept:hover {
        background-color: #0056b3; /* Darker shade for hover */
    }

    .ai-btn-reject, .ai-btn-regenerate {
        background-color: #f0f0f0;
        color: #555;
        border: 1px solid #ddd;
    }
    .ai-btn-reject:hover, .ai-btn-regenerate:hover {
        background-color: #e0e0e0;
    }
    
    .ai-query-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        color: #888;
        margin-top: 15px; /* Added margin */
        padding-top: 10px; /* Added padding */
        border-top: 1px solid #f0f0f0; /* Added border */
    }
    
    .ai-model {
        font-weight: bold;
    }

    .key-pressed {
        background-color: var(--primary-color) !important;
        color: white !important;
        transform: scale(0.95);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card,
    .problem-item,
    .pricing-card {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(style);

// Typing effect for hero section (optional enhancement)
const typingText = document.querySelector('.hero-subtitle');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 500);
}

// Shift key animation
function createShiftKeyAnimation() {
    const shortcutContainer = document.querySelector('.hero-shortcut');
    const animationContainer = document.querySelector('.demo-animation-container');
    if (!shortcutContainer || !animationContainer) return;

    // Create AI query box element
    const aiQueryBox = document.createElement('div');
    aiQueryBox.className = 'ai-query-box';
    aiQueryBox.innerHTML = `
        <div class="ai-query-content">
            <div class="ai-query-input">
                <span class="ai-cursor"></span>
                <span class="ai-placeholder">Type your query...</span>
                <span class="ai-query-text" tabindex="-1"></span>
                <span class="ai-timer" style="display: none;"></span>
                <span class="ai-answer" style="display: none;"></span>
            </div>
            <div class="ai-action-buttons" style="display: none;">
                <button class="ai-btn ai-btn-reject">✗ Reject</button>
                <button class="ai-btn ai-btn-regenerate">↻ Regenerate</button>
                <button class="ai-btn ai-btn-accept">✓ Accept</button>
            </div>
            <div class="ai-query-footer">
                <span class="ai-model">Claude 4</span>
                <span class="ai-hint">Press Enter to submit</span>
            </div>
        </div>
    `;
    
    // Add to animation container
    animationContainer.appendChild(aiQueryBox);

    // Get the shift key elements
    const leftShift = shortcutContainer.querySelector('.shortcut-key:first-child');
    const rightShift = shortcutContainer.querySelector('.shortcut-key:nth-child(3)');

    function runAnimation() {
        // Reset states
        leftShift.classList.remove('key-pressed');
        rightShift.classList.remove('key-pressed');
        aiQueryBox.classList.remove('show');
        shortcutContainer.style.visibility = 'visible'; // Ensure shortcut is visible at the start of the loop
        
        const placeholder = aiQueryBox.querySelector('.ai-placeholder');
        const queryText = aiQueryBox.querySelector('.ai-query-text');
        const timer = aiQueryBox.querySelector('.ai-timer');
        const answer = aiQueryBox.querySelector('.ai-answer');
        const actionButtons = aiQueryBox.querySelector('.ai-action-buttons');
        const footer = aiQueryBox.querySelector('.ai-query-footer');
        const aiCursor = aiQueryBox.querySelector('.ai-cursor'); // Get cursor element
        
        // Reset content and cursor visibility
        aiCursor.style.display = 'inline-block'; // Show cursor by default
        placeholder.style.display = 'inline';
        queryText.textContent = '';
        queryText.style.display = 'inline';
        timer.style.display = 'none';
        timer.textContent = '';
        answer.style.display = 'none';
        answer.textContent = '';
        actionButtons.style.display = 'none';
        footer.style.display = 'flex';

        // Step 1: Press left shift
        setTimeout(() => {
            leftShift.classList.add('key-pressed');
        }, 500);

        // Step 2: Press right shift
        setTimeout(() => {
            rightShift.classList.add('key-pressed');
        }, 1000);

        // Step 3: Show AI query box
        setTimeout(() => {
            aiQueryBox.classList.add('show');
            shortcutContainer.style.visibility = 'hidden'; // Hide shortcut when AI box appears
        }, 1900);

        // Step 4: Type the query
        setTimeout(() => {
            placeholder.style.display = 'none';
            aiCursor.style.display = 'inline-block'; // Ensure cursor is visible for typing
            typeQuery('Distance from Earth to Moon?', queryText);
        }, 2400);

        // Step 5: Show timer after query is typed
        setTimeout(() => {
            queryText.style.display = 'none';
            aiCursor.style.display = 'none'; // Hide cursor
            timer.style.display = 'inline';
            timer.style.color = '#6c757d';
            
            // Animate timer from 0.0s to 1.0s
            let elapsed = 0;
            const timerInterval = setInterval(() => {
                elapsed += 0.1;
                timer.textContent = `${elapsed.toFixed(1)}s elapsed...`;
                if (elapsed >= 1.0) {
                    clearInterval(timerInterval);
                }
            }, 100);
        }, 4400);

        // Step 6: Show answer after 1 second
        setTimeout(() => {
            timer.style.display = 'none';
            aiCursor.style.display = 'none'; // Hide cursor
            answer.style.display = 'inline';
            answer.style.color = 'var(--dark-color)';
            answer.textContent = 'The Moon is approximately 384,400 kilometers away from Earth.';
        }, 5500);

        // Step 7: Show action buttons and hide footer
        setTimeout(() => {
            actionButtons.style.display = 'flex';
            footer.style.display = 'none';
        }, 5900);

        // Step 8: Hide everything
        setTimeout(() => {
            leftShift.classList.remove('key-pressed');
            rightShift.classList.remove('key-pressed');
            aiQueryBox.classList.remove('show');
        }, 8900);
    }

    function typeQuery(text, element) {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    }

    // Run animation immediately
    runAnimation(); // Restored direct call to start the animation once immediately

    // Repeat every 9.4 seconds
    setInterval(runAnimation, 9400);
}

// Initialize shift key animation when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(createShiftKeyAnimation, 3000); // Changed delay to 3 seconds
    });
} else {
    setTimeout(createShiftKeyAnimation, 3000); // Changed delay to 3 seconds
}

// Physics simulation for floating icons
class IconPhysics {
    constructor() {
        this.icons = [];
        this.container = null;
        this.animationId = null;
        this.init();
    }

    init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.container = document.querySelector('.hero-visual');
        if (!this.container) {
            console.warn("IconPhysics: '.hero-visual' container not found. Animation will not run.");
            return;
        }
        
        // Ensure the container has a non-zero size before proceeding
        const containerRect = this.container.getBoundingClientRect();
        if (containerRect.width === 0 || containerRect.height === 0) {
             console.warn("IconPhysics: Container '.hero-visual' has zero width or height. Icons might not behave as expected initially.");
             // Optionally, wait for resize or DOM update if this is a common issue
        }

        const windows = this.container.querySelectorAll('.window');
        if (windows.length === 0) {
            console.warn("IconPhysics: No '.window' elements found within '.hero-visual'.");
            return;
        }

        this.icons = []; // Clear previous icons if any

        windows.forEach((window, index) => {
            const rect = window.getBoundingClientRect();
            const radius = rect.width / 2; // Assuming icons are roughly circular

            // Random initial velocity for each icon
            const speed = 10 + Math.random() * 30; // Reduced speed from 50-150 to 10-40
            const angle = Math.random() * 2 * Math.PI; // Random direction

            // Bumpers (must match animate() method's bumpers)
            const bumperLeft = 20;
            const bumperTop = 20;
            const bumperBottom = 20;
            const bumperRight = 75;

            // Calculate valid range for initial positions, considering bumpers and radius
            const minX = bumperLeft + radius;
            const maxX = containerRect.width - bumperRight - radius;
            const minY = bumperTop + radius;
            const maxY = containerRect.height - bumperBottom - radius;

            // Ensure the spawn area is valid (e.g., container is not too small for icons + bumpers)
            const spawnWidth = maxX - minX;
            const spawnHeight = maxY - minY;

            let initialX, initialY;
            if (spawnWidth > 0 && spawnHeight > 0) {
                initialX = minX + Math.random() * spawnWidth;
                initialY = minY + Math.random() * spawnHeight;
            } else {
                // Fallback if spawn area is invalid (e.g., container too small)
                // Place it in the center or at a default safe spot
                initialX = containerRect.width / 2;
                initialY = containerRect.height / 2;
                console.warn(`IconPhysics: Spawn area for icon ${index} is invalid. Defaulting to center.`);
            }
            
            const icon = {
                element: window,
                x: initialX, // Randomized X
                y: initialY, // Randomized Y
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                fx: 0, // Force x
                fy: 0, // Force y
                radius: rect.width / 2,
                mass: 1 + Math.random() * 0.5, // Varied mass for more interesting collisions
                temperature: 1.0 // Temperature factor for Brownian motion
            };
            this.icons.push(icon);
        });

        // Start animation
        this.animate();
    }

    animate() {
        const containerRect = this.container.getBoundingClientRect();
        const dt = 0.016; // ~60fps timestep
        const kT = 0.5; // Thermal energy
        const brownianForce = 8.0; // Brownian force magnitude (reduced)
        const bumperLeft = 20;
        const bumperTop = 20;
        const bumperBottom = 20;
        const bumperRight = 75; // Specific 75px bumper for the right edge
        
        // Reset forces and apply Brownian motion
        this.icons.forEach(icon => {
            // Random Brownian forces (white noise)
            const angle = Math.random() * 2 * Math.PI;
            const magnitude = Math.sqrt(-2 * Math.log(Math.random())) * brownianForce;
            icon.fx = Math.cos(angle) * magnitude * icon.temperature;
            icon.fy = Math.sin(angle) * magnitude * icon.temperature;
        });

        // Update velocities and positions using Verlet integration
        this.icons.forEach(icon => {
            // Update velocities with forces
            icon.vx += (icon.fx / icon.mass) * dt;
            icon.vy += (icon.fy / icon.mass) * dt;
            
            // NO DAMPING - removed the damping multiplication
            
            // Update positions
            icon.x += icon.vx * dt;
            icon.y += icon.vy * dt;

            // Handle wall collisions with perfect elastic bounces and specific bumpers
            if (icon.x - icon.radius <= bumperLeft) {
                icon.x = icon.radius + bumperLeft;
                icon.vx = Math.abs(icon.vx);
            } else if (icon.x + icon.radius >= containerRect.width - bumperRight) {
                icon.x = containerRect.width - icon.radius - bumperRight;
                icon.vx = -Math.abs(icon.vx);
            }
            
            if (icon.y - icon.radius <= bumperTop) {
                icon.y = icon.radius + bumperTop;
                icon.vy = Math.abs(icon.vy);
            } else if (icon.y + icon.radius >= containerRect.height - bumperBottom) {
                icon.y = containerRect.height - icon.radius - bumperBottom;
                icon.vy = -Math.abs(icon.vy);
            }
        });

        // Check collisions between particles (multiple passes for stability)
        const collisionPasses = 5; // Number of passes to resolve collisions
        for (let k = 0; k < collisionPasses; k++) {
            for (let i = 0; i < this.icons.length; i++) {
                for (let j = i + 1; j < this.icons.length; j++) {
                    this.checkCollision(this.icons[i], this.icons[j]);
                }
            }
        }

        // Apply positions to DOM with sub-pixel precision
        this.icons.forEach(icon => {
            icon.element.style.transform = `translate3d(${icon.x - icon.radius}px, ${icon.y - icon.radius}px, 0)`;
        });

        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    checkCollision(icon1, icon2) {
        const dx = icon2.x - icon1.x;
        const dy = icon2.y - icon1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = icon1.radius + icon2.radius;

        if (distance < minDistance && distance > 0) {
            // Normalize collision vector
            const nx = dx / distance;
            const ny = dy / distance;

            // Relative velocity
            const dvx = icon2.vx - icon1.vx;
            const dvy = icon2.vy - icon1.vy;
            const dvn = dvx * nx + dvy * ny;

            // Don't resolve if already separating
            if (dvn > 0) return;

            // Impulse magnitude (elastic collision with masses)
            const impulse = 2 * dvn / (1/icon1.mass + 1/icon2.mass);

            // Apply impulse to velocities
            icon1.vx += impulse * nx / icon1.mass;
            icon1.vy += impulse * ny / icon1.mass;
            icon2.vx -= impulse * nx / icon2.mass;
            icon2.vy -= impulse * ny / icon2.mass;

            // Separate particles to prevent overlap
            const overlap = minDistance - distance;
            const totalMass = icon1.mass + icon2.mass;
            const sep1 = overlap * (icon2.mass / totalMass);
            const sep2 = overlap * (icon1.mass / totalMass);
            
            icon1.x -= nx * sep1;
            icon1.y -= ny * sep1;
            icon2.x += nx * sep2;
            icon2.y += ny * sep2;

            // Add some randomness to prevent stuck particles
            const perpX = -ny;
            const perpY = nx;
            const randomForce = (Math.random() - 0.5) * 0.5;
            icon1.vx += perpX * randomForce;
            icon1.vy += perpY * randomForce;
            icon2.vx -= perpX * randomForce;
            icon2.vy -= perpY * randomForce;
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize physics simulation
const iconPhysics = new IconPhysics(); 