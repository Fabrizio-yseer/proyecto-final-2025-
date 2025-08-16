// simulador.js

document.addEventListener("DOMContentLoaded", () => {
  let productos = [];
  let carrito = [];

  const contenedor = document.getElementById("productos-container");
  const btnCarrito = document.getElementById("ver-carrito");
  const spanCantidad = document.getElementById("cantidad-carrito");

  // 🔹 Guardar y cargar carrito desde localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function cargarCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarCantidad();
  }

  // 🔹 Renderizar productos en pantalla
  function renderizarProductos() {
    contenedor.innerHTML = "";
    productos.forEach(producto => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: S/ ${producto.precio}</p>
        <button data-id="${producto.id}">Agregar al carrito</button>
      `;
      contenedor.appendChild(card);
    });
  }

  // 🔹 Actualizar contador del carrito
  function actualizarCantidad() {
    spanCantidad.textContent = carrito.length;
  }

  // 🔹 Agregar producto al carrito
  function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === parseInt(id));
    if (prod) {
      carrito.push(prod);
      actualizarCantidad();
      guardarCarrito();
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${prod.nombre} fue añadido al carrito.`,
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  // 🔹 Eliminar producto del carrito
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCantidad();
    guardarCarrito();
    verCarrito(); // refrescar vista
  }

  // 🔹 Mostrar carrito
  function verCarrito() {
    if (carrito.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos para verlos aquí.', 'info');
      return;
    }

    let html = '<ul style="text-align:left">';
    let total = 0;

    carrito.forEach((item, index) => {
      html += `
        <li>
          ${item.nombre} - S/ ${item.precio} 
          <button onclick="eliminarDelCarrito(${index})">❌</button>
        </li>`;
      total += item.precio;
    });

    html += `</ul><br><strong>Total: S/ ${total}</strong>`;

    Swal.fire({
      title: '🛒 Carrito de compras',
      html: html,
      confirmButtonText: 'Seguir comprando'
    });
  }

  // 🔹 Escuchadores
  contenedor.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      agregarAlCarrito(e.target.dataset.id);
    }
  });

  btnCarrito.addEventListener("click", verCarrito);

  // 🔹 Hacer fetch a productos.json
  fetch("productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data;
      renderizarProductos();
    });

  // Hacer accesible la función de eliminar al modal
  window.eliminarDelCarrito = eliminarDelCarrito;

  // Cargar carrito guardado al inicio
  cargarCarrito();
});
