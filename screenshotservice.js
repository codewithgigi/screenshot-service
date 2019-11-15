var fs   = require('fs');
var path = require('path');
const url = require('url');
var mkdirp = require('mkdirp');
var webshot = require("webshot");

var urlsArray = "";
var parsedUrl = "";
var dirname = "";
var domain = "";
var filename = "";
var urlpath = "";

var filePath = path.join(__dirname, 'aaglocal.csv');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err){
        console.log('received data: ' + data);
        urlsArray = data.split(",");
        console.log(urlsArray.length);
        for(var i=0; i < urlsArray.length; i++) {
           parsedUrl = url.parse(urlsArray[i], true, true);
           domain = parsedUrl.hostname;
           urlpath = parsedUrl.pathname;

           //remove leading /
           if( urlpath.charAt(0) === '/' ) {
               urlpath = parsedUrl.pathname.slice(1);
               dirname = domain; 
               filename = urlpath; 
           }
           if(urlpath.search("/") > 0) {
              dirname = domain.concat(parsedUrl.pathname.slice(0, urlpath.lastIndexOf("/")+1));
              filename = urlpath.split('/')[1];
           }
           //console.log("dirname: "+dirname);
           filename = filename.concat(".png");
           var destinationfile = dirname+"/"+filename;
           //console.log("file: " +filename);
           mkdirp(dirname, function (err) {
                if (err) console.error(err)
                else console.log('created')
           });
           //var file = fs.createWriteStream(dirname+"/"+filename, {encoding: 'binary'});
           console.log(dirname+"/"+filename);
           console.log(urlsArray[i]);
           /*var options = { height: 3600, waitAfterSelector: "body" };
           var destinationfile = dirname+"/"+filename;
                           
           app.fromURL(urlsArray[i], destinationfile, options, function(){
                //an image of google.com has been saved at ./test.png 
           });*/
 var options = {
  screenSize: {
    width: 1280 
  , height: 3500 
  },          
 shotSize: {
    width: 1280 
  , height: 'all',
  }
,
  renderDelay: 2000
};

webshot(urlsArray[i], destinationfile, options, function(err) {
  // screenshot now saved to filename
  if(err) return console.log(err);
  console.log("good");
});

        }
    }else{
        console.log(err);
    }

});

/*var renderStream = webshot(urllist);
var file = fs.createWriteStream('g/aag.png', {encoding: 'binary'});

renderStream.on('data', function(data) {
  file.write(data.toString('binary'), 'binary');
});
*/
