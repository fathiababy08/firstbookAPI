BOOK STORE API
this project represents a book store or a backend system that responds to POST/GET requests.This book store developed together with its restful API and supports requests/responds. This project can be used as a good backend demonstration for e-commerce.

Getting Started
API URL : "email": 'https://bookapi-3arg.onrender.com'
API VERSION : 
Request Method: REST (GET)
Response Format: JSON
Routers to get to all the end points and what they mean/do
/search?{query}
Example
https://bookapi-3arg.onrender.com/search/crack: it searches for the book that has the word weep in it and brings it forth
Response
[
            
    "recommended": false,
    "_id": "644264383f02d62bb49624e8",
    "title": "Crack the Code",
    "author": "Fathia Odusola",
    "description": "lorem ipsum",
    "price": 7500,
    "genre": [
    "Biography Racism"
            ],
]
/popular
https://bookapi-3arg.onrender.com/popular: this api gets all the popular books based on ratings that are more than 3
/bestselling
https://bookapi-3arg.onrender.com/bestselling: this api gets all the best selling books 
/bookmarked
https://bookapi-3arg.onrender.com/bookmarked: this api gets all the bookmarked books
/purchased
https://bookapi-3arg.onrender.com/purchased: this api gets all the purchased books
/subscribe
https://bookapi-3arg.onrender.com/subscribe: this api subscribes users to the mailing list
/signUp
https://bookapi-3arg.onrender.com/signUp: this api enables users to register to the platform
/signIn
https://bookapi-3arg.onrender.com/signIn: this api enables users to login to the platform
/signOut
https://bookapi-3arg.onrender.com/signOut: this api enables users to logout from the platform
/update/bookId
https://bookapi-3arg.onrender.com/update/bookId: this api updates the rating of a book and also updates the bookmark satte of a book.

Status codes
200: OK
201: succesfully created
500: server error
