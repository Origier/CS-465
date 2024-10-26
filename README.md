# CS-465
# Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
The major two frontend architectures that we used for this website were SPA's and Express HTML. With Express, everything works in a MVC type of model, where the model contains the data's representation, view controls how the look of the frontend appears and the controller controls the routing and what gets displayed to the user. With the SPA (Single-Page Application) everything is handled more on the users machine. This ensures that there is no need to refresh the webpage when using different features of the website. This creates a more seamless experience for the user but may take longer to load initially. With the SPA, every item is interconnected and there are many complex layers to its functionality, making it more difficult to decouple than the Express frontend. 

# Why did the backend use a NoSQL MongoDB database?
NoSQL and MongoDB are a useful choice of database when the data being received may not always be consistent. There is room for different types of data within a NoSQL database that makes it flexible for something like a vacation website.

# How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
JSON is the object notation for Javascript, not Javascript itself. This means that objects can be serialized into JSON and deserialized from JSON to recreate the objects in software. This is extremely useful for transferring data from one service to another, especially as each service may only accept the JSON, such as reading from the data base or displaying the data to the frontend.

# Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
