function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  document.getElementById("chatMessages").appendChild(msg);
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    appendMessage("This will connect to your backend soon.", "bot");
  }, 600);
}

function askPrompt(question) {
  document.getElementById("userInput").value = question;
  sendMessage();
}