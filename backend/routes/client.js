const express = require('express')
const router = express.Router()

const {
    getAll,
    getOne,
    postOne,
    deleteOne,
    editOne
} = require('./../controllers/client.js')

router.get('/', getAll)
router.get('/one', getOne)
router.post('/', postOne)
router.delete('/:id', deleteOne)
router.patch('/:id', editOne)

module.exports = router