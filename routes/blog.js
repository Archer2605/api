const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router()

router.get('/',blogController.getAll)

router.get('/:id',blogController.getDetail)

router.post('/', blogController.create)

router.put('/:id', blogController.update)

router.delete('/',blogController.deleteAll)

router.delete('/:id',blogController.deleteOne)

//Comment 

//add comment 
router.post('/comment/:id',blogController.addComment)
//delete comment 
router.delete('/comment/:id',blogController.deleteComment)

//update comment 
router.put('/comment/:id', blogController.updateComment)
//get comment 
router.get('/comment/:id',blogController.getComment)




module.exports = router