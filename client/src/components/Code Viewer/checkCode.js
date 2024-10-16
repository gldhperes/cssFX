// PRETTIER - ORGANIZADOR DE CODIGOS
import prettier from 'prettier/standalone';
import htmlParser from 'prettier/parser-html';
import cssParser from 'prettier/parser-postcss';
import babelParser from 'prettier/parser-babel';

export default function checkCode(htmlCode, cssCode, backendCode) {
 
    const _html = checkCodeIndividually("html", htmlCode, htmlParser)

    const _css = checkCodeIndividually("css", cssCode, cssParser)

    const _back = checkCodeIndividually("babel", backendCode, babelParser)
    try {

        // console.log(`${_html}${_css}${_back}`);


        if (_html && _css && _back) {
            return { result: true }
        }
        else {
            let code = []

            if (!_html) { code.push("html") }
            if (!_css) { code.push("css") }
            if (!_back) { code.push("backend") }

            return {
                result: false,
                code: code,
            }
        }

    }
    catch (error) {
        console.log("Error no CheckCode: ", error);
        let code = []

        if (!_html) { code.push("html") }
        if (!_css) { code.push("css") }
        if (!_back) { code.push("backend") }

        return {
            result: false,
            code: code,
        }
    }

}

const checkCodeIndividually = (codeType, codeString, pluginParser) => {
    try {

        // console.log(`codeType ${codeType}  `);

        prettier.format(codeString, {
            parser: codeType,
            plugins: [pluginParser],
        });


        return true

    } catch (error) {
        console.log(`Erro no codigo ${codeType}: ${error}`);
        return false
    }

}