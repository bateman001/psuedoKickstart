import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../route";

const CampaignNew = () => {
    const [minimumContribution, setMinimunContribution] = useState("");
    const [err, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async e => {
        setSubmitting(true);
        e.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();
            const contribution = parseInt(minimumContribution);

            await factory.methods.createCampaign(contribution).send({
                from: accounts[0],
                type: "0x2"
            });

            setError("");
            setSubmitting(false);

            Router.pushRoute("/");
        } catch (e) {
            setError(e);
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <h3>Create a Campaign</h3>

            <Form onSubmit={onSubmit} error={!!err}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minimumContribution}
                        onChange={e => setMinimunContribution(e.target.value)}
                    />
                </Form.Field>
                <Button loading={submitting} primary>
                    Create!
                </Button>
                <Message error header="Oops!" content={`${err}`} />
            </Form>
        </Layout>
    );
};

export default CampaignNew;
