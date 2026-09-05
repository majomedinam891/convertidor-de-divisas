async function cargarDivisas() {
    const respuesta = await fetch ("https://co.dolarapi.com/v1/cotizaciones")
    if(!respuesta.ok) {
        throw new Error("No se pudo cargar las divisas")
    }
    const divisas = await respuesta.json()
    return divisas
}
async function principal () {
    const result = await cargarDivisas()
    setDivisas(result)
}
principal()
    function setDivisas (divisas) {
        const selectDivisasInicial = document.getElementById("selectDivisasInicial")
        const selectDivisasFinal = document.getElementById("selectDivisasFinal")
        const botonConvertir = document.getElementById("boton")
        const inputValor = document.getElementById("valorPorCambiar")
        const h1Resultado = document.getElementById("resultado")
    // let divisasUnicas = new Set();
    // for (const item of divisas) {
    //     divisasUnicas.add(item.moneda)
    // }
    // let divisasUnicasArray =[...divisasUnicas]
        setDivisas.innerHTML = divisas.map(d => {
            const opt = document.createElement("option")
            opt.value = d.moneda;
            opt.textContent = d.nombre;
            selectDivisasInicial.appendChild(opt);
        })
    setDivisas.innerHTML = divisas.map(d => {
            const opt = document.createElement("option")
            opt.value = d.moneda;
            opt.textContent = d.nombre;
            selectDivisasFinal.appendChild(opt);
        })
    botonConvertir.addEventListener("click", ()=> {
        const deMoneda = selectDivisasInicial.value
        const aMoneda = selectDivisasFinal.value
        const cantidad = inputValor.value
        const objInicial = divisas.find(d => d.moneda === deMoneda)
        const objFinal = divisas.find(d => d.moneda === aMoneda)
        let resultado = 0;
        switch (deMoneda) {
            default:
                resultado = (cantidad * objInicial.ultimoCierre) / objFinal.ultimoCierre;
                break;
        }

        h1Resultado.textContent = resultado;
    })
}
    
