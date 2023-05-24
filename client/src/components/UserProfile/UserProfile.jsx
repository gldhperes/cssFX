import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import useStyle from './styles'
import Post from '../Posts/Post/Post'
import { Avatar } from '@material-ui/core'

const UserProfile = () => {
    const userProfile = useSelector((state) => state.user.userProfile)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const classes = useStyle()

    console.log(userProfile);
    const base64Image = 'data:image/png;base64,' + userProfile?.userPhoto // Substitua com sua string Base64
    return (
        userProfile && (
            <section className={`${classes.flex} ${classes.userProfileDetails}`}>

                {/* FOTO PERFIL */}
                <Avatar className={`${classes.flex} ${classes.userPhoto}`} src={base64Image}>
                    {
                        // COLOCAR ALGO QUE PAREÇA UM MENU PARA TROCAR DE FOTO
                        // (user.result._id == userProfile.user_id)
                        // &&
                    }
                    <img className={classes.userImg} src={base64Image} alt="Imagem" />

                </Avatar>

                {/* USERNAME */}
                <h3> {userProfile.userName} </h3>

                <div className={`${classes.flex} ${classes.userDetails}`}>


                    {/* Number Of Posts */}
                    <h4> {`Posts: ${userProfile.userPostsCount} `} </h4>

                    {/* FOLLOWING */}
                    <h4> {`Following: ${userProfile.followingCount} `} </h4>

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