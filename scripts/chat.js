class Chatroom{
  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
  }
  //add new chat documents
  async addChat(msg){
    //format a chat object
    const now = new Date();
    //make a chat object
    const chat = {
      msg,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    //save the chat document  created_at msg room username
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback){
    this.chats
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            //update the ui
            callback(change.doc.data())
          }
        })
      })
  }
}

const chatroom = new Chatroom('eco', 'chimp');

chatroom.getChats((data) => {
  console.log(data);
})

