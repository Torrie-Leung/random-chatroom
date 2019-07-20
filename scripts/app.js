//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

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
})

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('eco', 'chimp');

//get chats and render
chatroom.getChats(data => chatUI.render(data));