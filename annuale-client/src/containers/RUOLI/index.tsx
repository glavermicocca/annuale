import MainGroup from './MainGroup'

export { MainGroup }

export interface RUOLI {
  id?: string | null
  email?: string | null
  des_ruolo?: string | null
  tipo_ruolo?: string | null
  created_at?: Date
  updated_at?: Date
  password?: string | null
}

export interface Props {
  row: RUOLI
}
