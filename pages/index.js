import React, { useEffect } from "react";
import factory from "../ethereum/factory";

//Campaign list page
export const CampaignIndex = () => {
    const getCampaigns = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        console.log("campaigns", campaigns);
    };
    useEffect(() => {
        getCampaigns();
    });

    return <h1>Campaign list page</h1>;
};
