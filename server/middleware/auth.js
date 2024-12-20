import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1]

        const isCustomAuth = token.length < 500

        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify( token, 'Teste')

            req.userId = decodedData?.id
        }else{
            decodedData = jwt.decode( token )

            req.userId = decodedData?.sub
        }

        next()

    } catch (error) {
        console.log("Error on auth: ", error.message);
        return res.json( { logout_user: 'logout' } )
    }
}

export default auth