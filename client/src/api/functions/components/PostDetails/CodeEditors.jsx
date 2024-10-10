import React, { useState } from 'react'

// ACE IMPORTS
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"

// PRETTIER - ORGANIZADOR DE CODIGOS
// import prettier from 'prettier/standalone';
// import htmlParser from 'prettier/parser-html';
// import cssParser from 'prettier/parser-postcss';
// import babelParser from 'prettier/parser-babel';

import ContentPasteIcon from '@mui/icons-material/ContentPaste';


import useStyles from './styles.js'
const CodeEditors = ({ post }) => {

    const classes = useStyles()
    const [htmlCode, setHtmlCode] = useState((post) ? post.htmlCode : '');
    const [cssCode, setCssCode] = useState((post) ? post.cssCode : '');
    const [backendCode, setBackendCode] = useState((post) ? post.backendCode : '');

    console.log("CSS CODE: ", cssCode);

    const editorOptions = {
        useWorker: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        readOnly: true,
        highlightActiveLine: true,
        showGutter: true,
        showPrintMargin: true,
        fontSize: 14,
    };

    function onLoadCode(editor) {

        try {
            const editorMode = editor.getSession().getMode().$id;
            console.log(editorMode);
            if (editorMode === "ace/mode/html") {
                // log
                editor.setValue(htmlCode);
            }
            else if (editorMode === "ace/mode/css") {
                editor.setValue(cssCode)
            }
            else if (editorMode === "ace/mode/javascript") {
                editor.setValue(backendCode)
            }

        } catch (error) {
            console.log("Error no onLoad AceEditor: ", error);
        }
    }

    function handleCopyToClipboard(code) {
        let textToCopy

        if (code === "html") {
            textToCopy = htmlCode
        }
        else if (code === "css") {
            textToCopy = cssCode
        }
        else if (code === "javascript") {
            textToCopy = backendCode
        }

        navigator.clipboard.writeText(textToCopy)
    }

  

    try {

        return (
            <div className={`${classes.codeContainer} ${classes.flex}`}>

                <div className={`${classes.flex} ${classes.editorContent}`}>
                    <div className={`${classes.flex} ${classes.editorTabs}`}>
                        <p className={`${classes.editorName}`}>
                            HTML
                        </p>

                        <div className={`${classes.flex} ${classes.editorName} ${classes.copyTab}`} onClick={() => handleCopyToClipboard("html")}>
                            <ContentPasteIcon fontSize='small' />
                            <p>Copy</p>
                        </div>
                    </div>


                    <AceEditor
                        name="htmlCode"
                        placeholder=''
                        mode="html"

                        defaultValue=''
                        height='300px'
                        width='350px'
                        theme="monokai"

                        onLoad={onLoadCode}

                        editorProps={{ $blockScrolling: true }}
                        setOptions={editorOptions}
                    />
                </div>

                <div className={`${classes.flex} ${classes.editorContent}`}>
                    <div className={`${classes.flex} ${classes.editorTabs}`}>
                        <p className={`${classes.editorName}`}>
                            CSS
                        </p>

                        <div className={`${classes.flex} ${classes.editorName} ${classes.copyTab}`} onClick={() => handleCopyToClipboard("css")}>
                            <ContentPasteIcon fontSize='small' />
                            <p>Copy</p>
                        </div>
                    </div>

                    <AceEditor
                        name="cssCode"
                        placeholder=''
                        mode="css"

                        defaultValue=''
                        height='300px'
                        width='350px'
                        theme="monokai"

                        onLoad={onLoadCode}

                        editorProps={{ $blockScrolling: true }}
                        setOptions={editorOptions}
                    />
                </div>

                <div className={`${classes.flex} ${classes.editorContent}`}>
                    <div className={`${classes.flex} ${classes.editorTabs}`}>
                        <p className={`${classes.editorName}`}>
                            Javascript
                        </p>

                        <div className={`${classes.flex} ${classes.editorName} ${classes.copyTab}`} onClick={() => handleCopyToClipboard("javascript")}>
                            <ContentPasteIcon fontSize='small' />
                            <p>Copy</p>
                        </div>
                    </div>

                    <AceEditor
                        name="backendCode"
                        placeholder=''
                        mode="javascript"

                        defaultValue=''
                        height='300px'
                        width='350px'
                        theme="monokai"

                        onLoad={onLoadCode}

                        editorProps={{ $blockScrolling: true }}
                        setOptions={editorOptions}
                    />

                </div >
            </div >
        )
    } catch (error) {
        console.log(error);
    }
}

export default CodeEditors