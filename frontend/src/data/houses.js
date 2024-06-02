import { base_url } from "./constants";
import { handle_get_request } from "./utils";

const houses_url = `${base_url}/houses`

export async function loadHouses(){
    const data = await handle_get_request(houses_url)

    return data
}

export async function getNextHouseId(cur_id){
    const data = await handle_get_request(`${houses_url}/next?curHouseId=${cur_id}`)

    return data
}