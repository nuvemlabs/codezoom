import * as vscode from 'vscode';

interface ZoomManager {
    zoomIn(): Promise<void>;
    zoomOut(): Promise<void>;
    reset(): Promise<void>;
    getCurrentLevel(): number;
}

export class ZoomCommandManager {
    private _disposables: vscode.Disposable[] = [];
    private _zoomManager?: ZoomManager;

    constructor(zoomManager?: ZoomManager) {
        this._zoomManager = zoomManager;
    }

    registerCommands(context: vscode.ExtensionContext): void {
        try {
            const zoomInCommand = vscode.commands.registerCommand('codezoom.zoomIn', 
                () => this.executeZoomIn());
            
            const zoomOutCommand = vscode.commands.registerCommand('codezoom.zoomOut', 
                () => this.executeZoomOut());
            
            const resetCommand = vscode.commands.registerCommand('codezoom.reset', 
                () => this.executeReset());

            this._disposables.push(zoomInCommand, zoomOutCommand, resetCommand);
            context.subscriptions.push(...this._disposables);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to register CodeZoom commands: ${error}`);
            // Continue with partial registration - register remaining commands
        }
    }

    async executeZoomIn(): Promise<void> {
        try {
            if (!this._validateEditorState()) {
                return;
            }

            if (this._zoomManager) {
                await this._zoomManager.zoomIn();
            } else {
                vscode.window.showInformationMessage('CodeZoom: Zoom In (not implemented yet)');
            }
        } catch (error) {
            vscode.window.showErrorMessage(`CodeZoom: Zoom in failed - ${error}`);
        }
    }

    async executeZoomOut(): Promise<void> {
        try {
            if (!this._validateEditorState()) {
                return;
            }

            if (this._zoomManager) {
                await this._zoomManager.zoomOut();
            } else {
                vscode.window.showInformationMessage('CodeZoom: Zoom Out (not implemented yet)');
            }
        } catch (error) {
            vscode.window.showErrorMessage(`CodeZoom: Zoom out failed - ${error}`);
        }
    }

    async executeReset(): Promise<void> {
        try {
            if (!this._validateEditorState()) {
                return;
            }

            if (this._zoomManager) {
                await this._zoomManager.reset();
            } else {
                vscode.window.showInformationMessage('CodeZoom: Reset Zoom (not implemented yet)');
            }
        } catch (error) {
            vscode.window.showErrorMessage(`CodeZoom: Reset failed - ${error}`);
        }
    }

    private _validateEditorState(): boolean {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showInformationMessage('CodeZoom: No active editor found');
            return false;
        }

        const supportedLanguages = ['typescript', 'javascript', 'python', 'java'];
        if (!supportedLanguages.includes(editor.document.languageId)) {
            vscode.window.showInformationMessage(`CodeZoom: Language '${editor.document.languageId}' is not supported yet`);
            return false;
        }

        return true;
    }

    dispose(): void {
        this._disposables.forEach(disposable => disposable.dispose());
        this._disposables = [];
    }
}