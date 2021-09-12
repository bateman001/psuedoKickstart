import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

// min amount = .0000000000000002
export const Contribute = props => {
    const { address } = props;

    const [contribution, setContribution] = useState("");
    const [error, setError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async e => {
        setSubmitting(true);
        e.preventDefault();
        const campaign = Campaign(address);
        const convertedContribution = contribution === "" ? contribution : web3.utils.toWei(contribution, "ether");

        if (contribution === "") {
            setError("must enter an amount of ether before submitting");
            setSubmitting(false);
        } else if (convertedContribution < 200) {
            setError("must enter at least .0000000000000002 ether");
            setSubmitting(false);
        } else {
            try {
                const accounts = await web3.eth.getAccounts();
                console.log("accounts", accounts);

                await campaign.methods.contribute().send({
                    from: accounts[0],
                    value: convertedContribution,
                    type: "0x2"
                });

                setSubmitting(false);
                setError("");
            } catch (e) {
                setError(e);
                setSubmitting(false);
            }
        }
    };

    return (
        <Form onSubmit={onSubmit} error={!!error}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether" labelPosition="right" onChange={e => setContribution(e.target.value)} />
            </Form.Field>
            <Button loading={submitting} primary>
                Contribute!
            </Button>
            <Message error header="Oops!" content={`${error}`} style={{ overflowWrap: "break-word" }} />
        </Form>
    );
};
