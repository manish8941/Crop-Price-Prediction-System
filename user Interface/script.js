// Welcome Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    // Hide welcome screen after 2 seconds
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 2000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Prediction Form Handling
    const predictionForm = document.getElementById('predictionForm');
    if (predictionForm) {
        predictionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const crop = document.getElementById('crop').value;
            const season = document.getElementById('season').value;

            // Show loading state
            const submitButton = predictionForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Predicting...';
            submitButton.disabled = true;

            try {
                // Simulate API call (replace with actual API endpoint)
                const response = await simulatePrediction(crop, season);
                showPredictionResult(response);
            } catch (error) {
                console.error('Prediction failed:', error);
                alert('Failed to get prediction. Please try again.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Chat functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.getElementById('chatMessages');

    if (chatInput && sendButton && chatMessages) {
        sendButton.addEventListener('click', () => {
            sendMessage();
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Simulate prediction API call
async function simulatePrediction(crop, season) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response data
    return {
        predictedPrice: Math.floor(Math.random() * 1000) + 500,
        confidence: Math.floor(Math.random() * 20) + 80,
        trend: Math.random() > 0.5 ? 'increasing' : 'decreasing'
    };
}

// Display prediction result
function showPredictionResult(result) {
    // Create or update prediction result display
    let resultDiv = document.querySelector('.prediction-result');
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.className = 'prediction-result';
        document.querySelector('.prediction-form').appendChild(resultDiv);
    }

    resultDiv.innerHTML = `
        <h3>Prediction Result</h3>
        <p>Predicted Price: ₹${result.predictedPrice}</p>
        <p>Confidence: ${result.confidence}%</p>
        <p>Price Trend: ${result.trend}</p>
    `;
}

// Chat functionality
function sendMessage() {
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatInput.value.trim() !== '') {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <p>${chatInput.value}</p>
            <span class="time">${new Date().toLocaleTimeString()}</span>
        `;
        
        // Add message to chat
        chatMessages.appendChild(messageDiv);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate response (replace with actual backend integration)
        setTimeout(() => {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message system-message';
            responseDiv.innerHTML = `
                <p>Thank you for your message. A community member will respond shortly.</p>
                <span class="time">${new Date().toLocaleTimeString()}</span>
            `;
            chatMessages.appendChild(responseDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Handle scroll events for navbar
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}); 