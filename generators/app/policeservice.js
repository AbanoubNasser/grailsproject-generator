var needle = require('needle');
const subscriptionService=require('./SubscriptionService');
var URL="http://appnet.police-admin.stg.arvm.de/v2/api/partner";
module.exports = {
    isPartnerExist,
    createPartner,
    isClientTemplateExist,
    createClientTemplate,
    createClient
};

/**
 * Check if partner already exist or not, if not exist it will call create partner method.
 * @param                 generator.
 */
function isPartnerExist(generator,cb) {
    var self=this;
    var emptyMethod = function(){}; 
    cb=cb||emptyMethod;
    needle.get(URL+"/"+generator.partnerKey,(err,respons)=>{
        if(respons.body && respons.body.statusCode && parseInt(respons.body.statusCode,10)>=400 ){
            //as the above condition mean that partner not exist so we call create partner
            console.log("Not exist partner,starting creation of partner");
            self.createPartner(generator);
        }else{
            self.isClientTemplateExist(generator);
        }
        cb(respons);
    });
}
/**
 * Create partner by consuming rest service in police api.
 * @param                 generator.
 */
function createPartner(generator){
    var self=this;
    var partner =new Object();
    partner.partner_key=generator.partnerKey;
    partner.partner_name=new String(generator.partnerKey).replace(/-/g,' ');
    needle.post(URL,partner,(err,respons)=>{
        if(respons.body && respons.body.statusCode && parseInt(respons.body.statusCode,10)>=400 ){
            console.log(respons.body);
        }else{
            console.log("partner created Successfully");
            self.isClientTemplateExist(generator);
        }
        
    });
}
/**
 * Check if Client Template already exist or not, if not exist it will call create Client Template method.
 * @param                 generator.
 */
function isClientTemplateExist(generator){
    var self=this;
     needle.get(URL+"/"+generator.partnerKey+"/client_template/"+generator.clientTemplateKey,(err,respons)=>{
        if(respons.body && respons.body.statusCode && parseInt(respons.body.statusCode,10)>=400 ){
            //as the above condition mean that client template not exist so we call create client template
            console.log("Not exist client template,starting creation of client template");
            self.createClientTemplate(generator);
        }else{
            self.createClient(generator);
        }
    });
}
/**
 * Create Client template by consuming rest service in police api.
 * @param                 generator.
 */
function createClientTemplate(generator){
    var self=this;
    var clientTemplate=new Object();
    clientTemplate.client_template_key=generator.clientTemplateKey;
    clientTemplate.client_template_name=new String(generator.clientTemplateKey).replace(/-/g,' ');
    clientTemplate.config=JSON.stringify(generator.config);
    needle.post(URL+"/"+generator.partnerKey+"/client_template",clientTemplate,(err,respons)=>{
        if(respons.body && respons.body.statusCode && parseInt(respons.body.statusCode,10)>=400 ){
            console.log(respons.body);
        }else{
            console.log("client template created Successfully");
            self.createClient(generator);
        }   
    });
}

/**
 * Create Client by consuming rest service in police api.
 * @param                 generator.
 */
function createClient(generator){
      var client =new Object();
     client.client_name=generator.clientName;
     client.config=JSON.stringify(generator.config);
     client.active=true;
    console.log("Start creating client....");
    needle.post(URL+"/"+generator.partnerKey+"/client_template/"+generator.clientTemplateKey+"/client",client,(err,respons)=>{
        if(respons.body && respons.body.statusCode && parseInt(respons.body.statusCode,10)>=400 ){
            console.log(respons.body);
        }else{
            console.log("Client created Successfully");
            generator.client_id=respons.body.client_id;
            generator.client_secret=respons.body.client_secret;
            subscriptionService.createSubscriptionType(generator);
        }
    });
}