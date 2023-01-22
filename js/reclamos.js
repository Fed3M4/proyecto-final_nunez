class Reclamos {
    constructor(id) {
        this.IDReclamo = id;
        this.sector = sector.value;
        this.solicitante = nombre.value + " " + apellido.value;
        this.descripcion = descripcion.value;
        this.resuelto = false;
    }

    cerrar() {
        this.resuelto = true
    }
}