import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Avatar, Typography } from '@mui/material'

import { profile } from '../../constants/routes'
import { getUserProfile } from '../../actions/user'

import useStyles from "./styles"

const UsersCards = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const following = useSelector((state) => state.user.following)
    const navigate = useNavigate()

    console.log(`FOLLOWING: ${following}`);

    function callUserProfile(creatorId) {
        dispatch(getUserProfile(creatorId))
        navigate(profile);
    }

    const FollowingUsers = ({ creatorName, creatorId, creatorPhoto, _key }) => {

        const base64creatorPhoto = 'data:image/png;base64,' + creatorPhoto

        return (
            <div key={_key} className={`${classes.flex} ${classes.CreatorCard}`} onClick={() => { callUserProfile(creatorId) }}>

                <Avatar className={`${classes.flex} ${classes.CreatorIcon}`} src={base64creatorPhoto}>
                    {/* {user.result.name.charAt(0)} */}
                    {/* <img className={classes.CreatorPhoto} src={base64creatorPhoto} alt="Imagem" /> */}
                </Avatar>

                <Typography className={`${classes.flex} ${classes.CreatorName}`} variant="h6"> {creatorName} </Typography>

                {/* <IconButton style={{ color: "white" }} size="small">

                </IconButton> */}

            </div>
        )

    }

    return (
        <>
            {
                following && (
                    <div className={`${classes.flex} ${classes.CreatorCardContent}`}>
                        {
                            (following) ? (

                                following.map((creator) => (
                                    <div key={creator.id} >
                                        <FollowingUsers creatorName={creator.name} creatorId={creator.id} creatorPhoto={creator.photo} key={creator.id} />
                                    </div>
                                ))
                            ) : (
                                <>
                                    {"You are not following anyone"}
                                </>
                            )
                        }
                    </div>
                )
            }
        </>

    )
}

export default UsersCards