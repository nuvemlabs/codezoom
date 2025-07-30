import * as vscode from 'vscode';

export class StatusBarManager {
    private _statusBarItem?: vscode.StatusBarItem;
    private _currentLevel: number = 0;

    initialize(context: vscode.ExtensionContext): void {
        this._statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right, 
            100
        );

        this._statusBarItem.text = '$(zoom-in) Zoom: 0';
        this._statusBarItem.tooltip = 'CodeZoom: Current zoom level';
        this._statusBarItem.command = 'codezoom.showQuickPick';
        
        this._statusBarItem.show();
        context.subscriptions.push(this._statusBarItem);

        // Register the quick pick command
        const quickPickCommand = vscode.commands.registerCommand('codezoom.showQuickPick', 
            () => this.showQuickPick());
        context.subscriptions.push(quickPickCommand);

        // Listen for editor changes to update visibility
        const onDidChangeActiveEditor = vscode.window.onDidChangeActiveTextEditor(
            () => this.updateVisibility()
        );
        context.subscriptions.push(onDidChangeActiveEditor);

        // Initial visibility update
        this.updateVisibility();
    }

    updateZoomLevel(level: number): void {
        // Clamp level between 0 and 5
        const clampedLevel = Math.max(0, Math.min(5, level));
        this._currentLevel = clampedLevel;
        
        if (this._statusBarItem) {
            this._statusBarItem.text = `$(zoom-in) Zoom: ${clampedLevel}`;
        }
    }

    updateVisibility(): void {
        if (!this._statusBarItem) {
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

        const supportedLanguages = ['typescript', 'javascript', 'python', 'java'];
        if (supportedLanguages.includes(editor.document.languageId)) {
            this._statusBarItem.show();
        } else {
            this._statusBarItem.hide();
        }
    }

    async showQuickPick(): Promise<void> {
        const items: vscode.QuickPickItem[] = [
            { label: 'Level 0', description: 'Original code unchanged' },
            { label: 'Level 1', description: 'Inline comments replaced with summaries' },
            { label: 'Level 2', description: 'Method implementations as pseudo-code' },
            { label: 'Level 3', description: 'Method signatures with purpose descriptions' },
            { label: 'Level 4', description: 'Class-level overview with structure' },
            { label: 'Level 5', description: 'File-level summary with main purpose' }
        ];

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select zoom level',
            canPickMany: false
        });

        if (selected) {
            const level = parseInt(selected.label.split(' ')[1]);
            await vscode.commands.executeCommand('codezoom.setLevel', level);
        }
    }

    show(): void {
        this._statusBarItem?.show();
    }

    hide(): void {
        this._statusBarItem?.hide();
    }

    dispose(): void {
        this._statusBarItem?.dispose();
        this._statusBarItem = undefined;
    }
}