var RestClient = require('node-rest-client').Client;
var shell = require('shelljs');
var createPuppet = require('./puppet').createPuppet;
var constants = require('./generator-constants');
var propertiesParser = require('properties-parser');
var stashURL="https://stash.mondiamedia.com/rest/api/1.0/projects";
module.exports = {
    forkProject,
    changeClientandSecretKey
};

/**
 * Fork project from white label Games project by calling rest service of stash.
 * @param                 generator.
 */
function forkProject(generator){

    var self=this;
    var stashRequestBody=new Object();
    stashRequestBody.name='server-'+generator.projectName;
    stashRequestBody.project=new Object();
    stashRequestBody.project.key="MMGS";

    var client= new RestClient({'user':generator.stashUserName,password:generator.stashPassword});
    var args = {
        data:stashRequestBody,
        headers: { 'Content-Type': 'application/json' }
    }
    console.log("Start forking project....");
    var sourceProject="server-wl";
    if(generator.useWhiteLableORAnotherProject!="whiteLabel"){
        sourceProject=generator.sourceProject;
    }
    client.post(stashURL+"/MMGS/repos/"+sourceProject,args,(data,respons)=>{
        if(data.errors){
            console.log(data.errors);
        }else{
            console.log("forking project has been done successfully");
            generator.cloneUrl=data.cloneUrl;
            self.changeClientandSecretKey(generator);
            var dbName=new String(generator.projectName).replace(/-/g,'');
            createPuppet(generator.projectName,dbName,constants.envCredentials,constants.environments);
        }
   });
}

/**
 * Change Client and Secret key depends on created client.
 * @param                 generator.
 */
function changeClientandSecretKey(generator){
    console.log('Starting add change client and secret key......');
    //  clone the forked Project
    shell.exec('git clone '+generator.cloneUrl);
    shell.cd('./server-'+generator.projectName);

    var editor=propertiesParser.createEditor('./grails-app/conf/mm-games-development-config.properties');
    editor.set('secapi.clientId',generator.client_id);
    editor.set('secapi.clientSecret',generator.client_secret);
    editor.save('./grails-app/conf/mm-games-development-config.properties');

    shell.exec('git commit -am  "configure client and secret key"');
    shell.exec('git push');
    shell.cd('..');
    console.log('Change client and secret key has been done sucessfully');
}