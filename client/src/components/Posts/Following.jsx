import React from 'react'
import { useSelector } from 'react-redux'

import { Button, IconButton, Paper, Typography } from '@material-ui/core'

import useStyles from "./styles"

const Following = () => {
    const classes = useStyles()
    const following = useSelector((state) => state.user.following)

    console.log(`FOLLOWING: ${following}`);

    const FollowingUsers = ({ creator }) => {
        return (
            <Paper className={`${classes.flex} ${classes.CreatorCard}`} elevation={6} onClick={ () => { console.log("CALL AUTHOR PAGE"); } }>

                <div className={classes.CreatorIcon}>
                    <Typography variant="h6"> {creator.charAt(0)} </Typography>
                </div>


                <Typography className={`${classes.flex} ${classes.CreatorName}`} variant="h6"> {creator} </Typography>

                {/* <IconButton style={{ color: "white" }} size="small">

                    
                </IconButton> */}

            </Paper>
        )

    }

    return (
        <>
            {
                following && (
                    <>
                        {
                            (following) ? (
                                
                                following.map((creator) => (
                                    <>
                                        <FollowingUsers key={creator} creator={creator} />
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