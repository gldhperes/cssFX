import React, { useEffect } from 'react'

import useStyles from './styles.js'

const Code_Viewer = ({ htmlCode, cssCode }) => {

    const classes = useStyles()

    // console.log("code viewer: ", htmlCode, cssCode);
    

    function HTMLRenderer({ html }) {
        return <div id="htmlRenderer" dangerouslySetInnerHTML={{ __html: html }} />;
    }

    function CSSRenderer({ css }) {
        useEffect(() => {
            const styleElement = document.createElement("style");
            styleElement.innerText = css;
            const htmlRenderer = document.getElementById("htmlRenderer")

            htmlRenderer.appendChild(styleElement);

            return () => {
                htmlRenderer.removeChild(styleElement);
            };
        }, [css]);

        return null;
    }



    return (
        <div id="code_viewer" className={`${classes.code_viewer} ${classes.flex}`} >

            {/* {(htmlCode !== null && cssCode !== null) && */}
                <>
                    <HTMLRenderer html={htmlCode} />
                    <CSSRenderer css={cssCode} />
                </>
            {/* } */}
        </div>
    )
}



export default Code_Viewer