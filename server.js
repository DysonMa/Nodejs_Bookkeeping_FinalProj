const express = require('express');
const app = express();
app.use(express.static('./public')); // 把 public 中的檔案全部丟上來
const firebase = require('firebase');
const path = require('path'); // 使用 path 套件來處理路徑問題！

var firebaseConfig = {
    apiKey: "AIzaSyCRS1rLxPbXKKjHmXAnwioFpAIt3qvjiSY",
    authDomain: "nodejstest-58c75.firebaseapp.com",
    databaseURL: "https://nodejstest-58c75.firebaseio.com",
    projectId: "nodejstest-58c75",
    storageBucket: "nodejstest-58c75.appspot.com",
    messagingSenderId: "354096236837",
    appId: "1:354096236837:web:03602895c20a21b5b8b2cc",
    measurementId: "G-3QV6JRWD1J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const db = firebase.firestore();

app.set('view engine', 'ejs');

app.get("/",(req,res) => {
    
    pathname = path.join(__dirname, 'public');
    console.log(pathname);  // __dirname/public/example.html
    let options = {
        root: pathname,
        dotfiles: 'deny'
    }
    
    res.sendFile('home.html',options); //傳送任何檔案類型(只能傳一次)
})


app.get("/BookKeeping_frontend", (req, res) => {

    pathname = path.join(__dirname, 'public');
    // console.log(pathname);  // __dirname/public/example.html
    let options = {
        root: pathname,
        dotfiles: 'deny'
    }
    
    res.sendFile('bookKeeping.html',options); //傳送任何檔案類型(只能傳一次)


    // let html = '';
    // await db.collection('Account').get().then(data => {
    //     data.forEach(doc => {
    //         console.log(doc.data())
    //         html += `${html}<div>${doc.id}: name = ${doc.data().name} age = ${doc.data().age}</div>`;
    //     });
    // });
    // console.log(html)
    // res.send(html)
})

app.get("/BookKeeping_backend", async (req, res) => {
    let data = await db.collection('Account').get();
    accArr = []
    data.forEach((doc) => {
        accArr.push({
            id: doc.id,
            item: doc.data().item,
            account: doc.data().account,
            date: doc.data().date,
            location: doc.data().location,
            price: doc.data().price,
            category: doc.data().category
        })
    })
    res.render('bookKeeping', {
        acc: accArr
    })
})

app.get("/BookKeeping_backend/API/addAccount",async (req,res) => {

    console.log(req.query);
    let item = req.query.item;
    let account = req.query.account;
    let date = req.query.date;
    let loc = req.query.location;
    let price = req.query.price;
    let category = req.query.category;

    db.collection('Account').add({
        item: item,
        account: account,
        date: date,
        location: loc,
        price: price,
        category: category
    });

    // res.send(`Add Account: 
    //     ${item},
    //     ${account},
    //     ${date},
    //     ${loc},
    //     ${price},
    //     ${category}`);

    res.redirect("http://127.0.0.1:8888/BookKeeping_backend")

})


app.get("/BookKeeping_backend/API/deleteAccount",async(req,res) => {
    
    db.collection('Account').doc(req.query.id).delete();
    console.log(req.query.id);
    res.send(`delete account id = ${req.query.id}!`)

    res.redirect("http://127.0.0.1:8888/BookKeeping_backend")
    
})


// 對於所有都找不到的
app.get('*', (req, res) => {  
    res.send('No Content');  
});

// 不確定port是否會在8888
let port = process.env.PORT || 8888


app.listen(port, () => {
    console.log("Server is running at http://127.0.0.1:8888")
});
