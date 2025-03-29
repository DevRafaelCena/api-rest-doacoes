export const sanitizeCep = (cep: string): string => {
  return cep.replace(/\D/g, '');
};
