// ===== Backend API =====
const API_URL = "https://api.manasvigpt.online/chat";

// ===== UI helpers =====
function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  document.getElementById("chatMessages").appendChild(msg);

  // auto-scroll to latest message
  msg.scrollIntoView({ behavior: "smooth", block: "end" });
}

async function callBackend(userText) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: userText })
  });

  // If backend returns an error, show raw text for debugging
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.answer;
}

// ===== Main send function =====
async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  // Show user's message
  appendMessage(text, "user");
  input.value = "";

  // Show a temporary bot message ("Typing...")
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "bot");
  typingDiv.innerText = "Typing...";
  document.getElementById("chatMessages").appendChild(typingDiv);
  typingDiv.scrollIntoView({ behavior: "smooth", block: "end" });

  try {
    // Call backend
    const answer = await callBackend(text);

    // Replace typing with real answer
    typingDiv.innerText = answer;
  } catch (err) {
    // Show error in chat + console
    typingDiv.innerText = `Error: ${err.message}`;
    console.error(err);
  }
}

// ===== Quick prompt buttons helper =====
function askPrompt(question) {
  document.getElementById("userInput").value = question;
  sendMessage();
}

// ===== Optional: Enter key to send =====
// If you already handle Enter key elsewhere, you can remove this.
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});