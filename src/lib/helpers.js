import { ethers } from "ethers";

const coinValues = {
    1: 1, 
    2: 10,
    3: 50,
    4: 200,
    10: 100, 
    11: 500,
    12: 1000, 
    20: 4000, 
    21: 200000,
    22: 400000
}

export async function getCoinPrice(coinType){
    return coinValues[coinType] ? ethers.utils.parseEther(coinValues[coinType].toString())  : false;
}

const coinGrades = {
    1 :"P1",
    2 : "FR2",
    3 : "AG3",
    4 : "G4",
    5 : "VG5",
    6 : "F12",
    7 : "VF20",
    8 : "VF30",
    9 : "EF40",
    10 : "XF45",
    11 : "AU50",
    12 : "AU55",
    13 : "AU58",
    14 : "MS60",
    15 : "MS61",
    16 : "MS62",
    17 : "MS63",
    18 : "MS64",
    19 : "MS65",
    20 : "MS66",
    21 : "MS67",
    22 : "MS68",
    23 : "MS69",
    24 : "MS70"
}

export async function getCoinGrade(grade){
    return coinGrades[grade] ;
}

const coinTypes = {
    1 : "Copper",
    2 : "Silver-Plated",
    3 : "Gold-Plated",
    4 : "Limited Edition",
    10 : "Silver",
    11 : "Silver Gold-Plated",
    12 : "Silver Limited Edition",
    20 : "Gold / Silver Bi-Metal",
    21 : "Gold",
    22 : "Gold Limited Edition"
}

export async function getCoinType(type){
    return coinTypes[type] ;
}