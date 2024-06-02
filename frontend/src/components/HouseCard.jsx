import '../styles/houseCard.css'

export default function HouseCard({house}){
    return (
        <div className="card">
            <div>
                <p>{house.id}</p>
            </div>
            <div className='info' style={{marginTop: "5px"}}>
                <p>{house.total}/{house.total_marked} {'('}{house.marked_not_dubl}{')'}</p>
            </div>
        </div>
    )
}