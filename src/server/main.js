import csv from "csv-parser";
import fs from "fs";
import { getMatchesPerYear } from "./matchesPerYear.js";
import { getMatchesWonPerTeamPerYear } from "./matchesWonPerTeamPerYear.js";
import { getExtraRunsConcededPerTeam2016 } from "./extraRunsConcededPerTeam2016.js";
import { getEconomicBowlersIn2015 } from "./economicBowlersIn2015.js";

async function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("error", reject)
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      });
  });
}

async function processData() {
  try {
    const matchesFilePath = "/home/surendra/MountBlue/js-ipl-data-project/src/data/matches.csv";
    const deliveriesFilePath = "/home/surendra/MountBlue/js-ipl-data-project/src/data/deliveries.csv";

    const [matches, deliveries] = await Promise.all([
      parseCSVFile(matchesFilePath),
      parseCSVFile(deliveriesFilePath),
    ]);

    let matchesPerYear = JSON.stringify(Object.fromEntries(getMatchesPerYear(matches)));
    let matchesWonPerTeamPerYear = JSON.stringify(Object.fromEntries(getMatchesWonPerTeamPerYear(matches)));
    let extraRunsConcededPerTeamIn2016 = JSON.stringify(Object.fromEntries(getExtraRunsConcededPerTeam2016(matches, deliveries)));
    let economicBowlersIn2015 = JSON.stringify(Object.fromEntries(getEconomicBowlersIn2015(matches, deliveries)));

    fs.writeFile("src/public/output/matchesPerYear.json",matchesPerYear,err=>{
      if(err){
        console.log("Error writing file" ,err)
      } else {
        console.log('Matches per year is written to the JSON file successfully')
      }
     });

     fs.writeFile("src/public/output/matchesWonPerTeamPerYear.json",matchesWonPerTeamPerYear,err=>{
      if(err){
        console.log("Error writing file" ,err)
      } else {
        console.log('Matches won per team per year is written to the JSON file successfully')
      }
     });

     fs.writeFile("src/public/output/extraRunsConcededPerTeam2016.json",extraRunsConcededPerTeamIn2016,err=>{
      if(err){
        console.log("Error writing file" ,err)
      } else {
        console.log('Extra runs conceded per team in 2016 is written to the JSON file successfully')
      }
     });

     fs.writeFile("src/public/output/economicBowlersIn2015.json",economicBowlersIn2015,err=>{
      if(err){
        console.log("Error writing file" ,err)
      } else {
        console.log('Top 10 Economic bowlers in 2015 is written to the JSON file successfully')
      }
     });
     
  } catch (error) {
    console.error("Error occurred while processing the CSV files:", error);
  }
}

processData();
