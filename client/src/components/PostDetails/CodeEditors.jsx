import React from 'react'

// ACE IMPORTS
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"

// PRETTIER - ORGANIZADOR DE CODIGOS
import prettier from 'prettier/standalone';
import htmlParser from 'prettier/parser-html';
import cssParser from 'prettier/parser-postcss';
import babelParser from 'prettier/parser-babel';

import ContentPasteIcon from '@mui/icons-material/ContentPaste';


import useStyles from './styles.js'
const CodeEditors = ({ post }) => {

    const classes = useStyles()
    const htmlCode = post?.htmlCode
    const cssCode = post?.cssCode
    const backendCode = post?.backendCode

    function onLoad(code) {
        let codeString = ''
        let pluginParser = ''


        if (code === "html") {
            // console.log(htmlCode);
            codeString = htmlCode
            pluginParser = htmlParser
        }
        else if (code === "css") {
            codeString = cssCode
            pluginParser = cssParser
        }
        else if (code === "javascript") {
            code = 'babel'
            codeString = backendCode
            pluginParser = babelParser
        }

        const formattedCodeString = prettier.format(codeString, {
            parser: code,
            plugins: [pluginParser],
        });

        return formattedCodeString
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

    const EditorContent = ({ code }) => {
        // {console.log(code + ' | ' + mode)}
        return (
            <div className={`${classes.flex} ${classes.editorContent}`}>
                <div className={`${classes.flex} ${classes.editorTabs}`}>
                    <p className={`${classes.editorName}`}>
                        {code}
                    </p>

                    <div className={`${classes.flex} ${classes.editorName} ${classes.copyTab}`} onClick={() => handleCopyToClipboard(code)}>
                        <ContentPasteIcon fontSize='small'/>
                        <p>Copy</p> 
                    </div>
                </div>

                <AceEditor
                    // name={`${post._id}`}
                    name="UNIQUE_ID"
                    placeholder=''
                    mode={code}
                    theme="monokai"
                    value={onLoad(code)}
                    defaultValue=''
                    height='300px'
                    width='400px'
                    // style={editorStyle}
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
                        // ativa o modo de análise sintática do editor
                        useWorker: true,
                        // ativa a quebra automática de linhas
                        wrapEnabled: true,

                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </div>
        )
    }

    try {
        
        return (
            <div className={`${classes.codeContainer} ${classes.flex}`}>
    
                <EditorContent code={"html"} />
    
                <EditorContent code={"css"} />
    
                <EditorContent code={"javascript"} />
    
            </div >
        )
    } catch (error) {
        console.log(error);
    }
}

export default CodeEditors