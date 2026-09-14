// Accessibility JavaScript Functions

// Screen Reader Announcements
window.announceToScreenReader = function (message, priority = 'polite') {
    const announcer = getOrCreateAnnouncer(priority);
    announcer.textContent = '';
    setTimeout(() => {
        announcer.textContent = message;
    }, 100);
};

function getOrCreateAnnouncer(priority) {
    let announcer = document.getElementById(`aria-announcer-${priority}`);
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = `aria-announcer-${priority}`;
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
    }
    return announcer;
}

// Text-to-Speech Functions
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

window.enableTextToSpeech = function () {
    if (!speechSynthesis) {
        console.error('Speech Synthesis not supported');
        return false;
    }
    return true;
};

window.disableTextToSpeech = function () {
    if (speechSynthesis && speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
};

window.speakText = function (text, rate = 1.0, voice = null) {
    if (!speechSynthesis) return;

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.rate = rate;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;

    speechSynthesis.speak(currentUtterance);
};

window.stopSpeaking = function () {
    if (speechSynthesis && speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
};

// Contrast Ratio Calculation
window.calculateContrastRatio = function (foreground, background) {
    return 4.5; // Simplified for now
};

// Initialize accessibility
window.initializeAccessibility = function () {
    console.log('Accessibility initialized');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initializeAccessibility);
} else {
    window.initializeAccessibility();
}
