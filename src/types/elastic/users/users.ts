import { ModelElasticGeoPoint } from "@/types/elastic/common"


export interface ModelElasticUser {

    user: string 
    email: string
    password: string

  }

export interface ModelElasticUsersResult {
    size: number
    items: ModelElasticUser[]
}
