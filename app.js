const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");

const app = express();
const port = 4000;
const apiKey = "eb650b83893a72c3b38ba65c2a21214c-us20";
const audienceId = "426542bcde";
const url = "https://us20.api.mailchimp.com/3.0/lists/426542bcde";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/" , function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(req.body);
    
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const options = {
        method : "POST",
        auth : "kun41:eb650b83893a72c3b38ba65c2a21214c-us20"
    }

    const request = https.request(url , options , function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
            console.log("success");
        }else{
            res.sendFile(__dirname+"/failure.html");
            console.log("failure")
        }
    })

    request.write(jsonData);
    request.end;
})

app.listen(port , function(){
    console.log("Server started at port "+port);
})