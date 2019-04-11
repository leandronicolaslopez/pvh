const users =
    [
        {
            id: 1,
            name: "Tommy Hilfiger",
            gender: "male",
            email: "test@pvh.com",
            phone: "+31612345678",
            address: [
                {
                    number: 7,
                    street: "Danzigerkade",
                    city: "Amsterdam",
                    zipcode: "1234 AB"
                }
            ]
        }
    ]

const getUsers = () => {
    return users
}

const createUser = (user) => {
    //We create a new id: Highest user id + 1
    if (users.length > 0) {
        user.id = users[users.length - 1].id + 1
    } else {
        user.id = 1
    }

    users.push(user)
    return user
}

const editUser = (userNewData) => {
    let userOldData, index

    //We find the user and its index in the collection
    for (let i in users) {
        let user = users[i]
        if (user.id == userNewData.id) {
            userOldData = user
            index = i
            break;
        }
    }

    if (!userOldData) {
        //If not found, the method returns null
        return null
    } else {
        const updatedUser = Object.assign(userOldData, userNewData)
        users.splice(index, 1, updatedUser)
        return updatedUser
    }
}

const deleteUser = (id) => {

    for (let i in users) {
        if (users[i].id == id) {
            users.splice(i, 1);
            return true
        }
    }

    return false
}

export default
    {
        getUsers,
        createUser,
        editUser,
        deleteUser
    }