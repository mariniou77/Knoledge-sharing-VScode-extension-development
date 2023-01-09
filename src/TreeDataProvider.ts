import * as vscode from 'vscode';
import { Items } from './Items';
import { Config } from './Config';
import { SettingsAccess } from './SettingsAccess';


export class TreeDataProvider implements vscode.TreeDataProvider<Items> {

    private config!: Config;
    private settingsAccess: SettingsAccess;

    private _onDidChangeTreeData: vscode.EventEmitter<Items | undefined | null | void> = new vscode.EventEmitter<Items | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Items | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(
        public contextValue: string,
        private getList: (c: Config) => string[],
    ) {
        this.settingsAccess = new SettingsAccess();
        this.config = this.settingsAccess.readConfig();
    };

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Items): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: Items | undefined): vscode.ProviderResult<Items[]> {
        return Promise.resolve(
            this.getConfigurations()
        );

    };

    private getConfigurations(): Items[] {

        const toHabits = (itemName: string): Items => {
            return new Items(itemName, vscode.TreeItemCollapsibleState.None, this.contextValue);
        };

        const items = this.getList(this.config)
            ? Object.keys(this.getList(this.config)).map((_, index) =>
                toHabits(this.getList(this.config)[index])
            )
            : [];

        return items;
    }
}
