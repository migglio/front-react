const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const extensiveFormat = (value) => {
  const date = new Date(value);
  date.setDate(date.getDate() + 1);

  console.log(value, date);
  return `${days[date.getDay()]} ${date.getDate()} de ${
    months[date.getMonth()]
  } del ${date.getFullYear()}`;
};

export const dateWrittenFormat = (value) => {
  const date = new Date(value);

  return `${date.getDate() + 1} de ${
    months[date.getMonth()]
  } del ${date.getFullYear()}`;
};
