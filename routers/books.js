const express = require('express')
const router = express.Router()
const BOOKES = require('../model/bookesModel')


// to get all books
router.get('/all', async (req, res) => {
    const getBooks = BOOKES.find()
    try {
        const gottenBooks = await getBooks 
        res.status(200).json({numOfBooks: gottenBooks.length, gottenBooks})
    }
    catch (err) {
        res.status(500).json({message: 'error' })
    }
})

// to create new books
router.post('/new', async (req, res) => {
    console.log(req.body)
    const newBook = new BOOKES({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        genre: req.body.genre,
        imageUrl: req.body.imageUrl,
    })
    try {
        const createdBook = await newBook.save()
        res.status(200).json({ message: 'createdBook'})
    }
    catch (err) {
        res.status(500).json({message: 'error'})
    }
})

// to get a specific book
router.get('/singleBook/:bookId', async (req, res) => {
    const getBook = BOOKES.findById({_id: req.params.bookId})
    try {
        const gottenBook = await getBook
        res.status(200).json({message: 'book gotten'})
    }
    catch (err) {
        res.status(500).json({message: 'error'})
    }
})

// to update a specific book
router.patch('/update/:bookId', async (req, res)=> {
  try {
    const updateBook = await BOOKES.updateOne(
        {_id: req.params.bookId},
        {$set: {title: req.body.title} }
    )
    res.status(200).json({message: 'book updated'})
  }
  catch (err) {
    res.status(500).json({message: 'error'})
    }

})

// to delete a book
router.delete('/delete/:bookId', async (req, res) => {
    try {
        const deleteBook = await BOOKES.findByIdAndDelete({_id: req.params.bookId})
        res.status(200).json({message: 'book deleted'})
    }
    catch (err) {
        res.status(500).json({message: 'error'})
    }
})






module.exports = router
