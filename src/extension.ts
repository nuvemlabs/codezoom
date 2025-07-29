import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('CodeZoom extension is now active');

    const zoomInCommand = vscode.commands.registerCommand('codezoom.zoomIn', () => {
        vscode.window.showInformationMessage('CodeZoom: Zoom In (not implemented yet)');
    });

    const zoomOutCommand = vscode.commands.registerCommand('codezoom.zoomOut', () => {
        vscode.window.showInformationMessage('CodeZoom: Zoom Out (not implemented yet)');
    });

    const resetCommand = vscode.commands.registerCommand('codezoom.reset', () => {
        vscode.window.showInformationMessage('CodeZoom: Reset Zoom (not implemented yet)');
    });

    context.subscriptions.push(zoomInCommand, zoomOutCommand, resetCommand);
}

export function deactivate() {
    console.log('CodeZoom extension is deactivated');
}