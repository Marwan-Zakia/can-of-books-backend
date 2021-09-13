'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT = process.env.PORT || 3001;
// home
server.get('/', (request, response) => {

  response.send('test request received')

})

//MongoDB
const mongoose = require('mongoose');



let booksModle;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/books');

  const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    authoremail: String
  });

  booksModle = mongoose.model('Books', bookSchema);

      // seedData();
}

//seeding a data function 
async function seedData() {
  const Book1 = new booksModle({
    title: 'War and Peace',
    description: `War and Peace broadly focuses on Napoleon’s invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.

    A s Napoleon’s army invades, Tolstoy brilliantly follows characters from diverse backgrounds—peasants and nobility, civilians and soldiers—as they struggle with the problems unique to their era, their history, and their culture. And as the novel progresses, these characters transcend their specificity, becoming some of the most moving—and human—figures in world literature.
    `,
    status: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FWar-Peace-Signet-Classics-Tolstoy%2Fdp%2F0451532112&psig=AOvVaw2kSbQkThJjlxmUZEX4ZjT0&ust=1631619022144000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDL79Ts-_ICFQAAAAAdAAAAABAD',
    authoremail: 'email1@gmail.com'
  });

  const Book2 = new booksModle({
    title: 'In Search of Lost Time',
    description: `Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle,
     was published in 1913. In it, Proust introduces the themes that run through the entire work.
      The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's
       passion for Odette. The work is incomparable. Edmund Wilson said "[Proust] has supplied for the first time in literature an equivalent in the full 
    scale for the new theory of modern physics."`,
    status: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goodreads.com%2Fbook%2Fshow%2F18796.In_Search_of_Lost_Time&psig=AOvVaw3SjEWFhW-Zq1Xn9OvWlOHl&ust=1631618960200000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiL6bbs-_ICFQAAAAAdAAAAABAD',
    authoremail: 'email1@gmail.com'
  });
  const Book3 = new booksModle({
    title: 'Ulysses',
    description: `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey (e.g., the correspondences between Leopold Bloom and Odysseus, Molly Bloom and Penelope, and Stephen Dedalus and Telemachus). Joyce fans worldwide now celebrate June 16 as Bloomsday.`,
    status: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FUlysses-Masters-Collections-James-Joyce%2Fdp%2F9350330938&psig=AOvVaw35e11rMlciE-cNh6fj2n0r&ust=1631619219417000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCz8bLt-_ICFQAAAAAdAAAAABAD',
    authoremail: 'email3@gmail.com'
  });

  await Book1.save();
  await Book2.save();
  await Book3.save();
}


//Routes

server.get('/books', getbooksHandler);

//Functions Handlers


function getbooksHandler(req, res) {
  //send book list (email)
  const email = req.query.email;

  booksModle.find({ authoremail: email }, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  
  })
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
