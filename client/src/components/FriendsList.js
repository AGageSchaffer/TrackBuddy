import React, { useState, useEffect } from "react"


function FriendsList(){

    const [friendArr, setFriendArr] = useState([])

    useEffect(() => {
        fetch("/friends").then((r) => {
              if (r.ok) {
                r.json().then((friendArr) => setFriendArr(friendArr));
              }
            });
          
    }, []);

    function removeFriend(id){
        const removedFriend = friendArr.filter(obj => obj.id !== id)
        setFriendArr(removedFriend)
        fetch(`/friends/${id}`, {method: "DELETE"})
    }

    const friendsList = friendArr.map((friendObj) => {
        const friend = friendObj.friender
        return <div>
            <h3><button onClick={() => removeFriend(friendObj.id)}>Remove Friend</button>{friend.username}</h3>
            <h5>{friend.firstName} {friend.lastName}</h5>
        </div>
    })

    return(
        <div>
            {friendsList}
        </div>
    )
}

export default FriendsList