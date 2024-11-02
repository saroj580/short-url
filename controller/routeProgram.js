const shortid = require("shortid");
const URL = require("../model/userSchema");  // Import URL directly

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    console.log("Request body:", body); // Log the request body for debugging
    if (!body.URL) return res.status(400).json({ err: "url are required" });
    const shortId = shortid.generate();  // Using generate() function
    await URL.create({
        shortId: shortId,
        redirectURL: body.URL,
        visitHistory : [],
    })
    return res.json({ id: shortId });   
}

async function handleGetShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );
     if (!entry) {
        console.log("No entry found for shortId:", shortId);  // Log if entry is not found
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateShortUrl,
    handleGetShortId,
}