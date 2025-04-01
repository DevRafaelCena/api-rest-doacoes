export const sanitize = (cep: string): string => {
  return cep.replace(/\D/g, '');
};

export const capitalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
