const socketClient = io(); //instancia del socket del lado del cliente

const chatEmail = document.getElementById('chatEmail');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendButton');
const msgContainer = document.getElementById('msgContainer');

sendBtn.addEventListener("click", ()=>{

    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	if( !validEmail.test(chatEmail.value) ){
		alert(`${chatEmail.value} no cumple con el formato de correo electrónico`);
	}else{

    socketClient.emit("message", {
        user: chatEmail.value,
        message: chatInput.value
    });
    chatInput.value = "";
}
});

//recibimos los mensajes del server.
socketClient.on("msgHistory",(data)=>{
    console.log(data);
    //se vacia el contenido de div
    msgContainer.innerHTML='';
    data.forEach(element => {
        //se crea un párrafo para mensaje
        const parrafo = document.createElement('p');
        //se agrega el mensaje al párrafo
        // parrafo.innerHTML=`${JSON.stringify(element)}`;
        parrafo.innerHTML=`user: ${element.user} - message: ${element.message}`;
        //se agrega al div cada párrafo que se crea
        msgContainer.appendChild(parrafo);
    });
});
