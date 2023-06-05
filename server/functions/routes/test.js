import express from "express";


const router = express.Router()

router.get('/', test)

const test = async (req, res) => {
    
    
    res.status(200).json( "teste deu certo" )
  
}

export default router