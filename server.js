var express = require('express');
var app = express();
var ODataServer = require("simple-odata-server");
var MongoClient = require('mongodb').MongoClient;
var Adapter = require('simple-odata-server-mongodb')

var dburl = 'mongodb+srv://rwuser:mynewpassword1@mycluster-mmcx1.azure.mongodb.net/admin?retryWrites=true&w=majority';
app.use(express.static('app/webapp'));
var model = {
    namespace: "jsreport",
    entityTypes: {
        "WorkerType": {
            "_id": {
                "type": "Edm.String",
                key: true
            },
            "firstname": {
                "type": "Edm.String"
            },
            "secondname": {
                "type": "Edm.String"
            },
            "age": {
                "type": "Edm.Int32"
            },
            "sex": {
                "type": "Edm.String"
            },
            "position": {
                "type": "Edm.String"
            }
        }
    },
    entitySets: {
        "workers": {
            entityType: "jsreport.WorkerType"
        }
    }
};

odataServer = new ODataServer("http://localhost:1337").model(model).adapter(Adapter(function(es, cb) { cb(null, db)}));
odataServer.cors('*');

MongoClient.connect(dburl, function (err, db) {
    odataServer.adapter(Adapter(function(cb) { 
        cb(err, db.db('FinalTaskDB')); 
    })); 
});

app.use('/', odataServer.handle.bind(odataServer));
app.listen(1337);