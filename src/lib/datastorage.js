import { ethers } from "ethers";

import abi from "../contracts/dataStorage.json";

const polygonProvider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(process.env.REACT_APP_DATASTORE_ADDRESS, abi , polygonProvider)

export async function getTemplate(templateId){
    const data = await contract.getTemplate(templateId);
    return data;
}