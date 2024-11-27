import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFollowing } from '../../actions/user'

import useStyles from "./styles"
import UserCard from './UserCard'

const FollowingUsers = ({ userID }) => {
    const classes = useStyles()
    const dispatch = useDispatch();
   

    const following = useSelector((state) => state.user.following)

    useEffect(() => {
        dispatch(getFollowing(userID))
    }, [userID, dispatch])

    return (
        <>
            {
                following && (
                    <div className={`${classes.flex} ${classes.CreatorCardContent}`}>
                        {
                            (following) ? (

                                following.map((creator) => (
                                    <div key={creator.id} >
                                        <UserCard creatorName={creator.name} creatorId={creator.id} creatorPhoto={creator.photo} key={creator.id} />
                                    </div>
                                ))
                            ) : (
                                <>
                                    {"You are not following anyone."}
                                </>
                            )
                        }
                    </div>
                )
            }
        </>

    )
}

export default FollowingUsers