import { getApiResponse } from "@lib/requests"

export const fetchTrending = async ()=>{
    const data = await getApiResponse("trending/movie/week")
}