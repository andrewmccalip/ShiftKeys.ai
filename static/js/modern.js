// Modern JavaScript for ShiftKeys.ai

// Navigation functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('.nav-toggle');
const sections = document.querySelectorAll('section');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Link clicked:', link.getAttribute('href')); // Test log
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            console.log('Target section:', targetSection); // Test log
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                console.log('Scrolling to:', targetPosition); // Test log
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error('Target section not found:', targetId); // Error if not found
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

/* // Parallax effect for hero section - TEMPORARILY COMMENTED OUT FOR DEBUGGING
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}
*/

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
        display: none; 
        position: absolute;
        top: 50%; 
        left: 50%;
        transform: translate(-50%, calc(-50% + 20px)) scale(0.95); 
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        width: 480px; 
        padding: 20px;
        z-index: 1000;
        text-align: left;
        color: #333;
        min-height: 190px; /* Updated for consistent height with bottom content area */
        box-sizing: border-box; 
    }

    .ai-query-box.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1); /* End centered H & V, and full size */
        display: block;
    }
    
    .ai-query-content {
        display: flex;
        flex-direction: column;
        /* min-height might be added here if needed, but ai-query-box min-height should cover it */
    }

    .ai-query-input {
        display: flex;
        align-items: flex-start; 
        border: 1px solid #e0e0e0;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 15px; /* This margin is between input and bottom-content */
        height: 75px; 
        user-select: none;
        pointer-events: none;
        overflow: hidden; 
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

    .ai-query-bottom-content { /* New style for the wrapper */
        height: 60px; /* Fixed height for footer/buttons area */
        position: relative; /* For absolute positioning of children if needed, or just to establish stacking context */
        display: flex; /* To help align children if necessary */
        align-items: center; /* Vertically center content if it's shorter than 60px */
    }

    .ai-action-buttons {
        display: flex; /* Keep as flex for button layout */
        justify-content: flex-end; 
        gap: 10px; 
        /* margin-top: 15px; Removed, as parent .ai-query-bottom-content handles spacing/height */
        width: 100%; /* Ensure it takes full width of parent */
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
        /* margin-top: 15px; Removed, as parent .ai-query-bottom-content handles spacing/height */
        padding-top: 10px; 
        border-top: 1px solid #f0f0f0; 
        width: 100%; /* Ensure it takes full width of parent */
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

    // Create AI query box element with minimalistic styling
    const aiQueryBox = document.createElement('div');
    aiQueryBox.className = 'ai-query-box';
    aiQueryBox.innerHTML = `
        <div class="ai-query-content">
            <div class="ai-query-input">
                <span class="ai-cursor"></span>
                <span class="ai-placeholder">Ask me anything...</span>
                <span class="ai-query-text" tabindex="-1"></span>
                <span class="ai-timer" style="display: none;"></span>
                <span class="ai-answer" style="display: none;"></span>
            </div>
            <div class="ai-query-bottom-content">
                <div class="ai-action-buttons" style="display: none;">
                    <button class="ai-btn ai-btn-reject">Reject</button>
                    <button class="ai-btn ai-btn-regenerate">Regenerate</button>
                    <button class="ai-btn ai-btn-accept">Accept</button>
                </div>
                <div class="ai-query-footer">
                    <span class="ai-model">Claude 4</span>
                    <span class="ai-hint">Press Enter to send</span>
                </div>
            </div>
        </div>
    `;
    
    // Add to animation container
    animationContainer.appendChild(aiQueryBox);

    // Get the shift key elements
    const keyGroups = document.querySelectorAll('.minimal-key');
    const leftShift = keyGroups[0];
    const rightShift = keyGroups[1];
    
    // Check if elements exist
    if (!leftShift || !rightShift) {
        console.error('Shift key elements not found');
        return;
    }

    function runAnimation() {
        // Reset states
        leftShift.classList.remove('key-pressed');
        rightShift.classList.remove('key-pressed');
        aiQueryBox.classList.remove('show');
        shortcutContainer.style.visibility = 'visible';
        
        const placeholder = aiQueryBox.querySelector('.ai-placeholder');
        const queryText = aiQueryBox.querySelector('.ai-query-text');
        const timer = aiQueryBox.querySelector('.ai-timer');
        const answer = aiQueryBox.querySelector('.ai-answer');
        const actionButtons = aiQueryBox.querySelector('.ai-action-buttons');
        const footer = aiQueryBox.querySelector('.ai-query-footer');
        const aiCursor = aiQueryBox.querySelector('.ai-cursor');
        
        // Reset content and cursor visibility
        aiCursor.style.display = 'inline-block';
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
        }, 1900);

        // Step 4: Type the query
        setTimeout(() => {
            placeholder.style.display = 'none';
            aiCursor.style.display = 'inline-block';
            typeQuery('What is the distance from Earth to the Moon?', queryText);
        }, 2400);

        // Step 5: Show timer after query is typed
        setTimeout(() => {
            queryText.style.display = 'none';
            aiCursor.style.display = 'none';
            footer.style.display = 'none';
            timer.style.display = 'inline';
            timer.style.color = '#6e6e73';
            
            // Animate timer with minimal style
            let elapsed = 0;
            const timerInterval = setInterval(() => {
                elapsed += 0.02;
                timer.textContent = `elapsed time: ${elapsed.toFixed(2)} seconds`;
                if (elapsed >= 1.0) {
                    clearInterval(timerInterval);
                    timer.textContent = `elapsed time: ${(1.0).toFixed(2)} seconds`;
                }
            }, 20);
        }, 5350);

        // Step 6: Show answer
        setTimeout(() => {
            timer.style.display = 'none';
            aiCursor.style.display = 'none';
            answer.style.display = 'block';
            answer.style.color = '#1d1d1f';
            answer.textContent = 'The Moon is approximately 384,400 kilometers (238,855 miles) away from Earth.';
        }, 6450);

        // Step 7: Show action buttons
        setTimeout(() => {
            actionButtons.style.display = 'flex';
            footer.style.display = 'none';
        }, 6850);

        // Step 8: Hide everything
        setTimeout(() => {
            leftShift.classList.remove('key-pressed');
            rightShift.classList.remove('key-pressed');
            aiQueryBox.classList.remove('show');
        }, 9850);
    }

    function typeQuery(text, element, index = 0) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeQuery(text, element, index + 1), 50);
        }
    }

    // Run animation immediately
    runAnimation();

    // Repeat every 10.35 seconds (increased by 300ms)
    setInterval(runAnimation, 10350);
}

// Initialize shift key animation when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(createShiftKeyAnimation, 3000); // Changed delay to 3 seconds
    });
} else {
    setTimeout(createShiftKeyAnimation, 3000); // Changed delay to 3 seconds
}

// Physics simulation for floating icons - ENTIRE CLASS AND INSTANTIATION REMOVED 