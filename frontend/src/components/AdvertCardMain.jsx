import { useEffect, useState } from "react"
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Image, Space} from "antd"
import '../styles/advertCardMain.css'

const small_fields_name = [
    ['area_total', 'price', 'room_count', 'floor'],
    ['area_kitchen', 'price_sqm', 'ceiling_height', 'floor_count'],
    ['area_living', 'built_year']
]

const big_fields_name = [
    ['agency', 'wall_type_name', 'house_type_name']
]

const array_fields_name = [
    ['location', 'hidden_phones']
]


export default function AdverCardMain({ad, room_info, room, set_room}){
    const [im_idx, set_im_idx] = useState(0)
    const room_menu = getRoomMenu(room_info)
    
    useEffect(() => {
        set_im_idx(0)
    }, [room])

    const category_imgs = []
    ad.images.forEach((im) => {
        if (im.category == room)
        category_imgs.push(im)
    })

    return im_idx < category_imgs.length && (
        <div className="main">
            <div className="top">
                <div className="images_con">
                    <div className="images_utils">
                        <Dropdown
                            menu={{
                                items: room_menu,
                                selectable: true,
                                selectedKeys: [room],
                                onSelect: ({key}) => {
                                    set_room(key)
                                }
                            }}
                            overlayStyle={{
                                maxHeight: "300px",
                                overflow: "auto"
                            }}
                            >
                            <Space>
                                {room}{'('}{room_info[room] ? room_info[room] : 0}{')'}
                                <DownOutlined/>
                            </Space>
                        </Dropdown>
                    </div>
                    <div className="image">
                        <button onClick={() => {
                            set_im_idx(Math.max(0, im_idx - 1))
                        }} className="image_btn">
                            <p style={{fontSize: "20px"}}>{'<'}</p>
                        </button>
                        <div style={{backgroundColor: 'gainsboro'}}>
                            {category_imgs.length > 0 && (
                                <Image
                                    width={420}
                                    src={`https://lunappimg.appspot.com/lun-ua/995/600/images-cropped/${category_imgs[im_idx].image_id}.jpg`}
                                />
                            )}
                        </div>
                        <button onClick={() => {
                            set_im_idx(Math.min(category_imgs.length - 1, im_idx + 1))
                        }} className="image_btn">
                            <p style={{fontSize: "20px"}}>{'>'}</p>
                        </button>
                    </div>
                </div>
                <div className="fields_con">
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {small_fields_name.map((row, i) => (
                            <div className="row" key={i}>
                                {row.map(cell_name => (
                                    <div className="cell" key={cell_name}>
                                        {cell_name}: {ad[cell_name]}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {array_fields_name.map((row, i) => (
                            <div className="row" key={i}>
                                {row.map(cell_name => (
                                    <div className="cell_big" key={cell_name}>
                                        {cell_name}: {ad[cell_name].join(', ')}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>      
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {big_fields_name.map((row, i) => (
                            <div className="row" key={i}>
                                {row.map(cell_name => (
                                    <div className="cell_big" key={cell_name}>
                                        {cell_name}: {ad[cell_name]}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="row">
                            <div className="cell_big"> 
                                {"geo"}: {ad["geo"]}
                            </div>
                        </div>
                    </div>
                    <div style={{overflow: "auto", height: "100px"}}>
                        <div className="row">
                            <div className="cell_big"> 
                                {"text"}: {ad["text"]}
                            </div>
                        </div>
                    </div>
                    {/* <div className="imp_fields_con">

                    </div>
                    <div className="unimp_fields_con"></div> */}
                </div>
            </div>
            <div className="bottom">
                <div className="text_con">

                </div>
            </div>
        </div>
    )
}

const room_types = [
    'room', 'kitchen', 'bedroom', 'bathroom', 'corridor', 'balcony', 'wardrobe', 
    'building', 'toilet', 'birdview', 'equipment', 'empty_room', 'view', 'hallway', 
    'stairs', 'layout', 'elevator', 'repair', 'entrance', 'childview', 'mailbox', 
    'pool', 'garage', 'stairway', 'sauna', 'parking', 'map', 'house', 'construction', 
    'documents']

function getRoomMenu(room_info){
    const menu = []
    room_types.forEach(room => {
        menu.push({
            key: room,
            label: (
                <div>
                    <p>{room} {"("}{room_info[room] ? room_info[room] : 0}{")"}</p>
                </div>
            )
        })
    })
    return menu
}