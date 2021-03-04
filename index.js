const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Recipe.create(data[0])
    //   .then((recipe) => {console.log(recipe.title)})
    //   .catch(err => console.log(err))
    Recipe.insertMany(data)
      .then((recipes) => {
        return recipes.forEach((recipe) => {
          console.log(recipe.title);
        });
      })
      .then(() => {
        const promise1 = Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then(() => console.log("Updated!"))
          .catch((err) => console.log(err));
        const promise2 = Recipe.deleteOne({ title: "Carrot Cake" })
          .then(() => console.log("Deleted!"))
          .catch((err) => console.log(err));

        Promise.all([promise1, promise2]).then(() => {
          console.log("estou aqui!")
           mongoose.connection.close(() => console.log('DB closed!'));
        });
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
