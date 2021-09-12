import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const address = "0xEd74D32E0238472FeB3dB05E3822312EBb780785";
const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), address);

export default instance;
