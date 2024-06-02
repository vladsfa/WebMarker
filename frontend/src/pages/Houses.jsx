import HouseCard from "../components/HouseCard"
import { loadHouses } from "../data/houses";
import {Link, useLoaderData} from "react-router-dom"
import '../styles/houses.css'

export async function loader() {
    const houses = await loadHouses()
    
    return {houses};   
}

export default function Houses(){
    const {houses} = useLoaderData()

    return (
        <div className="houses_list_cont">
            {houses.map((house, i) => (
                <div key={house.id}>
                    <Link to={`/houses/${house.id}/adverts`}
                        style={{textDecoration: 'none', color: 'black'}}
                    >
                        <HouseCard house={house}/>
                    </Link>
                </div>
            ))}
        </div>
    )
}