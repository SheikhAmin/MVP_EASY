import { test} from "@playwright/test";
import { describe } from "node:test";
import e2e from "./e2e"
import { Login } from "../login/Login";
import { error } from "console";

describe('MVP EZ e2e test',()=>{

    test('conduct e2e', async({page})=>{
        //visit the page
        page.goto('/');
        //create necessary obj
        const obj = new e2e(page);
        const obj1 = new Login(page);
       



    })
})