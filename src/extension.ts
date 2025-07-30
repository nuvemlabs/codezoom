import * as vscode from 'vscode';
import { ZoomCommandManager } from './commands/zoomCommands';
import { StatusBarManager } from './ui/statusBar';

let commandManager: ZoomCommandManager;
let statusBarManager: StatusBarManager;

export function activate(context: vscode.ExtensionContext) {
    console.log('CodeZoom extension is now active');

    try {
        // Initialize command manager
        commandManager = new ZoomCommandManager();
        commandManager.registerCommands(context);

        // Initialize status bar manager
        statusBarManager = new StatusBarManager();
        statusBarManager.initialize(context);

        console.log('CodeZoom extension activated successfully');
    } catch (error) {
        console.error('CodeZoom extension activation failed:', error);
        vscode.window.showErrorMessage(`CodeZoom failed to activate: ${error}`);
    }
}

export function deactivate() {
    console.log('CodeZoom extension is deactivating');
    
    try {
        commandManager?.dispose();
        statusBarManager?.dispose();
        console.log('CodeZoom extension deactivated successfully');
    } catch (error) {
        console.error('CodeZoom extension deactivation error:', error);
    }
}