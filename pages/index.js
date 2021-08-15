import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";

//Campaign list page
const CampaignIndex = ({ campaigns }) => {
    const [allCamps, setCampaigns] = useState(campaigns);

    console.log(campaigns);
    console.log(allCamps);

    const createCrowdCoin = () => {
        return <div>hey</div>;
    };

    const showOpenCampaigns = () => {
        return (
            <div>
                <h2>Open Campaign</h2>
                {allCamps.map((camp, i) => {
                    return (
                        <li key={i}>
                            Address of Campaign {i + 1}: {camp}
                        </li>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            {createCrowdCoin()}
            {showOpenCampaigns()}
        </div>
    );
};

CampaignIndex.getInitialProps = async ctx => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};
export default CampaignIndex;
