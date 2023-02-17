ISDI Coders Final Project


##Project Summary
This project is a web application that presents a timeline where users can browse the Magic The Gathering card catalog, filtered not only by year but also by the cards that were legal to play in the "Standard" format each year. The application will consume data from the free, well-documented https://api.scryfall.com API, with a daily limit of 5000 requests or 10 requests per second. The API will be queried by filters for year range, set, card type, and colors.

The application will also use a private API to store registered users and the decks they build by selecting cards from the catalog as favorites.

##Components
Timeline
A timeline that displays a small card with a button for each year. When a user clicks on a year, the corresponding action will be added to the context to update the query and fetch data for that year.

##Cardsfetcher
Takes the state returned by QueryReducer from the context, makes a GET request to the public API, and returns JSX.

##QueryReducer
Receives the initial state (query without arguments) from the context and returns new state by adding the payload of the Action, which will be arguments to complete the query.

##PlayerReducer
Manages the state related to user login and logout. Receives state changes from the Profile and Logout buttons.

##LogoutBtn
Sends a state change to the context when the user logs out.

##CardDetailsFetcher
Takes the state returned by QueryReducer from the context, makes a GET request to the public API, and returns JSX.

##DeckFetcher
Returns a list of decks stored by a user from the response to a request to the database.

##PlayerDataFetcher
Renders the data for the logged-in user from the database.

##AddButton
Adds the card on which it is rendered to a user's deck.

##DeleteButton
Allows a user to delete a card from one of their decks.

##DeckForm
A small form that allows users to create a deck when they try to add a card. Requests the deck name and generates an ID. Contains a button to delete a deck.

Header
Renders various buttons conditionally depending on whether a user is logged in or not. Contains links to several routes.

##Footer
Contains text and contact links.

##Pages
Mainpage
Secret Lair (similar to the Mainpage but with cards only from the Secret Lair set)
User Profile (to log out)
Year page (provides access to the catalog for that entire year or by card type-color)
Catalog page (renders the cards resulting from a query)
User decks page
Card details page
Optional Features (if time allows)
DeckDownloader
Allows users to download one of their decks in CSV format.

###PricingFetcher
Allows users to estimate the price of the cards in their decks. The information is provided by the API.

Views by Card Type and Color
Router
Context
