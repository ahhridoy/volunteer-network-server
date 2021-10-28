const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s1xse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        const database = client.db("volunteerNet");
        const contentsCollection = database.collection("contents");

        // GET API
        app.get("/contents", async (req, res) => {
            const cursor = contentsCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        // POST API
        // app.post("/contents", async (req, res) => {
        //     const newContents = req.body;
        //     const result = await contentsCollection.insertOne(newContents);
        //     console.log("got new content", req.body);
        //     console.log("added user", result);
        //     res.json(result);
        // });

        // DELETE API
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log("deleting user with id ", result);
            res.json(result);
        });
        
    } finally {
        // await client.close()
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello Voluteer");
});

app.listen(port, () => {
    console.log("Running server on port", port);
});
