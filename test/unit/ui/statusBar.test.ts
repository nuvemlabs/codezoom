import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as path from 'path';

describe('StatusBarManager', () => {
    let sandbox: sinon.SinonSandbox;
    let StatusBarManager: any;

    before(async () => {
        const modulePath = path.resolve(__dirname, '../../../src/ui/statusBar');
        try {
            const module = await import(modulePath);
            StatusBarManager = module.StatusBarManager;
        } catch (error) {
            // Module doesn't exist yet - this test should fail initially (TDD)
        }
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    suite('Initialization', () => {
        test('should create status bar item during initialization', () => {
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            const createStatusBarItemStub = sandbox.stub(vscode.window, 'createStatusBarItem')
                .returns(mockStatusBarItem as any);
            
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);

            assert.ok(createStatusBarItemStub.calledOnce);
            assert.ok(mockStatusBarItem.show.calledOnce);
            assert.strictEqual(context.subscriptions.length, 1);
        });

        test('should set initial status bar properties', () => {
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem as any);
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);

            assert.strictEqual(mockStatusBarItem.text, '$(zoom-in) Zoom: 0');
            assert.strictEqual(mockStatusBarItem.tooltip, 'CodeZoom: Current zoom level');
            assert.strictEqual(mockStatusBarItem.command, 'codezoom.showQuickPick');
        });
    });

    suite('Zoom Level Updates', () => {
        test('should update status bar text when zoom level changes', () => {
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem as any);
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);
            manager.updateZoomLevel(3);

            assert.strictEqual(mockStatusBarItem.text, '$(zoom-in) Zoom: 3');
        });

        test('should handle invalid zoom levels gracefully', () => {
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem as any);
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);
            
            // Test negative level
            manager.updateZoomLevel(-1);
            assert.strictEqual(mockStatusBarItem.text, '$(zoom-in) Zoom: 0');
            
            // Test excessive level
            manager.updateZoomLevel(10);
            assert.strictEqual(mockStatusBarItem.text, '$(zoom-in) Zoom: 5');
        });
    });

    suite('Visibility Management', () => {
        test('should show status bar for supported languages', () => {
            const mockEditor = {
                document: { languageId: 'typescript' }
            };
            
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem as any);
            sandbox.stub(vscode.window, 'activeTextEditor').value(mockEditor);
            
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);
            manager.updateVisibility();

            assert.ok(mockStatusBarItem.show.called);
        });

        test('should hide status bar for unsupported languages', () => {
            const mockEditor = {
                document: { languageId: 'plaintext' }
            };
            
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem as any);
            sandbox.stub(vscode.window, 'activeTextEditor').value(mockEditor);
            
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);
            manager.updateVisibility();

            assert.ok(mockStatusBarItem.hide.called);
        });

        test('should hide status bar when no editor is active', () => {
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem as any);
            sandbox.stub(vscode.window, 'activeTextEditor').value(undefined);
            
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);
            manager.updateVisibility();

            assert.ok(mockStatusBarItem.hide.called);
        });
    });

    suite('Quick Pick Integration', () => {
        test('should show quick pick menu when status bar is clicked', async () => {
            const showQuickPickStub = sandbox.stub(vscode.window, 'showQuickPick').resolves();
            
            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            await manager.showQuickPick();

            assert.ok(showQuickPickStub.calledOnce);
            const items = showQuickPickStub.getCall(0).args[0] as any[];
            assert.ok(Array.isArray(items));
            assert.strictEqual(items.length, 6); // 6 zoom levels
        });

        test('should execute zoom command when quick pick item selected', async () => {
            const showQuickPickStub = sandbox.stub(vscode.window, 'showQuickPick')
                .resolves({ label: 'Level 2', description: 'Method signatures' } as any);
            
            const executeCommandStub = sandbox.stub(vscode.commands, 'executeCommand');

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            await manager.showQuickPick();

            assert.ok(executeCommandStub.called);
        });
    });

    suite('Disposal', () => {
        test('should dispose status bar item', () => {
            const mockStatusBarItem = {
                text: '',
                tooltip: '',
                command: '',
                show: sandbox.stub(),
                hide: sandbox.stub(),
                dispose: sandbox.stub()
            };
            
            sandbox.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBarItem as any);
            const context = { subscriptions: [] } as any;

            if (!StatusBarManager) {
                assert.fail('StatusBarManager not implemented yet');
                return;
            }

            const manager = new StatusBarManager();
            manager.initialize(context);
            manager.dispose();

            assert.ok(mockStatusBarItem.dispose.calledOnce);
        });
    });
});