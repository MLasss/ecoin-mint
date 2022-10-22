import { ethers } from "ethers";
import abi from "../contracts/dataStorage.json";

export async function getTemplate(templateId){
    const polygonProvider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(process.env.REACT_APP_DATASTORE_ADDRESS, abi, polygonProvider)
    const data = await contract.getTemplate(templateId);
    return data;
}