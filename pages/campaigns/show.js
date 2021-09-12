import React from "react";
import { Button, Card, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Contribute } from "../../components/ContributeForm";
import { Link } from "../../route";

const CampaignShow = ({ props }) => {
    console.log("props", props);

    const { minimunContribution, balance, requestsLength, approversCount, managerAddress, address } = props;

    const renderCards = () => {
        const items = [
            {
                header: managerAddress,
                meta: "address of manager",
                description: "The person who made the campaign and do special stuff",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimunContribution,
                meta: "Minimum Contribution (wei)",
                description: "Must contribute at least this much wei to become an approver"
            },
            {
                header: requestsLength,
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract. Requests must be approved by approvers"
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description: "Number of people who have already donated to the campaign"
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description: "The balance is how much money this campaign has to spend"
            }
        ];

        return <Card.Group items={items} />;
    };
    return (
        <Layout>
            <h3>Campaign Details</h3>
            <Grid>
                <Grid.Column width={10}>
                    {renderCards()}
                    <Link route={`/campaigns/${address}/requests`}>
                        <a>
                            <Button primary>View Requests</Button>
                        </a>
                    </Link>
                </Grid.Column>

                <Grid.Column width={6}>
                    <Contribute address={address} />
                </Grid.Column>
            </Grid>
        </Layout>
    );
};

CampaignShow.getInitialProps = async ctx => {
    const address = ctx.query.address;
    const campaign = await Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    const props = {
        minimunContribution: summary[0],
        balance: summary[1],
        requestsLength: summary[2],
        approversCount: summary[3],
        managerAddress: summary[4],
        address: address
    };
    return { props };
};

export default CampaignShow;
