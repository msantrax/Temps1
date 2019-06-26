/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');

// CORS ENTRY - IF NEEDED
// const cors = require('cors')({
//   origin: true,
// });

// FIREBASE SETUP
var admin = require("firebase-admin");
var serviceAccount = require("../fbadmkey.json");

//Firebase adm setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sorptionlab.firebaseio.com"
});


const requestjs = require('request-promise');

const http = require('http');
const agent = new http.Agent({keepAlive: true});


// ===========================================================================
// SERVER COMMS TESTBENCH

// ECHO VIA HTTP CALL
exports.serverRequest = functions.https.onCall((request, response) => {

  console.log(request);
  return request;

});



//var gtwy_status = {
  var touch_counter = 0;
//  function_id : 'date'
//}

var options = {
    //uri: 'http://104.197.197.79:8080/artifacts1.json',
    uri: 'http://localhost:8080/artifacts1.json',
    headers: {
        'User-Agent': 'Functions-Gateway'
    },
    //json: true,
    encoding : 'utf-8',
    agent : agent,
    time : true
};


exports.serverProxy = functions.https.onCall((request, response) => {

  return requestjs(options)
    .then (function (body) {
      //console.log ("then called..." + JSON.stringify(body, null, 2));
      return body;
    })
    .catch(function (err) {
      console.log ("Error" + err);
      throw new functions.https.HttpsError('failed-precondition', 'Falha no acesso ao Server');
    });

  return 'Return Imediate ???';

});


exports.serverProxyHttp = functions.https.onCall((request, response) => {

  var req = http.request({
        host: 'localhost',
        port: 8080,
        path: '/artifacts1.json',
        method: 'GET',
        agent: agent,
    }, res => {
        console.log ('res called');
        let rawData = '';
        res.setEncoding('utf8');
        res.on('data', chunk => {
          console.log ('chunk called');
          rawData += chunk;
        });
        res.on('end', () => {
          console.log ('end called : ' + rawData.length);
          return (`Data: ${rawData}`);
        });
    });
    req.on('error', e => {
      console.log ("Error : ${e.message}");
      throw new functions.https.HttpsError('failed-precondition', e.message);
    });
    req.end();


    console.log('Return Imediate ???');

});


exports.getConfig = functions.https.onCall((req, response) => {

  console.log ('init timer');
  setTimeout(  () => {    console.log('response after 4 seconds');  },  4 * 1000);
  console.log ('end timer');

  touch_counter = touch_counter + 1;
  console.log ("getConfig requested touch_counter = %d", touch_counter);
  return touch_counter;




});







// return requestjs('http://localhost:8080/artifacts1.json', function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body loaded:'); // Print the HTML for the Google homepage.
//     lbody = body;
//   }).then (() => {
//       console.log ("then called...");
//       return lbody;
//     }
//   );


// [END all]
