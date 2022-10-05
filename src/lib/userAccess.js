import { ethers } from "ethers";

import abi from "../contracts/userAccess.json";

const polygonProvider = new ethers.providers.Web3Provider(window.ethereum);
const signer = polygonProvider.getSigner();
const contract = new ethers.Contract(process.env.REACT_APP_USERACCESS_ADDRESS, abi, signer)

export async function getMintPrice(templateId){
    const data = await contract.getMintPrice(templateId);
    return data;
}

export async function mintCoin(templateId){
    try {
        const data = await contract.mintCoin(templateId);
        await polygonProvider.waitForTransaction(data.hash);
        return '1';
    } catch (error) {
        console.error(error);
        return error;
    }
}