import React from 'react'
import { useSelector } from 'react-redux'

import useStyles from "./styles"

const Following = () => {
    const classes = useStyles()
    const following = useSelector((state) => state.user.following)

    console.log(`FOLLOWING: ${following}`);

    const FollowingUsers = () => {
        return(
            <>
            </>
        )

    }

    return (
        <>
            {
                following && (
                    <>
                        {
                            (following) ? (

                                following.map((post) => (

                                    <>
                                        <FollowingUsers key={1} className={classes.postCard} />
                                    </>
                                ))
                            ) : (
                                "You are not following anyone"
                            )
                        }
                    </>
                )
            }
        </>

    )
}

export default Following