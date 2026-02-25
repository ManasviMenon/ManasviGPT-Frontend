const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("user-input");
const button = document.getElementById("send-btn");

const BACKEND_URL = "http://15.134.230.129:5000/chat";

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: userText })
    });

    const data = await response.json();
    addMessage(data.answer || "No response.", "bot");

  } catch (error) {
    addMessage("Error connecting to server.", "bot");
  }
}

button.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});