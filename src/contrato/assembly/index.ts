import { PersistentUnorderedMap, logging, context, u128, ContractPromiseBatch } from 'near-sdk-as'

const TWO_NEAR = u128.from('2000000000000000000000000');
const TWENTY_NEAR = u128.from('20000000000000000000000000');

@nearBindgen
class Ciudad {
  id: u32
  nombre: string
  constructor(id: u32, nombre: string) {
    this.id = id
    this.nombre = nombre
  }
}

//Creamos una clase llamada participante
@nearBindgen
class Miembro {
  cuenta: string;
  nombre: string;
  edad: u32;
  tipoMiembro: string;
  ciudadMiembro: string;

  //Inicializamos el objeto
  constructor(cuenta: string, nombre: string, edad: u32, tipoMiembro: string, ciudadMiembro: string) {
    this.cuenta = cuenta;
    this.nombre = nombre;
    this.edad = edad;
    this.tipoMiembro = tipoMiembro;
    this.ciudadMiembro = ciudadMiembro
  }
}

@nearBindgen
class Evento {
  id: u32
  nombre: string
  ubicacion: string
  fecha: string
  hora: string
  descripcion: string
  activo: bool

  //Inicializamos el objeto
  constructor(id: u32, nombre: string, ubicacion: string, fecha: string, hora: string, descripcion: string, activo: bool) {
    this.id = id
    this.nombre = nombre
    this.ubicacion = ubicacion
    this.fecha = fecha
    this.hora = hora
    this.descripcion = descripcion
    this.activo = activo
  }
}

@nearBindgen
class Asistente {
  cuenta: string
  nombre: string
  nombreEvento: string
  ciudadEvento: string

  //Inicializamos el objeto
  constructor(nombre: string, nombreEvento: string, ciudadEvento: string) {
    this.nombre = nombre
    this.nombreEvento = nombreEvento
    this.ciudadEvento = ciudadEvento
  }
}

//Creamos una colección para almacenar información en nuestro contrato.
const ciudades = new PersistentUnorderedMap<string, Ciudad>("ciudades");
const miembros = new PersistentUnorderedMap<string, Miembro>("p");
const eventos = new PersistentUnorderedMap<string, Evento>("eventos");
const asistentes = new PersistentUnorderedMap<string, Asistente>("asistentes");
// Setters

export function setCiudad(id: u32, nombre: string): void {
  ciudades.set(id.toString(), new Ciudad(id, nombre));
}

export function setMiembro(nombre: string, edad: u32, tipoMiembro: string, ciudadMiembro: string): void {
  const cuenta = context.sender;
  const deposito = context.attachedDeposit;

  assert(edad >= 18, "Debe ser mayor de edad para ser parte del club.");
  assert(nombre.length >= 3, "El nombre debe contener 3 o más caractéres.");
  assert(deposito >= TWO_NEAR, "Debes de pagar 2 NEAR para registrarte.");

  const miembro = new Miembro(cuenta, nombre, edad, tipoMiembro, ciudadMiembro);

  miembros.set(cuenta, miembro);

  logging.log("Registro creado exitosamente.");
}

export function setEvento(id: u32, nombre: string, ubicacion: string, fecha: string, hora: string, descripcion: string, activo: bool): void {
  eventos.set(id.toString(), new Evento(id, nombre, ubicacion, fecha, hora, descripcion, activo));
}

export function setAsistente(nombre: string, nombreEvento: string, ciudadEvento: string): void {
  const cuenta = context.sender;
  const deposito = context.attachedDeposit;
  const miembro = miembros.get(cuenta)
  logging.log(miembro)
  if (miembro === null) {
    return;
  }

  assert(cuenta == miembro.cuenta, "No puedes asistir a un evento si no eres miembro del club.");
  assert(deposito >= TWENTY_NEAR, "Debes de pagar 20 NEAR para registrarte en el evento.");

  const asistente = new Asistente(nombre, nombreEvento, ciudadEvento);

  asistentes.set(cuenta, asistente);
  logging.log(miembro)
  logging.log("Registro creado exitosamente.");
}

// Getters
export function getCiudades(): Ciudad[] {
  return ciudades.values();
}

export function getCiudad(id: string): Ciudad | null {
  return ciudades.get(id);
}


export function getMiembro(cuenta: string): Miembro | null {
  return miembros.get(cuenta);
}

export function getMiembros(): Miembro[] {
  return miembros.values();
}

export function getEventos(): Evento[] {
  return eventos.values();
}

export function getEvento(id: string): Evento | null {
  return eventos.get(id);
}

export function getAsistentes(): Asistente[] {
  return asistentes.values();
}

export function getAsistente(cuenta: string): Asistente | null {
  return asistentes.get(cuenta);
}



export function setEventoEstado(id: string): void {
  assert(context.sender == "jhinojosa.testnet", "No tienes permisos para ejecutar este comando.");

  const evento = eventos.get(id);

 if (evento && evento.activo == false) {
    evento.activo = true;

    eventos.set(id, evento);
    logging.log("Evento cambiado a estado activo.");
    return;
  }
  if (evento && evento.activo == true) {
    evento.activo = false;
    eventos.set(id, evento);
    logging.log("Evento cambiado a estado inactivo");
    return;
  }
}

