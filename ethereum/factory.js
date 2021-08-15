import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const address = "0x51a474A38bF0aA0A4B00a6f5646deb7055403050";
const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), address);

export default instance;
