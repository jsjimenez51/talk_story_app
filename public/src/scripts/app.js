// DOM queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-mssg");

// add a new chat
newChatForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener("submit", e => {
  e.preventDefault();
  // update name via Chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset form
  newNameForm.reset();
  // show then hide the update message
  updateMsg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMsg.innerText = ""), 2000);
});

// check local storage for existing username
const username = localStorage.username ? localStorage.username : "Anonymous";

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));
