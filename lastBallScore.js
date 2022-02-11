// const request = require("request");
// const cheerio = require("cheerio");
import request from "request";
import cheerio from "cheerio";

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
console.log("Before");

request(url,cb);

function cb(err,res,html){
    if (err){
        console.log(err);
    }else{
        HTMLloader(html);
    }
}

function HTMLloader(html){
    let $ = cheerio.load(html);
    let elemArr = $(".match-comment-wrapper .match-comment-long-text");
    let txt = $(elemArr[8]).text();
    let htmlData = $(elemArr[8]).html();

    console.log(txt);
    console.log(htmlData);
}



console.log("After");