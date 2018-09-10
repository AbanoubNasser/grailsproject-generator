const fs= require('fs');
var convert = require('xml-js');
var contentTemplatePath=__dirname+'/../templates'
var RestClient = require('node-rest-client').Client;
var wikiURL= "https://wiki.mondiamedia.com/rest/wikis/mmintern/spaces/Products/pages/"
module.exports = {
    createWikiPage
};
function readFileContent(){
    var contents = fs.readFileSync(contentTemplatePath+'/generatedWikiContent.txt', 'utf8');
    console.log(contents);
}
function createWikiPage(generator){
    console.log("Create Wiki page....");
    
    var content=fs.readFileSync(contentTemplatePath+'/wikiContent.txt','utf-8');
    var rep=/projectName/g
    content=content.replace(rep,generator.projectName);
    var body='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><page xmlns="http://www.xwiki.org"> <title>'+generator.projectName+'</title><syntax>xwiki/2.0</syntax> <content>'+content+'</content></page>'
    var client= new RestClient({'user':generator.stashUserName,password:generator.stashPassword});
    var args = {
        data:body,
        headers: { 'Content-Type': 'application/xml' }
    }
    client.put(wikiURL+generator.projectName,args,(data,respons)=>{
        if(respons && respons.statusCode && parseInt(respons.statusCode,10)>=400 ){
            console.log("failed to create Wiki page, "+respons.statusMessage);
        }else{
            console.log("Wiki page created Successfully");
            console.log("You can find it on "+respons.responseUrl);
        }
    });
}