const socket = io();

socket.on("broadcast", (data) => {
  let tabla = document.getElementById("tabla");
  const productos = data.map((product) => {
    return `<tr><th scope="row">${product.id}</th><td>${product.title}</td><td>${product.price}</td><td>${product.thumbnail}</td>`;
  });
  tabla.innerHTML = productos;
});

socket.on("mensajes", (data) => {
  render(data);
});

let render = (data) => {
  let html = data
    .map(
      (m) => `
        <div class="fila">
            <strong style="color: blue">${m.author}</strong>
            <span style="color : brown"> Fecha y hora : ${m.fecha}</span>
            <em style= "color: green">${m.text}</em>
        </div>
    `
    )
    .join(" ");
  document.getElementById("chat").innerHTML = html;
};

function mensaje(form) {
  let autor = document.getElementById("mail").value;
  let text = document.getElementById("message").value;
  let fecha = new Date();
  socket.emit("nuevo", { autor, fecha, text });
  return false;
}
