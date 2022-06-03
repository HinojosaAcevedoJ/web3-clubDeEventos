import * as contract from "../assembly";

describe("Contract", () => {
  // VIEW method tests
  it("reads data", () => {
    expect(contract.getMiembro("some key")).toStrictEqual({ cuenta: "some key", nombre: "some name", edad: 25, tipoMiembro: "some type", ciudadMiembro: "some city" });
  })

  it ("reads data from a collection", () => {
    expect(contract.getCiudades()).toStrictEqual([{ id: 1, nombre: "Ciudad 1" }, { id: 2, nombre: "Ciudad 2" }]);
  })

  it ("reads data from a collection", () => {
    expect(contract.getEventos()).toStrictEqual([{ id: 1, nombre: "Evento 1", ubicacion: "Ubicacion 1", fecha: "Fecha 1", hora: "Hora 1", descripcion: "Descripcion 1", activo: true }, { id: 2, nombre: "Evento 2", ubicacion: "Ubicacion 2", fecha: "Fecha 2", hora: "Hora 2", descripcion: "Descripcion 2", activo: true }]);
  })

  it ("reads data from a collection", () => {
    expect(contract.getAsistentes()).toStrictEqual([{ cuenta: "some key", nombre: "some name", nombreEvento: "Evento 1", ciudadEvento: "Ciudad 1" }, { cuenta: "some key", nombre: "some name", nombreEvento: "Evento 2", ciudadEvento: "Ciudad 2" }]);
  })
  
  // CHANGE method tests

  it("saves data to contract storage", () => {
    expect(contract.setCiudad(1, "Santiago-Chile")).toStrictEqual()
  })

  it("saves data to contract storage", () => {
    expect(contract.setMiembro("some name", 25, "some type", "some city")).toStrictEqual()
  })

  it("saves data to contract storage", () => {
    expect(contract.setEvento(1, "Evento 1", "Ubicacion 1", "Fecha 1", "Hora 1", "Descripcion 1", true)).toStrictEqual()
  })

  it("saves data to contract storage", () => {
    expect(contract.setAsistente("some name", "Evento 1", "Ciudad 1")).toStrictEqual()
  })

})
