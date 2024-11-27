import React from 'react'
import Form from '../Form/Form'


const UserPostsSection = ( {currentId, setCurrentId} ) => {

    return (
        <>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
        </>

    )
}

export default UserPostsSection