import React from 'react'

const Code = ({ generatePreviewDocument }) => {
    return (
        <>
            <iframe
                title='preview'
                style={{ width: "100%", height: "100%", border: "none", overflow: "hidden"}}
                srcDoc={generatePreviewDocument}
            />
        </>
    )
}

export default Code