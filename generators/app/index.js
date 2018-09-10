var Generator = require('yeoman-generator');
const chalk = require('chalk');
var wikiService = require('./wikiservice');
const fs= require('fs');
var objectMapper = require('object-mapper');
const PoliceService=require('./policeservice');
const dbservice = require('./dbservice');
const constants = require('./generator-constants');
const jenkinsService = require('./jenkinsService');
var PropertiesReader = require('properties-reader');

module.exports = class extends Generator {
    prompting() {
        return this.prompt(constants.prompts).then((answers) => {
            if(answers.ans=='answerPrompts'){
                objectMapper(answers,this,constants.answersMap);
            }else{
                var properties = PropertiesReader(answers.filePath);
                objectMapper(properties._properties,this,constants.answersMap);
            }
        });
    }

    writing(){
       constants.clientTemplateConfig.affiliate_id=this.affiliateId;
        this.config=constants.clientTemplateConfig;
        PoliceService.isPartnerExist(this);
        dbservice.createDB(this);
       // jenkinsService.createJenkinsJob(this);
        wikiService.createWikiPage(this);
    }
    install() {
      
    }

};