const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { insertMany } = require("./models/Recipe.model");

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
    return Recipe.create({
      title: "Guinea pig of the German sahara",
      level: "UltraPro Chef",
      ingredients: ["Pig Fat", "Jhon's Sausage", "Squirtle Juice"],
      cuisine: "German",
      dishType: "snack",
      duration: 12000000000000000000000,
      creator: "Lourenço",
    });
  })
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    console.log(recipes);
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((recipes) => {
    console.log("Foooooooooooooooooooooooooooooooooooooooooooood");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipes) => {
    console.log("Removal success");
    mongoose.connection.close();
  })
  .then((recipes) => {
    console.log("closed!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
