import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import UserCard from '../UsersCard/UserCard.jsx'

import useStyles from "./styles"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SearchedUsers = () => {
    const classes = useStyles()
    const { userProfile } = useSelector((state) => state.user)
    console.log("userProfile", userProfile);

    const query = useQuery()
    const searchQuery = query.get('searchQuery')
    console.log("searchQuery", searchQuery);

    return (
        <div className={`${classes.flex} ${classes.CreatorCardContent}`}>
            {
                (userProfile) ? (
                    userProfile.map((user) => (
                        <div key={user.id}>
                            <UserCard creatorName={user.name} creatorId={user.id} creatorPhoto={user.photo} key={user.id} />
                        </div>
                    ))
                ) : (
                    "No Users Found!"
                )

            }
        </div>
    )
}

export default SearchedUsers