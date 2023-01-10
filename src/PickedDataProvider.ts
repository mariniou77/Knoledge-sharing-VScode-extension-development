import * as vscode from 'vscode';
import { Items } from './Items';

export class PickedDataProvider implements vscode.TreeDataProvider<any> {

    items: Items[] = [];

    private _onDidChangeTreeData: vscode.EventEmitter<Items | undefined | null | void> = new vscode.EventEmitter<Items | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Items | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Items): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: any): Items[] {

        if (element) {
            return element.children;
        } else {
            if (this.items.length === 0) {
                return [];
            } else {
                return this.items;
            }
        }

    }

    insert(itemName: string, contextValue: string) {

        const item = new Items(itemName, vscode.TreeItemCollapsibleState.None, contextValue);
        let flag: boolean = true;

        if (this.items.length === 0) {
            this.items?.push(item);
        } else {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].label === itemName) {
                    flag = false;
                    return flag;
                }
            }
            this.items?.push(item);
        }
        return flag;
    }

    delete(item: string): void {

        this.items = this.items.filter((target: any) => target.label !== item);

    }
}