import { Router } from "express";
import { 
    addNewBook, 
    deleteBook, 
    getAllBooks, 
    getOneBook,
    updateBook
} from "../controllers/book.controller.js";

const router = Router();

router.route("/add-book").post(addNewBook);
router.route("/all-books").get(getAllBooks);
router.route("/book/:id").get(getOneBook);
router.route("/edit/:id").put(updateBook);
router.route("/delete/:id").delete(deleteBook)

export default router