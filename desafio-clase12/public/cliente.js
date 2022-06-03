console.log("arrancamos denuevo");
const tBody = document.getElementById("renderProductos");
const socket = io();
//socket.emit("joinChat", { username });

socket.on("productos", (data) => {
  data.forEach((prod) => {
    tBody.innerHTML += `<tr>
                                <th scope="row">
                                    ${prod.id}
                                </th>
                                <td>
                                    ${prod.title}
                                </td>
                                <td>
                                    ${prod.price}
                                </td>
                                <td>
                                    <img src="${prod.thumbnail}" width="75" />
                                </td>
                            </tr>`;
  });
});

// productos.forEach(p=> {
//     <tr>
//         <th scope="row">
//             <%= p.id %>
//         </th>
//         <td>
//             <%= p.title %>
//         </td>
//         <td>
//             <%= p.price %>
//         </td>
//         <td>
//             <img src="<%=p.thumbnail%>" width="75" />
//         </td>
//     </tr>
//      })
const sendForm = document.getElementById("sendForm");
sendForm.addEventListener("submit", (e) => {
  console.log("va a recargar");
  e.preventDefault();
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");
  const product = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  };
  //console.log(product);
  socket.emit("recarga", product);
});

socket.on("ultimoProducto", (prod)=>{
    tBody.innerHTML += `<tr>
                                <th scope="row">
                                    ${1}
                                </th>
                                <td>
                                    ${prod.title}
                                </td>
                                <td>
                                    ${prod.price}
                                </td>
                                <td>
                                    <img src="${prod.thumbnail}" width="75" />
                                </td>
                            </tr>`;
})