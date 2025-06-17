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
    for (let pg = 1; pg <5; pg++) {
       
    const response = await fetch(`https://perenual.com/api/v2/species-list?key=sk-LjlD68503df1e585911029&page=${pg}`);
    if(response.ok)
    {
    const data2=await response.json() 
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
       await setDoc(doc(db,"plants2",String(idx+1)),ele);
    })
 

})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});