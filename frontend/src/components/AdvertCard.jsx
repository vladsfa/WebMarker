import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Form} from "react-router-dom"
import "../styles/advertCard.css"
import AdverCardMain from "./AdvertCardMain";
import { base_url } from "../data/constants";

export default function AdverCard({ad, q_id, room, set_room}){
    const [searchParams, _] = useSearchParams()
    const [group_id, set_group_id] = useState('')
    useEffect(() => set_group_id(ad.group ? ad.group : ''), [ad.group])
    const navigate = useNavigate();
    const location = useLocation();

    const buildSearchUrl = (params) => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([name, v]) => {
            if (!v){
                searchParams.delete(name)
            }
            else{
                searchParams.set(name, v)
            }
        })

        const url = new URL(base_url + location.pathname)
        url.search = searchParams.toString()

        return url.pathname + url.search
    }

    return (
        <div className="cont">
            <div className="header_cont">
                <div className="header">
                    <div className="id_cont">
                        <p className="id">{ad.data.id}</p>
                    </div>
                    {ad.diff != null && (
                        <div className="diff_cont">
                            <p className="diff">{ad.diff.toFixed(4)}</p>
                        </div>
                    )}
                    <div className="group_cont">
                        <Form method="post" action={buildSearchUrl({'rangeBy': searchParams.get('rangeBy')})}>
                            <input
                                type="text"
                                name="group_id" 
                                defaultValue={group_id} 
                                className="group"/>
                            <input type="hidden" name="form_id" value="group_change"/>
                            <input type="hidden" name="advert_id" value={ad.data.id}/>
                        </Form>
                    </div>
                    {ad.data.id == q_id && ad.group == null && (
                        <div className="group_gen_cont">
                            <Form method="post" action={buildSearchUrl({
                                'rangeBy': searchParams.get('rangeBy'),
                                'top': searchParams.get('top')
                            })}>
                                <button type="submit" className="group_gen">+</button>
                                <input type="hidden" name="form_id" value="group_gen"/>
                                <input type="hidden" name="advert_id" value={ad.data.id}/>
                            </Form>
                        </div>
                    )}
                </div>
            </div>
            <div className="main_cont">
                <AdverCardMain ad={ad.data} room_info={ad.room_types} room={room} set_room={set_room}/>
            </div>
            <div className="footer_cont">
                {ad.data.id != q_id && (
                    <div className="footer">
                        <div className="choose_build_cont">
                            <button
                                className="choose_build"
                                onClick={() => navigate(buildSearchUrl({'rangeBy': ad.data.id, 'top': null}))}
                            >
                                Вибрати для побудови
                            </button>
                        </div>
                        <div className="set_group_cont">
                            <Form
                                method="post"
                                action={buildSearchUrl({'rangeBy': searchParams.get('rangeBy'), 'top': null})}
                            >
                                <button name="q_id" value={q_id} className="set_group" type="submit">
                                    Однакова група
                                </button>
                                <input type="hidden" name="form_id" value="group_set"/>
                                <input type="hidden" name="advert_id" value={ad.data.id}/>
                            </Form>
                        </div>
                        {searchParams.get('top') != ad.data.id && (
                            <div className="on_top_cont">
                                <button
                                    className="on_top"
                                    onClick={() => navigate(buildSearchUrl({'rangeBy': searchParams.get('rangeBy'), 'top': ad.data.id}))}
                                >
                                    В топ
                                </button>
                            </div>
                        )}
                        {searchParams.get('top') == ad.data.id && (
                            <div className="on_top_cont">
                                <button
                                    className="from_top"
                                    onClick={() => navigate(buildSearchUrl({'rangeBy': searchParams.get('rangeBy'), 'top': null}))}
                                >
                                    Забрати з топу
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}