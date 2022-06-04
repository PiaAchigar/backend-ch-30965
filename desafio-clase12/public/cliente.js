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
