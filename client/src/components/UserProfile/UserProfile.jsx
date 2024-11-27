import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import useStyle from './styles'

import { Avatar, IconButton, Typography } from '@mui/material'
import Post from '../Posts/Post/Post.jsx'
import { followUser } from '../../actions/user.js';

const UserProfile = () => {
    const classes = useStyle()
    const dispatch = useDispatch();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')))
    const userId = user?.result?.googleId || user?.result?._id

    const userProfile = useSelector((state) => state.user.userProfile)
    const base64Image = 'data:image/png;base64,' + userProfile?.userPhoto // Substitua com sua string Base64

    console.log(userProfile);


    // HANDLE FOLLOW ===============================
    const [followedUsers, setFollowedUsers] = useState(useSelector((state) => state.user.following))
    const [followed, setFollowed] = useState(followedUsers?.find((followed) => followed.id === userProfile.user_id) ? true : false)

    const handleFollow = async (e) => {

        setFollowed(!followed)
        dispatch(followUser(userId, userProfile.user_id))

    }

    const Follow = () => {

        return (followed) ?
            (
                <PersonAddAlt1Icon fontSize="small" />
            )
            :
            (
                // (user?.result?._id != userProfile?.user_id) &&
                <PersonAddAltIcon fontSize="small" />
            )
    }

    return (
        user && (
            <section className={`${classes.flex} ${classes.userProfileDetails}`}>

                {/* FOTO PERFIL */}
                {
                    (base64Image) && <Avatar className={`${classes.flex} ${classes.userPhoto}`} src={base64Image}>
                        {
                            // COLOCAR ALGO QUE PAREÇA UM MENU PARA TROCAR DE FOTO
                            // (user.result._id == userProfile.user_id)
                            // &&
                        }
                        <img className={classes.userImg} src={base64Image} alt="Imagem" />

                    </Avatar>
                }

                {/* USERNAME */}
                <h3> {userProfile.userName} </h3>

                <div className={`${classes.flex} ${classes.userDetails}`}>


                    {/* Number Of Posts */}
                    <h4> {`Posts: ${userProfile.userPostsCount} `} </h4>

                    {/* FOLLOWING */}
                    <h4> {`Following: ${userProfile.followingCount} `} </h4>

                    {/* BOTAO PARA SEGUIR OU DEIXAR */}
                    <IconButton size="small" disabled={!user?.result} style={{ color: "white" }} onClick={handleFollow}>
                        <Follow />
                    </IconButton>


                </div>

                {/* USER POSTS */}
                <div className={`${classes.flex} ${classes.postsContainer}`} >
                    {
                        userProfile.userPosts && (

                            userProfile.userPosts.map((post) => (

                                <div key={post._id}>
                                    <Post
                                        post={post}
                                    />
                                </div>
                            ))
                        )
                    }
                </div>
            </section>
        )
    )
}

export default UserProfile