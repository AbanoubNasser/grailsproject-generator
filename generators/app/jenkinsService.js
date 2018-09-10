var needle = require('needle');
var URL ="http://172.16.73.171:49001/createItem?"
module.exports = {
    createJenkinsJob
};

function createJenkinsJob(generator) {
    console.log("Starting creation of jenkins job..");
    needle.post(URL+"name="+generator.projectName+"&mode=copy&from=User Data",null,(err,respons)=>{
        if(respons && respons.statusCode && parseInt(respons.statusCode,10)>=400 ){
            console.log("failed to create jenkins job, "+respons.statusMessage);
        }else{
            console.log("Jenkins Job created Successfully");
        }
    });
}