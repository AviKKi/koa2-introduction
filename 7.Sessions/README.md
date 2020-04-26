# Sessions
As you saw cookies were great to store data you want to remeber about a user, but there are several problems with that
- User can see there cookies, if there is some data you wanna hide from them you can't store them in cookies
- Users can edit cookies, you can't trust the cookies user can write any kind of data on it
- Browser has a length limit on cookie size.

#### Solution??
Sessions, instead of storing the data in the browser we just store a **session id** in the cookies and actual content of that session is actually stored in the server, mainly in a database but memory or a file are also popular options.The session id acts as a key to identify the session data stored in the database.

TODO- finish this tutorial