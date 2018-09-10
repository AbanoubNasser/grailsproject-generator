var constants={
    prompts:[{
        type: 'list',
        name: 'ans',
        message: 'Do you want answer prompts or upload answers with file',
        choices: ['answerPrompts','uploadFile']
      },{
        type    : 'input',
        name    : 'filePath',
        message : 'Please enter answer file path',
        when: function(answers) {
            return answers.ans=='uploadFile';
          }
    },{
        type    : 'input',
        name    : 'partnerKey',
        message : 'Please enter partner key',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'clientTemplateKey',
        message : 'Please enter client template Key',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'affiliateId',
        message : 'Please enter affiliate Id',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'clientName',
        message : 'Please enter client name',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'list',
        name    : 'useWhiteLableORAnotherProject',
        message : 'Do you want clone from white lable or another project',
        choices: ['whiteLabel','anotherProject'],
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'sourceProject',
        message : 'please enter project name which you want to clone from it',
        when: function(answers) {
            return answers.useWhiteLableORAnotherProject=='anotherProject';
          }
    },{
        type    : 'input',
        name    : 'projectName',
        message : 'Please enter project Name ?',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'stashUserName',
        message : 'Please enter stash username ?',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{ 
        type    : 'password',
        name    : 'stashPassword',
        message : 'Please enter stash password ?',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'subscriptionTypeName',
        message : 'Please enter subscription type name',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'subscriptionTypeDescription',
        message : 'Please enter subscription type description',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    },{
        type    : 'input',
        name    : 'subscriptionTypeCurrency',
        message : 'Please enter subscription type currency',
        when: function(answers) {
            return answers.ans=='answerPrompts';
          }
    }],
    answersMap:{ 
        "partnerKey" : "partnerKey",
        "affiliateId" : "affiliateId",
        "clientTemplateKey" : "clientTemplateKey",
        "clientName" : "clientName",
        "useWhiteLableORAnotherProject" : "useWhiteLableORAnotherProject",
        "sourceProject" : "sourceProject",
        "projectName" : "projectName",
        "stashUserName" : "stashUserName",
        "stashPassword" : "stashPassword",
        "subscriptionTypeName" : "subscriptionTypeName",
        "subscriptionTypeDescription" : "subscriptionTypeDescription",
        "subscriptionTypeCurrency" : "subscriptionTypeCurrency"
    },
    clientTemplateConfig:{
        tls_application_id: "1234",
         lifecycleService: "http://ext.topslcsrv.stg.arvm.de/v2",
         country_codes: [
           "DE"
         ],
         language_codes: [
           "de",
           "en"
         ],
         default_language_code: "en"
     },
    dbConfig:{
        HOST:"localhost",
        USER:"root",
        PASSWORD:"root"
    },
    environments:[
        "dev.arvm.de",
        "stg.arvm.de",
        "liv.arvm.de"
    ],
    envCredentials:[
        {
            username:'test',
            password:'password'
        } ,
        {
            username:'test',
            password:'password'
        } ,
        {
            username:'test',
            password:'password'
        }
    ]
}
module.exports = constants;