import React from "react";
import { Header, Card, Button } from "semantic-ui-react";

import factory from "../ethereum/factory";
import Layout from "../components/Layout";

//Campaign list page
const CampaignIndex = ({ campaigns }) => {
    const createCrowdCoin = () => {
        return <Header as="h2">View All Campaigns</Header>;
    };

    const showOpenCampaigns = () => {
        const items = campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    };

    return (
        <div>
            <Layout>
                {createCrowdCoin()}
                <h3>Open Campaigns</h3>
                <Button floated="right" content="Create Campaign" icon="add circle" primary />
                {showOpenCampaigns()}
            </Layout>
        </div>
    );
};

CampaignIndex.getInitialProps = async ctx => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};
export default CampaignIndex;
