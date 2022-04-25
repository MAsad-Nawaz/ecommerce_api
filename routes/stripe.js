const router = require("express").Router();
const stripe = require("stripe")("sk_test_51KsThTLtW2c0M8ocJkAkGhnzDfRb6QepRinkjOK6pT8gQJveQvbPFwoQww45oYRP6D9Jfs9UxAqmOMInpec7ES3i002NQCehDm");


router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stipeErr, stripeRes) => {
        if (stipeErr) {
            return res.status(400).json(stipeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    });
})



module.exports = router;