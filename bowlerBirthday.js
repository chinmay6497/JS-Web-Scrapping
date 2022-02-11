import request from "request";
import cheerio from "cheerio";

const url = request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard");
console.log("before");
request(url,cb);

function cb(err,statusCode,html){
    if (err){
        console.log(err);
    }else{
        htmlLoader(html);
    }
}

function htmlLoader(html){
    let $ = cheerio.load(html);
    let cricktArr = $(".match-header .name-detail");
    // let cricktArr = $(".match-info.match-info-MATCH .team");
    
    let winningTeam = $(cricktArr[1]);
    // console.log(winningTeam.text());
    // console.log(winningTeam.text());
    // let siteHTML = "";
    let scorecardData = $(".card.content-block.match-scorecard-table>.Collapsible");

    for(let i=0; i<scorecardData.length;i++){
       
        let teamNameElem = $(scorecardData[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();

        let wteam = winningTeam.text();

        let highestwicket = 0;
        let highestwicketPlayer = "";
        if (wteam == teamName || wteam instanceof Buffer){
            let tbleElm = $(scorecardData[i]).find(".table.bowler");
            let bwlr = $(tbleElm).find("tr");
            // console.log(teamName)
            for(let j=0; j< bwlr.length;j++){
                let individualELem = $(bwlr[j]).find("td");
                let playerWicket = $(individualELem[4]).text();
               
                if (j == 0 || j == 4){
                    continue;
                }else{
                    let playerName = $(individualELem[0]).text();
                    let playerLink = "https://www.espncricinfo.com" + $(individualELem[0]).find("a").attr("href");
                    subordinate(wteam,playerName,playerLink);
                }
            }
        }
}
}

function subordinate(wteam,playerName,playerLink){
    // let playerurl = playerLink;
    request(playerLink,callBackfn);
    function callBackfn(err,status,data){
        if (err){
            console.log(err);
        }else{
            finalData(data,wteam,playerName);
        }
    }
}

function finalData(data,wteam,playerName){
    let $ = cheerio.load(data);
    let playerdate = $(".player-card-description");
    let birthday = $(playerdate[1]).text();
    console.log(`Winning team is ${wteam}, player name is ${playerName} and his birthday is ${birthday}`)

}
console.log("After");