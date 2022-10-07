const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team17:Team17@themealmine.tlnklwt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 49152;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.post("/post", (req, res) => {
	main();
	res.redirect("/");
});

async function main() {
	try {
		await client.connect();
		await newEntry(client,"UserAccounts",{name:"john2791"});
		user = await getEntry(client,"UserAccounts","john2791");
		console.log(user);
		await editEntry(client,"UserAccounts","john2791",{name:"Nate"});
		user = await getEntry(client,"UserAccounts","Nate");
		console.log(user);
		await removeEntry(client,"UserAccounts","Nate");
	} catch (e) {
    		console.error(e);
	} finally {
		await client.close();
	}
}	

async function newEntry(client,table,entry) {
	await client.db("TheMealMine").collection(table).insertOne(entry);
}

async function getEntry(client,table,entryName) {
	return await client.db("TheMealMine").collection(table).findOne({name:entryName});
}

async function editEntry(client,table,entryName,edit) {
	await client.db("TheMealMine").collection(table).updateOne({name:entryName},{$set:edit});
}

async function removeEntry(client,table,entryName) {
	await client.db("TheMealMine").collection(table).deleteOne({name:entryName});
}
