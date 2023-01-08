import * as vscode from 'vscode';
import { TreeDataProvider } from "./TreeDataProvider";

export function activate(context: vscode.ExtensionContext) {

	const primaryListProvider = new TreeDataProvider("primary list", (c) => c.primaryList);

	vscode.window.createTreeView('primaryList', {

		treeDataProvider: primaryListProvider,
		canSelectMany: true

	});

	const secondaryListProvider = new TreeDataProvider("secondary list", (c) => c.secondaryList);

	vscode.window.createTreeView('secondaryList', {

		treeDataProvider: secondaryListProvider,
		canSelectMany: true

	});

}

// This method is called when your extension is deactivated
export function deactivate() {}
