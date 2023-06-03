import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import checkCode from './checkCode';
import { createPost, updatePost } from '../../actions/posts';


import useStyles from './styles';
const OnSubmitCodeMessage = ({ postData, clear, currentId, setSubmited }) => {
    const classes = useStyles();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    const [showErrorMessage, setShowErrorMessage] = useState(true);

    // const [codeOk, setCodeOk] = useState(null)

    // const [errorMsg, setErrorMsg] = useState('')




    // Função para esconder a mensagem de erro após um determinado tempo
    useEffect(() => {
        const timer = setTimeout(() => {

            setShowErrorMessage(false);
            setSubmited(false)
            // setCodeOk(null)

        }, 3000); // Defina o tempo desejado em milissegundos (aqui está definido como 3 segundos)

        console.log(`showErrorMessage ${showErrorMessage}`);

        return () => {
            clearTimeout(timer);
        } // Limpa o timer se o componente for desmontado antes de expirar
    }, []);

    // Verifica se a mensagem de erro deve ser exibida
    if (!showErrorMessage) {
        return null; // Não renderiza nada se a mensagem de erro não deve ser exibida
    }

    if (postData) {
        const b = checkCode(postData.htmlCode, postData.cssCode, postData.backendCode)
        console.log("Check Code: ", b);

        if (b.result === true) {
            console.log(`currentId: ${currentId}`);

            if (currentId === null) {
                dispatch(createPost({ ...postData, name: user?.result?.name }))

            } else {
                dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
            }

            clear()
            navigate('/posts')
            // setCodeOk(true)
            return (<></>)
        } else {
            if (b.result === false) {
                let errorCode = []
                const errorMsg = ''

                console.log(b.code);

                b.code.forEach(element => {
                    if (element === "html") {
                        errorCode.push("html")
                    }
                    if (element === "css") {
                        errorCode.push("css")
                    }

                    if (element === "backend") {
                        errorCode.push("backend")
                    }
                });

                errorCode.forEach(element => {
                    errorMsg += element + ' '
                    // setErrorMsg((prevErrorMsg) => prevErrorMsg + element + ' ');
                });


                // setCodeOk(false)
                return (
                    // console.log(`Error on codes: ${errorMsg}`),
                    // console.log(error),
                    <>

                        <div className={`${classes.flex} ${classes.errorMsgDiv}`}>
                            {`Error on ${errorMsg} code`}
                        </div>
                    </>

                )
            }
        }
    }
}

export default OnSubmitCodeMessage