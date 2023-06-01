// PRETTIER - ORGANIZADOR DE CODIGOS
import prettier from 'prettier/standalone';
import htmlParser from 'prettier/parser-html';
import cssParser from 'prettier/parser-postcss';
import babelParser from 'prettier/parser-babel';

export default function checkCode(htmlCode, cssCode, backendCode) {

    try {

        const _html = checkCodeIndividually("html", htmlCode, htmlParser)

        const _css = checkCodeIndividually("css", cssCode, cssParser)

        const _back = checkCodeIndividually("babel", backendCode, babelParser)

        console.log(`${_html}${_css}${_back}`);


        if (_html && _css && _back) {
            return true
        }
        else
        {
            return false
        }

    }
    catch (error) {
        console.log("Error no CheckCode: ", error);
        
        
    }

}

const checkCodeIndividually = (codeType, codeString, pluginParser) => {
    try {

        console.log(`codeType ${codeType}  `);

        prettier.format(codeString, {
            parser: codeType,
            plugins: [pluginParser],
        });


        return true

    } catch (error) {
        console.log(`Erro no codigo ${codeType}: ${error}`);
      
        
    }

}