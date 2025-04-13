// Letter content
const letterText = `
Dear Shrutika,

From the moment I met you, I knew my life had changed. 
Your kindness, your grace, and your presence have brought so much light into my world. 
Every time I see you, I feel a melody playing in my heart, like a song that only we can hear.
Your smile is like a gentle note that echoes in my soul, and your laughter, the rhythm that makes everything feel right.
I can't express it all with just words, but I hope this letter, in its own way, conveys even a fraction of the emotions I feel.

With all my love,
Prashanta ❤️
`;

// Function to simulate the typing effect
function typeWriter(element, text, speed) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Show the response buttons after typing the letter
function showResponseButtons() {
  document.getElementById('response-container').classList.remove('hidden');
}

// Handle the response (Yes/No)
function respond(response) {
  let notification = document.getElementById('notification');
  if (response === 'yes') {
    notification.innerHTML = "She said YES! 💖";
    sendResponseToServer("Yes");
  } else {
    notification.innerHTML = "She said NO! 💔";
    sendResponseToServer("No");
  }
  notification.style.display = "block";
  setTimeout(function() {
    notification.style.display = "none";
  }, 3000);  // Hide notification after 3 seconds
}

// Function to send response to the server using AJAX (send to backend)
function sendResponseToServer(response) {
  fetch('/send-response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ response: response })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Notification sent successfully:", data);
  })
  .catch(error => {
    console.error("Error sending response:", error);
  });
}

// Start typing the letter when the page loads
window.onload = function() {
  let letterContainer = document.getElementById('letterContainer');
  typeWriter(letterContainer, letterText, 100); // 100ms per character

  // Show the response buttons after the letter is typed
  setTimeout(showResponseButtons, letterText.length * 100 + 1000);  // Wait until typing is done
};
