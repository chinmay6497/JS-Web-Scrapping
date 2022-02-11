// const request = require("request");
// const cheerio = require("cheerio");
// const chalk = require("chalk");
import chalk from "chalk";
import request from "request";
import cheerio from "cheerio";

console.log("Before");
console.log("After");

request("https://www.worldometers.info/coronavirus/",cb);

function cb (error, response, body) {
  
    if(error){
    console.error('error:', error);
    }
    else{
      helpingfn(body); 
    }
};

function helpingfn(body){
    let setTool = cheerio.load(body);
    let content = setTool("#maincounter-wrap span");


    // for(let i=0; i<content.length;i++){
    //     let dta = setTool(content[i]).text();
    //     console.log("data is : ",dta);
    // // }

    let covidCase = setTool(content[0]).text();
    let death = setTool(content[1]).text();
    let recovered = setTool(content[2]).text();

    console.log(chalk.gray("Total cases are :"+ covidCase));
    console.log(chalk.red("Total death are :"+ death));
    console.log(chalk.green("Total recovered cases are :" + recovered));


}

