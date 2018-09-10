var shell = require('shelljs');
var fs = require('fs');
var path = require('path');

var projectUrl='https://HAGA1@stash.mondiamedia.com/scm/rd/puppet-generator-test.git'
/**
 * CLone puppet project and add new configuration files related to this project.
 * @param                 artifcatId.
 * @param                 dbName.
 * @param                 credentials.
 * @param                 environments
 */
var execute=function(artifcatId,dbname,creds,envs){

    var config=`\nnode /^${artifcatId}\d\d\d\.(dev|stg|liv)\.arvm\.de/ {
     class {'system_role::web::tomcat': role => '${artifcatId}' , my_classes => ['redis']}
    }`

    console.log('Starting add puppet files......');

    //  clone the Puppet Project
    shell.exec('git clone '+projectUrl);
    // read the configuration
    var dataConfiguration=fs.readFileSync(__dirname+'/template.config','utf-8');
    shell.cd('./puppet-generator-test');
    shell.exec('git checkout -b configure '+artifcatId);
    fs.appendFileSync('./manifests/site.pp', config);

    var data=replaceArtifcatName(dataConfiguration,dbname);
    for(var i=0;i<creds.length;i++)
    {
        var dataToBeWritten = createConfiguration(data, creds[i].username, creds[i].password);
        var envPath='./hieradata/roles/'+envs[i]+'/'+artifcatId+'.eyaml';
        fs.writeFileSync(envPath,dataToBeWritten);
    }


    shell.exec('git add --all');
    shell.exec('git commit -m  "configure puppet"');
    shell.exec('git push');
    shell.cd('..');
    shell.rm('-rf', './puppet-generator-test/*');
    shell.exit(1);
}


function replaceArtifcatName(data,artifactId,dbname){
    var re=/artifcatId/g
    let dataAfterReplacing=data.replace(re,artifactId);
    var databaseName=/dbName/g
    return dataAfterReplacing.replace(databaseName,dbname);
}


function createConfiguration(data,username,password){
    var re=/databasusername/g
    let afterReplacingName=data.replace(re,username);
    var passwordRegular=/password/g
    return  afterReplacingName.replace(passwordRegular,password);

}

module.exports.createPuppet=execute;