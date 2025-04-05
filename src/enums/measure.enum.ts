export enum Measure {
  KILOGRAMA = 'KG',
  GRAMA = 'G',
  LITRO = 'L',
  MILILITRO = 'ML',
  UNIDADE = 'UNID',
  CAIXA = 'CX',
  PACOTE = 'PC',
  SACO = 'SC',
  METRO = 'M',
  CENTIMETRO = 'CM'
}

export const measureLabels: Record<Measure, string> = {
  [Measure.KILOGRAMA]: 'Quilograma',
  [Measure.GRAMA]: 'Grama',
  [Measure.LITRO]: 'Litro',
  [Measure.MILILITRO]: 'Mililitro',
  [Measure.UNIDADE]: 'Unidade',
  [Measure.CAIXA]: 'Caixa',
  [Measure.PACOTE]: 'Pacote',
  [Measure.SACO]: 'Saco',
  [Measure.METRO]: 'Metro',
  [Measure.CENTIMETRO]: 'Centímetro'
}; 