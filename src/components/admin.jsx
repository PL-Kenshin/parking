import React, { useEffect, useState } from "react";

const Admin = ({socket},props) => {
    
    const [userList, setUserList] = useState([])

    useEffect(() => {
        socket.emit("getUsers",(response) => {
            setUserList(response.userList)
        })
    }, [socket])

    const handleStatusChange = async (event,user) =>{
        event.preventDefault();

        await new Promise(resolve => socket.emit("changeUserStatus", user, !user.active, (response) => {
            let items = [...userList]
            let index = items.findIndex((element) => element.username === user.username)
            items[index] = response.user
            resolve(setUserList(items))
        }))
    }

    return (
        <ul className="list-group">
            {userList.map((user, key) =>
            (
                <li className={"list-group-item d-flex flex-row " + (user.active ? "list-group-item-success" : "list-group-item-danger")} key={key}>
                    <div className="d-flex flex-grow-1 justify-content-start align-items-center">User: {user.username}</div>
                    <div className="d-flex flex-grow-1 justify-content-end align-items-center pe-2">Status: {user.active?'active':'inactive'}</div>
                    <div className="d-flex justify-content-end">
                        <button className={"btn "+ (user.active ? "btn-danger" : "btn-success")} onClick={event=>handleStatusChange(event,user)}>Change Status</button>
                    </div>
                </li>
            ))}
        </ul>
    )

}

export default Admin;