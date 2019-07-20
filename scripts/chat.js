class Chatroom{
  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
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
  //set up a real time listener
  getChats(callback){
    this.unsub = this.chats
      .where('room','==',this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            //update the ui
            callback(change.doc.data())
          }
        });
      });
  }

  updateName(username){
    this.username = username;
    localStorage.setItem('username',username)
  }

  updateRoom(room){
    this.room = room;
    console.log('room updated');
    // if unsub has a value, then we can unsubsribe the changes from the old room
    if(this.unsub){
      this.unsub();
    }
  }
}

// const chatroom = new Chatroom('eco', 'chimp');



// setTimeout(() => {
//   chatroom.updateRoom('gaming');
//   chatroom.updateName('yoshi');
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.addChat('hi');
// },3000);