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
    for (let id = 99; id<=120; id++) {
       
    const response = await fetch(`https://perenual.com/api/v2/species/details/${id}?key=mIUF6852eb4f7823a11029`);
    if(response.ok)
    {
    const data2=await response.json() 
    array=array.concat(data2);
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
       await setDoc(doc(db,"deepdetail",String(ele.id)),ele);
    })
 

})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});