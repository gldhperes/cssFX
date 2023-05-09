import React, { useState } from 'react'

// ACE IMPORTS
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"


import useStyles from './styles.js'
const CodeEditors = ({ post }) => {

    const classes = useStyles()
    const htmlCode = post?.htmlCode
    const cssCode = post?.cssCode
    const backendCode = post?.backendCode

    const [mode, setMode] = useState('html');

    const changeMode = (newMode) => {
        setMode(newMode);
    }

    function onLoad(code) {
        if (code == "html") return htmlCode
        else if (code == "css") return cssCode
        else if (code == "javascript") return backendCode
    }

    const EditorContent = ({ code }) => {

        return (
            <div className={`${classes.editorContent} ${classes.flex}`}>

                <p className={`${classes.editorName}`}>
                    {code}
                </p>
                <AceEditor
                    // name={`${post._id}`}
                    name="UNIQUE_ID"
                    placeholder=''
                    mode={mode}
                    theme="monokai"
                    value={onLoad(code)}
                    defaultValue=''
                    height='300px'
                    width='300px'
                    className=''
                    fontSize={14}
                    showGutter={true}
                    showPrintMargin={true}
                    highlightActiveLine={true}
                    readOnly={true}
                    // onLoad={onLoad(code)}
                    // onBeforeLoad={onLoad(code)}
                    // onChange={onLoad(_post)}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </div>
        )
    }

    return (
        <div className={`${classes.codeContainer} ${classes.flex}`}>

            <EditorContent code={"html"} />

            <EditorContent code={"css"} />

            <EditorContent code={"javascript"} />
        </div >
    )
}

export default CodeEditors