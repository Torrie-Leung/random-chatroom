//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = newChatForm.msg.value.trim();
  //return a promise
  chatroom.addChat(msg)
    .then(() => {
      newChatForm.reset()
    }).catch((err) => {
      console.log(err)
    })
});

//update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  //update new name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //reset the form
  newNameForm.reset();
  //show then hide the update msg
  updateMsg.innerText = `Your name has been updated to ${newName}`;
  setTimeout(() =>updateMsg.innerText = '',3000);
});

//update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat))
  }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'anonymous';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('eco', username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));