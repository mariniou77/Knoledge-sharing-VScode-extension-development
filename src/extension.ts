import * as vscode from 'vscode';
import { Items } from './Items';
import { TreeDataProvider } from "./TreeDataProvider";
import { PickedDataProvider } from "./PickedDataProvider";

export function activate(context: vscode.ExtensionContext) {

	const primaryListProvider = new TreeDataProvider("primary list", (c) => c.primaryList);

	vscode.window.createTreeView('primaryList', {

		treeDataProvider: primaryListProvider

	});

	vscode.commands.registerCommand('refreshPanel.primaryList', () => {

		const primaryListProvider = new TreeDataProvider("primary list", (c) => c.primaryList);

		vscode.window.createTreeView('primaryList', {

			treeDataProvider: primaryListProvider
	
		});

		vscode.window.showInformationMessage("Primary List refresh Successfully");
	});

	const secondaryListProvider = new TreeDataProvider("secondary list", (c) => c.secondaryList);

	vscode.window.createTreeView('secondaryList', {

		treeDataProvider: secondaryListProvider

	});

	vscode.commands.registerCommand('refreshPanel.secondaryList', () => {

		const secondaryListProvider = new TreeDataProvider("secondary list", (c) => c.secondaryList);

		vscode.window.createTreeView('secondaryList', {

			treeDataProvider: secondaryListProvider
	
		});
		vscode.window.showInformationMessage("Secondary List refresh Successfully");

	});

	const pickedDataProvider = new PickedDataProvider();

	vscode.window.createTreeView('todaysTodoList', {

		treeDataProvider: pickedDataProvider

	});

	vscode.commands.registerCommand('refreshPanel.todaysTodoList', () => {

		pickedDataProvider.refresh();
		vscode.window.showInformationMessage("Today's Todo List refresh Successfully");

	});

	vscode.commands.registerCommand('deleteItem', (item: Items) => {

		pickedDataProvider.delete(item.label);
		pickedDataProvider.refresh();
		vscode.window.showInformationMessage(item.label + " was successfully removed from Taday's Todo List");

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
			vscode.window.showInformationMessage(item.label + " : has picked from " + item.contextValue + " at Today's Todo List");
		} else {
			vscode.window.showErrorMessage(item.label + " : already exists from " + item.contextValue + " at Today's Todo List");
		}

	}

}

export function deactivate() {}
