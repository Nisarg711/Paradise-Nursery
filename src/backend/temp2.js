import express from "express"
import cors from "cors"
import {db} from "./firebase.js"
import { doc, setDoc } from "firebase/firestore"; 
import fs from "fs/promises"
import path from "path";
const app=express();
const port=3000;
app.use(cors());
app.use(express.urlencoded(true));
app.use(express.json());

app.get('/',async (req,res)=>{
const folder="./public/images";
const files=await fs.readdir(folder);

const arr=files.map(async (entry, idx) => {
console.log(entry,idx);
const filename=entry;
const filepath=folder + "/" +entry;
const data=await fs.readFile(filepath,{encoding:'base64'});
const name=filename.split(".")[0];
const data2=await fs.readFile("./src/backend" + "/" +name + ".txt","utf8");

await setDoc(doc(db,"Plants",String(idx)),{

    name:name,
    path:filepath,
    data:data,
    price:10,
    information: data2
})
});

res.send("done");
});



app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})