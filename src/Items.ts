import * as vscode from 'vscode';
import * as path from 'path';

export class Items extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly context: string
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label} - ${this.context}`;
        this.description = this.context;
    }
    iconPath = {
        light: path.join(__filename, '..', '..', 'media', 'light', 'treeItem.svg'),
        dark: path.join(__filename, '..', '..', 'media', 'dark', 'treeItem.svg')
    };
    contextValue = this.context;
}