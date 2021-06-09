import MainGroup from './MainGroup'

export { MainGroup }

export interface DATA {
  val: String | null
  anno: String | null
  progr: String | null
  anno_label: String | null

  created_at?: Date
  updated_at?: Date
}

export interface Props {
  row: DATA
}
