import { NextApiRequest, NextApiResponse } from "next";
// Import API
import { restorePass } from "api/auth";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req;

    if (
        query.enterField &&
        typeof query.enterField === "string" &&
        query.has &&
        typeof query.has === "string"
    ) {
        const verifyResponse = await restorePass(query.enterField, query.has);

        if (verifyResponse.status) {
            return res.redirect("/forgotenpass");
            console.log(verifyResponse.status)
        }

        return res.redirect(`/forgotenpass?verified=ok&code=${query.has}&enterField=${query.enterField}`);

    }

    return res.status(401).json({ error: "Bad request" });
}
