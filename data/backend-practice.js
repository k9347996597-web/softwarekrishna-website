const xhr=new XMLHttpRequest();
//first we need create synchronous code because xhr.send actually a async code 
xhr.addEventListener('load',()=>{ 
  console.log(xhr.response)
})
//open()used to knows only  where to send the reuest

//backend respond types

//xhr.open('GET','https://supersimplebackend.dev/hello');//type====text(string)

//we can send one request and take one response (even it is same backend request) 

//xhr.open('GET','https://supersimplebackend.dev/products/first')//type==json(string){ }***convert json string to javascript use json.parse

//xhr.open('GET','https://supersimplebackend.dev/documentation');//type=html

xhr.open('GET','https://supersimplebackend.dev/images/apple.jpg');//type==image

//xhr.open('GET','https://supersimplebackend.dev');//get(request)information from backend, bakendname (where to send the request)

xhr.send();// send request to backend---

//here asynccode wont wait to excute directly goes to to another line 
//xhr.response //here response=== undefined to solve this we need to use addeventlistener to save the response after load
// *******becoz the browser take some to give response from the backend 
// ** meanwhile the javascriptwont wait after sometime response will store the object(xhr)with help of eventlistener

// create new xmhl object to give new request

//using of browser====making a GET REQUEST(directly pass the url to the browser search) ***so the (backend) gives response directly to the browser instead of using GET REQUEST using (HTTP)xmhlHttpRequest