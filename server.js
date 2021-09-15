'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());
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
  await mongoose.connect('mongodb://marwan:marwan@book-shard-00-00.dqttt.mongodb.net:27017,book-shard-00-01.dqttt.mongodb.net:27017,book-shard-00-02.dqttt.mongodb.net:27017/book?ssl=true&replicaSet=atlas-l7w2xl-shard-0&authSource=admin&retryWrites=true&w=majority');

  const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    authoremail: String
  });

  booksModle = mongoose.model('Books', bookSchema);

  //  seedData();
}

//seeding a data function 
async function seedData() {
  const Book1 = new booksModle({
    title: 'War and Peace',
    description: `War and Peace broadly focuses on Napoleon’s invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.

    A s Napoleon’s army invades, Tolstoy brilliantly follows characters from diverse backgrounds—peasants and nobility, civilians and soldiers—as they struggle with the problems unique to their era, their history, and their culture. And as the novel progresses, these characters transcend their specificity, becoming some of the most moving—and human—figures in world literature.
    `,
    status: 'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg',
    authoremail: 'marwanamir.ma@gmail.com'
  });

  const Book2 = new booksModle({
    title: 'In Search of Lost Time',
    description: `Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle,
     was published in 1913. In it, Proust introduces the themes that run through the entire work.
      The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's
       passion for Odette. The work is incomparable. Edmund Wilson said "[Proust] has supplied for the first time in literature an equivalent in the full 
    scale for the new theory of modern physics."`,
    status: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1325095874l/13329904.jpg',
    authoremail: 'marwanamir.ma@gmail.com'
  });
  const Book3 = new booksModle({
    title: 'Ulysses',
    description: `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey (e.g., the correspondences between Leopold Bloom and Odysseus, Molly Bloom and Penelope, and Stephen Dedalus and Telemachus). Joyce fans worldwide now celebrate June 16 as Bloomsday.`,
    status: 'https://image.sesamy.com/store/1/0270/1207/1447/products/1133383_202104061350.jpg?v=1617765347&width=856&height=856',
    authoremail: 'marwanamir.ma@gmail.com'
  });

  await Book1.save();
  await Book2.save();
  await Book3.save();
}


//Routes

server.get('/books', getbooksHandler);
server.post('/addbook', addbookHandler);
server.delete('/deletebook/:id', deletebookHandler);
server.put('/updatebook/:id',updatebookHandler);
//Functions Handlers


async function addbookHandler(req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const authoremail = req.body.authoremail;
  // const { title, description, authoremail } = req.body;
  await booksModle.create({
    title: title,
    description: description,
    status: status,
    authoremail: authoremail
  });

  booksModle.find({ authoremail: authoremail }, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })

}

function deletebookHandler(req, res) {
  const bookId = req.params.id;
  const authoremail = req.query.email;
  booksModle.deleteOne({ _id: bookId }, (err, result) => {

    booksModle.find({ authoremail: authoremail }, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    })

  })


}

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




function updatebookHandler(req,res) {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const authoremail = req.body.authoremail;
  
  
  booksModle.findByIdAndUpdate(id,{title,description,status},(err,result)=>{
    booksModle.find({authoremail:authoremail},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.send(result);
          }
      })
  })
}





server.listen(PORT, () => console.log(`listening on ${PORT}`));
