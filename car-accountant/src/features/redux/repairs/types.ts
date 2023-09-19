export type partsTypes = {
  partName: string
  servicePrice: number
  clientPrice: number
  _id?: string
}

export type repairsTypes = {
  _id: string
  services: string[]
  parts: partsTypes[]
  priceForLabor: number
  note: string
  endDate: Date
  createDate: Date
  finished: boolean
  paied: boolean
  comanyHoldRepairs: string
  worker: string
}

export type repairRequest = {
  comanyHoldRepairs: string

  note: string
  parts: partsTypes[]
  priceForLabor: number
  service: string[]
  worker: string
}

export type repairState = {
  loading: boolean
  isDoneLoading: boolean
  isRejected: boolean
  repairs: repairsTypes[] | null
  error: string | null
}
