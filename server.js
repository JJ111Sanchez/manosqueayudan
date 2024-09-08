const express = require('express');
const bodyParser = require('body-parser');
const { validateBeneficiary, processDonation } = require('./services');

const app = express();
app.use(bodyParser.json());

app.post('/validate-beneficiary', async (req, res) => {
    try {
        const isValid = await validateBeneficiary(req.body.medicalHistory);
        res.status(200).json({ isValid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/donate', async (req, res) => {
    try {
        const result = await processDonation(req.body.donationAmount, req.body.beneficiaryId);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
