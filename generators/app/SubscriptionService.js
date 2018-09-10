var needle = require('needle');
var stashService =require('./stashservice');
var URL="http://int.subscriptionadm.dev.arvm.de:8080/v1/api/admin/subscription/type";
module.exports = {
    createSubscriptionType
};
/**
 * Create subscription type Object with default values.
 * @param                 data.
 */
function createSubscriptionTypeRequestObj(data) {
    var subscriptionType = new Object();
    var price = new Object();

    price.amount = 0
    price.currency = data.subscriptionTypeCurrency;
    price.vatRate = 0;

    subscriptionType.affiliateId = data.affiliateId;
    subscriptionType.name = data.subscriptionTypeName;
    subscriptionType.description = data.subscriptionTypeDescription;
    subscriptionType.typeCategory = "STANDARD";
    subscriptionType.price = price;
    subscriptionType.accountingLogic = "DEFAULT";
    subscriptionType.accountingStrategy = "EXTERNAL_RENEWAL";
    subscriptionType.subscribable = true;
    subscriptionType.marketshare = false;
    subscriptionType.streaming = false;
    subscriptionType.paymentMethod = "FREE";
    subscriptionType.enableNotification = false;
    subscriptionType.id = data.affiliateId + "0001";
    subscriptionType.businessModels = ["DOWNLOAD_TO_OWN_FREEMIUM"];

    return subscriptionType;
}

/**
 * Create subscription type by consuming rest service of subscription service.
 * @param                 data.
 */
function createSubscriptionType(data) {
    var subscriptionType = createSubscriptionTypeRequestObj(data)
    console.log(subscriptionType);
    needle.post(URL,subscriptionType,{json:true},(err,respons)=>{

        if(respons.statusCode && parseInt(respons.statusCode, 10) >= 400){
            console.log("faild to create the subscription type: "+JSON.stringify(respons.body,null,2));
        }
        else{
            console.log("subscription type creating successfully: "+JSON.stringify(respons.body,null,2));
        }
        stashService.forkProject(data);
});

}
