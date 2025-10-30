
const precioGuitarra = 250000;
const precioTeclado = 380000;

const guitarras = document.getElementById("qGuitarra");
const teclados = document.getElementById("qTeclado");

const precioPua = 1500;

const puas = document.getElementById("qPuas");

const precioGuitarraTxt = document.getElementById("precioGuitarraTxt");
const precioTecladoTxt = document.getElementById("precioTecladoTxt");
const precioPuaTxt = document.getElementById("precioPuaTxt");

const sinDesc = document.getElementById("sinDesc");
const desc = document.getElementById("desc");
const totalFinal = document.getElementById("final");
const detalleTabla = document.getElementById("detalleTabla");


function formatoAr(n) { return "$" + n.toLocaleString("es-AR"); }

function descuento3x2(cantidad, precioUnit) {
  const trios = Math.floor(cantidad / 3);
  return trios * precioUnit; 
}

function calcularDescuento(cantidad, subtotal) {
  if (cantidad >= 3) {
    return subtotal * 0.15; 
  } else if (cantidad === 2) {
    return subtotal * 0.10; 
  } else {
    return 0;
  }
}

function calcular() {
  const cantG = parseInt(guitarras.value) || 0;
  const cantT = parseInt(teclados.value) || 0;

  const cantP = parseInt(puas?.value) || 0;
  const subP = cantP * precioPua;
  const descP = descuento3x2(cantP, precioPua);

  if (precioGuitarraTxt) precioGuitarraTxt.textContent = "Precio: " + formatoAr(precioGuitarra);
  if (precioTecladoTxt) precioTecladoTxt.textContent = "Precio: " + formatoAr(precioTeclado);
  if (precioPuaTxt) precioPuaTxt.textContent = "Precio: " + formatoAr(precioPua) + " • Promo 3x2";

  const subG = cantG * precioGuitarra;
  const subT = cantT * precioTeclado;

  const descG = calcularDescuento(cantG, subG);
  const descT = calcularDescuento(cantT, subT);

  const totalSin = subG + subT + subP;
  const totalDesc = descG + descT + descP;
  const total = totalSin - totalDesc;

  
  sinDesc.textContent = "$" + totalSin.toLocaleString("es-AR");
  desc.textContent = "$" + totalDesc.toLocaleString("es-AR");
  totalFinal.textContent = "$" + total.toLocaleString("es-AR");

  detalleTabla.innerHTML = `
    <tr>
      <td>Guitarras (${cantG})</td>
      <td>$${subG.toLocaleString("es-AR")}</td>
      <td>$${descG.toLocaleString("es-AR")}</td>
      <td>$${(subG - descG).toLocaleString("es-AR")}</td>
    </tr>
    <tr>
      <td>Teclados (${cantT})</td>
      <td>$${subT.toLocaleString("es-AR")}</td>
      <td>$${descT.toLocaleString("es-AR")}</td>
      <td>$${(subT - descT).toLocaleString("es-AR")}</td>
    </tr>
    <tr>
      <td>Púas (${cantP})</td>
      <td>$${subP.toLocaleString("es-AR")}</td>
      <td>$${descP.toLocaleString("es-AR")} (3x2)</td>
      <td>$${(subP - descP).toLocaleString("es-AR")}</td>
    </tr>
`;
}

guitarras.addEventListener("input", calcular);
teclados.addEventListener("input", calcular);
if (puas) puas.addEventListener("input", calcular);

calcular();
