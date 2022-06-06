const socket = io();

const tBody = document.getElementById("renderProductos");
const sendForm = document.getElementById("send");

socket.on("productos", (data) => {
  const productos = data
    .map((prod) => {
      const productTemplate = `<tr>
                                <th scope="row">${prod.id}</th>
                                <td>${prod.title}</td>
                                <td>${prod.price}</td>
                                <td>
                                    <img src="${prod.thumbnail}" width="75" />
                                </td>
                            </tr>`;
      return productTemplate;
    })
    .join("");
  tBody.innerHTML = productos;
});

sendForm.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  console.log(title + price);
  socket.emit("newProd", { title, price, thumbnail });
  title.value = "";
  price.value = "";
  thumbnail.value = "";
});

// chat --------------------------
const sendMessage = document.getElementById("sendMessage");
const inputEmail = document.getElementById("inputEmail");
const inputMessage = document.getElementById("inputMessage");
const messagesContainer = document.getElementById("mensajes");

//recibo el array de mjes y lo muestro
socket.on("messages", (data) => {
  const mensajes = data
    .map((mensaje) => {
      const messageTemplate = `
            <p style="color:blue">${mensaje.email} <span style="color:red">(${mensaje.time})</span>: <span style="color:green">${mensaje.message}</span></p>
        `;
      return messageTemplate;
    })
    .join("");

  messagesContainer.innerHTML = mensajes;
});

sendMessage.addEventListener("click", () => {
  const d = new Date();
  const time =
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
    " " +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
  const newMessage = {
    email: inputEmail.value,
    time: time,
    message: inputMessage.value,
  };

  socket.emit("newMessage", newMessage);
});
