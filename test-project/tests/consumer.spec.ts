import { test, expect } from "@playwright/test";
import { Verifier, VerifierOptions, Pact } from "@pact-foundation/pact";
import axios from "axios";
import path from 'path';

// (1) Create the Pact object to represent your provider - ProductService
const providerMock = new Pact({
    consumer: "GatewayWebAPI",
    provider: "ProductService",
    port: 5055,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "error",
})

// this is the response you expect from your Provider - ProductService
const EXPECTED_BODY = [
    {
        id: 1,
        name: "product_1",
    },
    {
        id: 2,
        name: "product_2",
    },
]

test.afterEach(async () => {
    providerMock.verify();
});
test.afterAll(async () => {
    providerMock.finalize();
});

const providerService = {
    getProducts: (url) => axios.request({
        method: "GET",
        baseURL: url,
        url: "/products",
        headers: { "Content-Type": "application/json" },
    })
}

test("[CONSUMER] Gateway API Should call ProductService and get products", async () => {
    await providerMock.setup();
    await providerMock.addInteraction({
        // The 'state' field specifies a "Provider State"
        state: "i have a list of products",
        uponReceiving: "a request for products",
        withRequest: {
            method: "GET",
            path: "/products",
        },
        willRespondWith: {
            status: 200,
            body: EXPECTED_BODY,
        },
    })

    var response = await providerService.getProducts(providerMock.mockService.baseUrl)
    await expect(response.data).toStrictEqual(EXPECTED_BODY);
})