import React, { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";

const Dashboard = ({socket},props) => {
    const isNotLogged = isExpired(localStorage.getItem('token'));
    const user = decodeToken(localStorage.getItem('token'));
    
    const [data, setData] = useState([]);

    useEffect(() => {
        let parking = []
        socket.emit("getParking",(response) => {
            parking = response.parking
            setData(response.parking)
        })

        socket.on('parkingChange',(parkingSpace) =>{
            let items = [...parking]
            items[parkingSpace.id-1] = parkingSpace
            setData(items)
        })
    }, [socket])

    let license = null
    const licenseInput = (e) => {
        license = e.target.value
    }

    const handleSubmit = async (event, id) => {
        event.preventDefault();

        await new Promise(resolve => socket.emit("changeParkingStatus",{"id":id,"taken":true,"license":license,"user":user.username}, (response) => {
            let items = [...data]
            items[response.parking.id-1] = response.parking
            resolve(setData(items))
        }))
    }
    
    const handleReturn = async (event,id) => {
        event.preventDefault();

        await new Promise(resolve => socket.emit("changeParkingStatus",{"id":id,"taken":false,"license":"","user":""}, (response) => {
            let items = [...data]
            items[response.parking.id-1] = response.parking
            resolve(setData(items))
        }))
    }

    return (
        <div className="row">
            {data.map((item, key) =>
            (
                <div className={"col-md-3 mb-4 text-center "} key={key}>
                    <div className={"card h-100  box-shadow text-white " + (item.taken ? "bg-danger" : "bg-success")}>
                        <div className="card-body">
                        <div>Parking Slot No. #{item.id}</div>
                        <div><strong>{item.taken ? "Taken" : "Free"}</strong></div>
                        {item.taken && <div><strong>{item.license}</strong></div>}
                        {isNotLogged && !item.taken && <div><strong>Log in to claim</strong></div>}
                        {!item.taken && !isNotLogged && <form className="px-1" onSubmit={event=>handleSubmit(event,item.id)}>
                            <label htmlFor="license" className="form-label">Enter your license plate:</label>
                            <input className="form-control" id="license" onChange={licenseInput} required></input>
                            <button type="submit" className="btn my-2 btn-primary">Claim</button>
                        </form>}
                        {(user?.username===item.user || (item.taken && user?.isAdmin)) && <button onClick={event=>handleReturn(event,item.id)} className="btn my-2 btn-primary">Return</button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )


}

export default Dashboard;