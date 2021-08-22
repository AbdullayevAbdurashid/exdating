import { NextApiRequest, NextApiResponse } from "next";

// Import API
import { verify } from "api/auth";

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
    const verifyResponse = await verify(query.enterField, query.has);

    if (verifyResponse.status) {
      return res.redirect("/login?verified=ok");
    }

    return res.status(500).json({ error: verifyResponse.message });
  }

  return res.status(401).json({ error: "Bad request" });
}
