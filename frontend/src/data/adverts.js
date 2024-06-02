import { base_url } from "./constants";
import { handle_delete_request, handle_get_request, handle_post_request } from "./utils";


export async function loadAdverts(house_id, search){
    const data = handle_get_request(`${base_url}/houses/${house_id}/adverts${search}`);

    return data;
}

export async function setGroupId(house_id, advert_id, group_id=null, q_id=null){
    let query_param = null
    if (q_id){
        query_param = `?q_id=${q_id}`
    }
    
    const response = handle_post_request(
        `${base_url}/houses/${house_id}/adverts/${advert_id}/group${q_id ? query_param : ''}`,
        {
            'group_id': group_id
        }
    );
    
    return response;
}

export async function genGroupId(house_id, advert_id){
    const response = handle_post_request(
        `${base_url}/houses/${house_id}/adverts/${advert_id}/group/gen`,
        null
    )

    return response;
}

export async function reloadHouse(house_id){
    const response = handle_delete_request(`${base_url}/houses/${house_id}/adverts`)

    return response;
}