// // Toggle Chat Popup
// function toggleChatPopup() {
//     const chatPopup = document.getElementById('chatPopup');
//     chatPopup.style.display = chatPopup.style.display === 'none' || chatPopup.style.display === '' ? 'flex' : 'none';
//   }

//   // Send Message
//   function sendMessage() {
//     const userInput = document.getElementById('userInput').value;
//     if (userInput.trim() === "") return;

//     // Display the user's message
//     const chatBox = document.getElementById('chatBox');
//     const userMessage = document.createElement('div');
//     userMessage.classList.add('chat-message', 'user-message');
//     userMessage.textContent = userInput;
//     chatBox.appendChild(userMessage);

//     // Clear the input field
//     document.getElementById('userInput').value = "";

//     // Simulate a bot response
//     const botResponse = document.createElement('div');
//     botResponse.classList.add('chat-message', 'bot-message');
//     botResponse.textContent = "You said: " + userInput;
//     chatBox.appendChild(botResponse);

//     // Scroll to the bottom
//     chatBox.scrollTop = chatBox.scrollHeight;
//   }