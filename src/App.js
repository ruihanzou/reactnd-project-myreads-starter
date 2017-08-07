import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route , Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query: '',
    searchPageBooks:[],
    mainPageBooks:[]
  }
 componentDidMount() {
    BooksAPI.getAll().then((mainPageBooks) => {
      this.setState({ mainPageBooks })
    })
  }
   updateQuery = (query) => {
    this.setState({query})
    if (query) {
        BooksAPI.search(query)
                .then((books) => {
                  if (books.error) { // this will be true when result is not found
                    books = []
                  }
                  /*1) Map over search results
                  2) Next map over each book which is on your home page (this.state.mainPagebooks)
                  3) Check if the book on home page was returned in search results (maybe use id ?)
                  4) If book found : bookInSearchResults.shelf = bookInHomePage.shelf
                  5) After both the map functions finish, set the search result books in your local state*/
                  else {
                    books.filter(bookInSearchResults => bookInSearchResults.id !== undefined && 
                                              this.state.mainPageBooks.filter(bookInHomePage => bookInSearchResults.id === bookInHomePage.id)
                                              .map(bookInHomePage => bookInSearchResults.shelf = bookInHomePage.shelf))
                  }
                  this.setState({searchPageBooks: books})
      })
    }
  }

  updateBook = (selectedBook, shelf) => {
    if (this.state.mainPageBooks) {
       BooksAPI.update(selectedBook, shelf)
              .then(()=> {
                  selectedBook.shelf = shelf
                  this.setState(() => ({
                  mainPageBooks: this.state.mainPageBooks.filter(bookInHomePage => bookInHomePage.id !== selectedBook.id).concat([ selectedBook ])
                 }))
              })
       }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
               <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                 {this.state.searchPageBooks.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
                        `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''})` }}>
                        </div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf} 
                          onChange={(event) => this.updateBook(book,event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                  ))}
              </ol>
           
            </div>
          </div>
        )}/> 
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.mainPageBooks.filter((f) => (f.shelf === "currentlyReading")).map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 
                            `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''})`}}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} 
                              onChange={(event) => this.updateBook(book,event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.mainPageBooks.filter((f) => (f.shelf === "wantToRead")).map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} 
                              onChange={(event) => this.updateBook(book,event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.mainPageBooks.filter((f) => (f.shelf === "read")).map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, 
                            backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} 
                              onChange={(event) => this.updateBook(book,event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
