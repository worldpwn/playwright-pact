import { Verifier, VerifierOptions } from "@pact-foundation/pact";
import test from "@playwright/test";
import path from 'path';

test("[PROVIDER] Validate contract for the ProductService", async () => {

    const pathToPactFile = path.resolve("./pacts/gatewaywebapi-productservice.json")
    console.log(pathToPactFile)

    const providerUrl = 'http://localhost:5053';
    const oprions: VerifierOptions = {
        providerBaseUrl: providerUrl,
        provider: "ProductService",
        logLevel: "error",
        pactUrls: [pathToPactFile]
    }

    const verifier = new Verifier(oprions)
    await verifier.verifyProvider();
})