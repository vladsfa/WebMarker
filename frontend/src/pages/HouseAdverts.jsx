import { Link, useActionData, useFetcher, useLoaderData, useLocation, useNavigate, useParams, Form} from "react-router-dom";
import { loadAdverts, reloadHouse } from "../data/adverts";
import AdverCard from "../components/AdvertCard";
import { useEffect, useState } from "react";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/houseAdverts.css'

import { setGroupId, genGroupId} from "../data/adverts"
import { getNextHouseId } from "../data/houses";

export async function handleGroup(params, data){
    if (data.form_id == "group_change"){
        return setGroupId(params.house_id, data.advert_id, data.group_id, null);
    }
    else if (data.form_id == "group_gen"){
        return genGroupId(params.house_id, data.advert_id)
    }
    else if (data.form_id == "group_set"){
        return setGroupId(params.house_id, data.advert_id, null, data.q_id)
    }
    else{
        throw new Error(`unknown form id: ${data.form_id}`)
    }
}

export async function handleUtils(params, data){
    if (data.form_id == "utils_reload"){
        return reloadHouse(params.house_id)
    }
    else {
        throw new Error(`unknown form id: ${data.form_id}`)
    }
}

export async function action({params, request}){
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    
    const section = data.form_id.split('_')[0]

    if (section == "group"){
        return handleGroup(params, data)
    }
    else if (section == "utils"){
        return handleUtils(params, data)
    }
    else{
        throw new Error('')
    }
}

export async function loader({request, params}) {
    const url = new URL(request.url)

    const data = await loadAdverts(params.house_id, url.search)

    return {data}
}

export default function HouseAdverts(){
    const [room, set_room] = useState('room')
    const response = useActionData()
    const {house_id} = useParams()
    const navigate = useNavigate()

    const {data} = useLoaderData()

    useEffect(() => {
        navigate(`/houses/${house_id}/adverts?rangeBy=${data.query_id}`)
    }, [house_id])

    useEffect(() => {
        if (response){
            toast.success(response.msg)
        }
    }, [response])

    return (
        <div>
            <div className="utils_con">
                <div>
                    <Link to={'/houses'} className="houses util">Будинки</Link>
                </div>
                <div>
                    <Form method="delete">
                        <button type="submit" className="reload util">Очистити</button>
                        <input type="hidden" name="form_id" value="utils_reload"/>
                    </Form>
                </div>
                <div>
                    <button
                        onClick={() => getNextHouseId(house_id)
                            .then(next_id => {
                                navigate(`/houses/${next_id}/adverts`)
                            })
                        }
                        className="next util"
                    >
                        Наступний
                    </button>
                </div>
                <Link to={'/houses/'}></Link>
            </div>
            <div className="ads_con">
                {data.ads.map(ad => (
                    <div key={ad.data.id} className="ad">
                        <AdverCard
                            ad={ad} 
                            q_id={data.query_id} 
                            room={room}
                            set_room={set_room}
                            />
                    </div>
                ))}
            </div>
            <div>
                <ToastContainer
                    position="bottom-center"
                    hideProgressBar
                    autoClose={750}
                />
            </div>
        </div>
    )
}