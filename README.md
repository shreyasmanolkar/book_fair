
# Book Fair

It is a bookfair application, where multiple sellers can register themselves & sell books. Buyers can register themselves and browse sellers & books. Buyers can also create a cart (limited to one seller) & order the books. The order will be visible to the buyer. 


## Appendix

**Task details:**

- Seller module
    - Seller can create account(name, email, no password)
    - Seller can create shop(name)
    - Seller can create books(name, stock count, image(optional))
    - Seller can view created books(name, stock count)
    - Seller can see orders (consisting books from their shop only, because buyer can create order consisting books of many shops)
- Buyer module
    - Buyer can create account(simply name & email is enough, no need for password)
    - Buyer can view shops(name, seller name)
    - Buyer can view books in a shop
    - Buyer can create order consisting of books from one shop only
- Notes
    - There can be many books in an order. But, each book count will be 1 by default.
    - No need for pagination, infinite scrolling etc. Simply display them all in one go.
- Bonus
    - Realtime
        - Sellers can see order immediately, without reloading the page.
    - Make cart persistent across page loads & browsers
    - Search for books

- Tools
    - Client side
        - handlebars, JavaScript, HTML, CSS
    - Server side
        - Node.js, express.js, Postgres.
    - Hosting
        - Railway.app
## Badges

![MIT License](https://img.shields.io/badge/App-BOOKFair-green.svg)
