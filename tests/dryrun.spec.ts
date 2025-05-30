import { beforeEach, describe } from "node:test";
import { DealerRegistration } from "../Pom/DealerRegistration";
import { queryLatestUser } from "../database/fetchCredentials";
import { Common } from "../Pom/Common";

import { test, expect } from "@playwright/test";

describe("Test Cases",()=>{

    test("Dry run",async ({page})=>{
        await page.goto("https://www.youtube.com/");
    })

})