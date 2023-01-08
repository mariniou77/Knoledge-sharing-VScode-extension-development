import { Config } from './Config';
import * as vscode from 'vscode';
import * as Constants from "./Constants";

export class SettingsAccess {

    constructor(){};

    readConfig() {

        const config: Config = {
            primaryList: [],
            secondaryList: []
        };

        const primaryListCon: string[] = vscode.workspace.getConfiguration(Constants.API_NAME).primaryList as Config["primaryList"];

        const secondaryListCon = vscode.workspace.getConfiguration(Constants.API_NAME).secondaryList as Config["secondaryList"];

        config.primaryList = primaryListCon;
        config.secondaryList = secondaryListCon;

        return config;

    }
}