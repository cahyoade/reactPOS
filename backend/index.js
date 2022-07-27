const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const { exec } = require('child_process');
const fs = require('fs');
const { Stream } = require('stream');
 
const app = express();
app.use(cors({origin : 'http://localhost:3000'}));
app.use(express.json());

const dbUrl = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
const dbName = 'reactPOS'


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/:collection', async (req, res) => {
	const client = new MongoClient(dbUrl);
	try{
		const database = client.db(dbName);
		const collection = database.collection(req.params.collection);
		const data = await collection.find().toArray();
		res.json(data);
	} finally {
		await client.close();
	}
});

app.get('/delete/:collection/:id', async (req, res) => {
	const client = new MongoClient(dbUrl);
	try{
		const database = client.db(dbName);
		const collection = database.collection(req.params.collection);
		const result = await collection.deleteOne({_id : ObjectId(req.params.id)});
		res.json({success : result.deletedCount});
	} finally {
		await client.close();
	}
});

app.post('/insert/:collection', async (req, res) => {
	const data = {...req.body};
	data.lastEdit = new Date();
	const client = new MongoClient(dbUrl);

	try{
		const database = client.db(dbName);
		const collection = database.collection(req.params.collection);
		const result = await collection.insertOne(data);
		res.json({success : result.insertedId});
	} finally {
		await client.close();
	}
})

app.post('/transactions', async (req, res) => {
	const data = {...req.body};
	data.date = new Date();
	const client = new MongoClient(dbUrl);

	try{
		const database = client.db(dbName);
		if(data.user && Object.keys(data.user).length === 0 && Object.getPrototypeOf(data.user) === Object.prototype){
			data.user = {name : 'umum'};
			const result = await database.collection('transactions').insertOne(data);
			res.json({success : result.insertedId});
			printTransaction(data);
		}
		else if(data.payment === 'poin'){
			await database.collection('members').updateOne({_id : ObjectId(data.user._id)}, {$inc: {points : -data.total}});
			const result = await database.collection('transactions').insertOne(data);
			res.json({success : result.insertedId});
		}
		else{
			await database.collection('members').updateOne({_id : ObjectId(data.user._id)}, {$inc: {points : data.pointsAdded}});
			const result = await database.collection('transactions').insertOne(data);
			res.json({success : result.insertedId});
			printTransaction(data);
		}
	} finally {
		await client.close();
	}
})

app.post('/replace/:collection', async (req, res) => {
	const data = {...req.body};
	data.lastEdit = new Date();
	delete data._id;
	const client = new MongoClient(dbUrl);
	try{
		const database = client.db(dbName);
		const collection = database.collection(req.params.collection);
		const result = await collection.replaceOne({_id: ObjectId(req.body._id)}, data);
		res.json({success : result.modifiedCount});
	} finally {
		await client.close();
	}
})

app.listen(4000, () => console.log('app ready at 4000'))

function printTransaction(transaction){
	let formatter = new Intl.NumberFormat('id').format; 
	let textFile = fs.createWriteStream('./print.txt');
	textFile.once('open', () => {

		let header = 'Warung Mbak Sum'.padStart(20, ' ');
		textFile.write(header.padEnd(25, ' '));
		textFile.write(`\n\nTgl :${new Date(transaction.date).toLocaleString('nl').padStart(20, ' ')}\n`)
		textFile.write(''.padStart(25,'-'));
		textFile.write('\n\n');
		transaction.products.forEach(product => {
			let priceIndex;
			product.prices.forEach((price, index) => {
				if(product.count >= price.min){
					priceIndex = index;
				}
			})

			textFile.write(product.name + '\n');
			let priceAndCount = `${product.count}${product.unit} X ${formatter(product.prices[priceIndex].price)}`;
			let totalPrice = `Rp${formatter(product.prices[priceIndex].price * product.count)}`;
			textFile.write(priceAndCount + totalPrice.padStart(25 - priceAndCount.length, ' '));
			textFile.write('\n\n');
		});
		textFile.write(''.padStart(25,'-'));
		textFile.write('\n');

		textFile.write('Total     :' + `Rp${formatter(transaction.total)}`.padStart(14, ' '));
		textFile.write('\n');
		textFile.write('Bayar     :' + `Rp${formatter(transaction.cash)}`.padStart(14, ' '));
		textFile.write('\n');
		textFile.write('Kembalian :' + `Rp${formatter(transaction.change)}`.padStart(14, ' '));
		textFile.write('\n\n');


		if(transaction.user.name === 'umum'){
			textFile.end();
			return;
		}
		textFile.write(`Member :` + `${transaction.user.name}`.padStart(17, ' '));
		textFile.write('\nPoin          :' + `${formatter(transaction.user.points)}`.padStart(10, ' '));
		textFile.write('\nTambahan Poin :' + `${formatter(transaction.pointsAdded)}`.padStart(10, ' '));
		textFile.write('\nPoin Sekarang :' + `${formatter(transaction.user.points + transaction.pointsAdded)}`.padStart(10, ' '));
		textFile.end();
	})
	exec(`notepad /p ${process.cwd()}\\print.txt`);
}