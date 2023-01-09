import * as vscode from 'vscode';
import { Items } from './Items';
import { TreeDataProvider } from "./TreeDataProvider";
import { PickedDataProvider } from "./PickedDataProvider";

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

	const pickedDataProvider = new PickedDataProvider();

	vscode.window.createTreeView('todaysTodoList', {

		treeDataProvider: pickedDataProvider,
		canSelectMany: true

	});

	vscode.commands.registerCommand('pickPrimaryItem', (item: Items) => {

		pickAndDisplay(item);
		
	});

	vscode.commands.registerCommand('pickPrimaryItem.inline', (item: Items) => {

		pickAndDisplay(item);
		
	});

	function pickAndDisplay(item: Items) {

		const insert: boolean | undefined = pickedDataProvider.insert(item.label, item.contextValue);

		if (insert) {
			pickedDataProvider.refresh();
			vscode.window.showInformationMessage(item.label + " : has picked from " + item.contextValue + " to Rollout");
		} else {
			vscode.window.showErrorMessage(item.label + " : already exists from " + item.contextValue + " to Rollout");
		}

	}

}

export function deactivate() {}
