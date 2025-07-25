// simulador.js

document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    {
      id: 1,
      nombre: "Zapatillas Urbanas Clásicas",
      precio: 139,
      imagen: "imagenes/zapatillas.webp"
    },
    {
      id: 2,
      nombre: "Camisa de Lino Beige",
      precio: 89,
      imagen: "imagenes/CamisetaLino.webp"
    },
    {
      id: 3,
      nombre: "Mochila Antirrobo Negra",
      precio: 159,
      imagen: "imagenes/MochilaAntirrobo.webp"
    },
    {
      id: 4,
      nombre: "Gafas de Sol Polarizadas",
      precio: 109,
      imagen: "imagenes/Lentesdesolpolarizadas.webp"
    }
  ];

  const contenedor = document.getElementById("productos-container");
  const btnCarrito = document.getElementById("ver-carrito");
  const spanCantidad = document.getElementById("cantidad-carrito");
  let carrito = [];

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

  function actualizarCantidad() {
    spanCantidad.textContent = carrito.length;
  }

  function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === parseInt(id));
    if (prod) {
      carrito.push(prod);
      actualizarCantidad();
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${prod.nombre} fue añadido al carrito.`,
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  function verCarrito() {
    if (carrito.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos para verlos aquí.', 'info');
      return;
    }

    let html = '<ul style="text-align:left">';
    let total = 0;
    carrito.forEach(item => {
      html += `<li>${item.nombre} - S/ ${item.precio}</li>`;
      total += item.precio;
    });
    html += `</ul><br><strong>Total: S/ ${total}</strong>`;

    Swal.fire({
      title: '🛒 Carrito de compras',
      html: html,
      confirmButtonText: 'Seguir comprando'
    });
  }

  contenedor.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      agregarAlCarrito(e.target.dataset.id);
    }
  });

  btnCarrito.addEventListener("click", verCarrito);
  renderizarProductos();
});
