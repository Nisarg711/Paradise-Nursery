import express from "express"
const app=express();
import {db} from "./firebase.js"
import { doc, setDoc } from "firebase/firestore"; 
import cors from "cors"
const port=3000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/',async (req,res)=>{
    console.log("Request came");
    res.send("Hello World");
   let array=[];
 
    for (let id = 1; id<=50; id++) {
    
    const response = await fetch(`https://perenual.com/api/species-care-guide-list?key=sk-x10v6857f65dcee0911020&species_id=${id}`);
    if(response.ok)
    {
    const data2=await response.json() 
    console.log("data2: ",data2.data);
    array=array.concat(data2.data);
    }
    else
    {
        console.log("There is some error while fetching!!!");
         console.log(response);
    } 
   console.log("Array is: ",array);
    await sleep(2500);
    }
    console.log("done");
     const arr2=array.map(async(ele,idx)=>{
       await setDoc(doc(db,"watersun",String(ele.species_id)),ele);
    })
 

})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});