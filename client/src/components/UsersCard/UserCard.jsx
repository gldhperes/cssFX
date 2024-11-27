import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, Typography } from '@mui/material';

import { getUserProfile } from '../../actions/user';
import { profile } from '../../constants/routes';


import useStyles from "./styles"

const UserCard = ({ creatorName, creatorId, creatorPhoto, _key }) => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const base64creatorPhoto = 'data:image/png;base64,' + creatorPhoto

    function callUserProfile(creatorId) {
        dispatch(getUserProfile(creatorId))
        navigate(profile);
    }

    return (
        <div key={_key} className={`${classes.flex} ${classes.CreatorCard}`} onClick={() => { callUserProfile(creatorId) }}>

            <Avatar className={`${classes.flex} ${classes.CreatorIcon}`} src={base64creatorPhoto}>
                {
                    (creatorName) && (creatorName.charAt(0))
                }
            </Avatar>

            <Typography className={`${classes.flex} ${classes.CreatorName}`} variant="h6"> {creatorName} </Typography>

        </div>
    )

}

export default UserCard