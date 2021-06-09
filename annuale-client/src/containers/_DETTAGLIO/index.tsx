import MainGroup from './MainGroup'

export { MainGroup }

export interface PROGRESSIVO {
  val: String | null
  anno: String | null
  progr: String | null

  descrizione_errore: String | null
  tipo_errore: String | null
  metallo: String | null
  contorno: String | null
  peso: String | null
  diametro: String | null
  link: String | null

  created_at?: Date
  updated_at?: Date
}

export interface Props {
  row: PROGRESSIVO
}
