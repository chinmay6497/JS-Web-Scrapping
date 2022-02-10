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
       
        // let htmlD = $(scorecardData[i]).html();
        // siteHTML += htmlD;
        // let bowlerClass = $(".table.bowler tbody tr");
        // for(let j=0; j< bowlerClass.length;j++){
        //     // let bowlerClassElement = $(bowlerClass[i]).find("td");
        //     // console.log(bowlerClassElement.text());
        //     console.log(bowlerClass[i].text());
        // }
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
                let playerName = $(individualELem[0]).text();
                let playerWicket = $(individualELem[4]).text();
                // console.log(playerWicket);
            //     // console.log(playerName);
            //     // console.log(`player name is ${playerName} wicket taken is ${playerWicket}`);
                    if (playerWicket >= highestwicket){
                        highestwicket = playerWicket;
                        highestwicketPlayer = playerName;
                    }
            } 
            console.log(`Highest wicket  taker team is ${wteam}, Highest wicket taking player is ${highestwicketPlayer} and the wicket taken is ${highestwicket}`)
        }
}

    // console.log(siteHTML);
}



console.log("After");