// Form navigation
function proceedToStep2() {
    const articleLink = document.getElementById('articleLink').value.trim();

    if (!articleLink) {
        alert('Please enter a valid article URL');
        return;
    }

    // Validate URL format
    try {
        new URL(articleLink);
    } catch (e) {
        alert('Please enter a valid URL');
        return;
    }

    // Store article link and proceed
    sessionStorage.setItem('articleLink', articleLink);
    document.getElementById('displayArticleLink').textContent = articleLink;

    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
}

function backToStep1() {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
    document.getElementById('loadingState').classList.add('hidden');
}

// Video generation
async function generateVideo() {
    const prompt = document.getElementById('promptInput').value.trim();
    const articleLink = sessionStorage.getItem('articleLink');

    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    // Show loading state
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('resultContainer').classList.add('hidden');

    const generateBtn = document.querySelector('.btn-generate');
    generateBtn.disabled = true;

    try {
        // Call the video generation API
        const response = await fetch('/api/generate-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                articleLink: articleLink
            })
        });

        if (!response.ok) {
            throw new Error('Video generation failed');
        }

        const data = await response.json();

        // Simulate video generation (in production, this would be the actual generated video)
        const videoData = data.videoUrl || await generateMockVideo(prompt);

        // Display result
        displayResult(videoData);

    } catch (error) {
        console.error('Error:', error);
        showStatusMessage('Error generating video: ' + error.message, 'error');
    } finally {
        document.getElementById('loadingState').classList.add('hidden');
        generateBtn.disabled = false;
    }
}

// Mock video generation for demonstration
async function generateMockVideo(prompt) {
    return new Promise((resolve) => {
        // Create a canvas-based mock video
        const canvas = document.createElement('canvas');
        canvas.width = 1280;
        canvas.height = 720;
        const ctx = canvas.getContext('2d');

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PixLab AI Video', canvas.width / 2, canvas.height / 2 - 50);

        ctx.font = '32px Arial';
        ctx.fillText(prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''), 
                     canvas.width / 2, canvas.height / 2 + 50);

        // Add Polygon branding
        ctx.font = 'bold 24px Arial';
        ctx.fillText('polygon.com', canvas.width / 2, canvas.height - 50);

        // Convert canvas to video blob
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            resolve(url);
        });
    });
}

function displayResult(videoUrl) {
    const videoPreview = document.getElementById('videoPreview');
    videoPreview.src = videoUrl;

    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('resultContainer').classList.remove('hidden');

    // Store the video URL for download/post operations
    sessionStorage.setItem('generatedVideoUrl', videoUrl);
}

// Download video
function downloadVideo() {
    const videoUrl = sessionStorage.getItem('generatedVideoUrl');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `pixlab-video-${timestamp}.mp4`;

    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showStatusMessage('✓ Video downloaded successfully!', 'success');
}

// Post to article
async function postToArticle() {
    const articleLink = sessionStorage.getItem('articleLink');
    const videoUrl = sessionStorage.getItem('generatedVideoUrl');
    const prompt = document.getElementById('promptInput').value;

    showStatusMessage('Posting to article...', 'info');

    try {
        // Call API to post to article
        const response = await fetch('/api/post-to-article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                articleLink: articleLink,
                videoUrl: videoUrl,
                prompt: prompt,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to post to article');
        }

        const data = await response.json();
        showStatusMessage('✓ Video successfully posted to ' + articleLink, 'success');

        // Log the action
        console.log('Video posted:', data);

    } catch (error) {
        console.error('Error posting:', error);
        showStatusMessage('Error posting to article: ' + error.message, 'error');
    }
}

// Status message display
function showStatusMessage(message, type = 'info') {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusEl.textContent = '';
            statusEl.className = 'status-message';
        }, 5000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a stored article link from a previous session
    const storedLink = sessionStorage.getItem('articleLink');
    if (storedLink) {
        document.getElementById('articleLink').value = storedLink;
    }
});

// Handle Enter key in input fields
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('articleLink').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            proceedToStep2();
        }
    });

    document.getElementById('promptInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateVideo();
        }
    });
});
