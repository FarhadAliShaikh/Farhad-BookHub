import { Book } from "../models/books.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"

// add a new book
const addNewBook = asyncHandler(async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        
        if ( !publishYear || [title, author].some((field) => field.trim() === "")) {
            return res.status(400).send({
                message: "Send all required fields: title, author"
            })
        }

        const newBook = {
            title,
            author,
            publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book)

    } catch (error) {
        console.error(error.message);
        res.status(500).json(
            { message: "An error occurred while saving the book." }
        );
    }
})

// get all books from mongoDB database
const getAllBooks = asyncHandler(async (req, res) => {
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Failad while processing get all books"})
    }
})

// Get one book from database
const getOneBook = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
    
        const book = await Book.findById(id);
    
        return res.status(200).json(book);

      } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Failad while processing get one book"})
      }
})

// Update a book
const updateBook = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        if ( !publishYear || [title, author].some((field) => field.trim() === "")) {
            return res.status(400).send({
                message: "Send all required fields: title, author"
            })
        }
    
        const book = await Book.findByIdAndUpdate(id, { title, author, publishYear }, { new: true });
    
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
      
        return res.status(200).json({ message: 'Book updated successfully', data: book });

      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failad while processing update book"})
      }
})

// Delete book
const deleteBook = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
    
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
      
        return res.status(200).json({ message: 'Book deleted successfully' });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Failed while processing delete book" });
    }
})

export {
    addNewBook,
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook
}