import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as path from 'path';

describe('ZoomCommandManager', () => {
    let sandbox: sinon.SinonSandbox;
    let ZoomCommandManager: any;

    before(async () => {
        const modulePath = path.resolve(__dirname, '../../../src/commands/zoomCommands');
        try {
            const module = await import(modulePath);
            ZoomCommandManager = module.ZoomCommandManager;
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

    suite('Command Registration', () => {
        test('should register all zoom commands', () => {
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand');
            const context = { subscriptions: [] } as any;
            
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const manager = new ZoomCommandManager();
            manager.registerCommands(context);

            assert.ok(registerCommandStub.calledWith('codezoom.zoomIn'));
            assert.ok(registerCommandStub.calledWith('codezoom.zoomOut'));
            assert.ok(registerCommandStub.calledWith('codezoom.reset'));
            assert.strictEqual(context.subscriptions.length, 3);
        });

        test('should handle command registration failures gracefully', () => {
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand')
                .onFirstCall().throws(new Error('Registration failed'))
                .onSecondCall().returns({} as any)
                .onThirdCall().returns({} as any);
            
            const showErrorStub = sandbox.stub(vscode.window, 'showErrorMessage');
            const context = { subscriptions: [] } as any;

            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const manager = new ZoomCommandManager();
            
            assert.doesNotThrow(() => {
                manager.registerCommands(context);
            });

            assert.ok(showErrorStub.called);
            assert.strictEqual(context.subscriptions.length, 2); // Two commands registered successfully
        });
    });

    suite('Command Execution', () => {
        test('should execute zoom in command', async () => {
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const mockZoomManager = {
                zoomIn: sandbox.stub().resolves(),
                getCurrentLevel: sandbox.stub().returns(1)
            };

            const manager = new ZoomCommandManager(mockZoomManager);
            await manager.executeZoomIn();

            assert.ok(mockZoomManager.zoomIn.calledOnce);
        });

        test('should execute zoom out command', async () => {
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const mockZoomManager = {
                zoomOut: sandbox.stub().resolves(),
                getCurrentLevel: sandbox.stub().returns(0)
            };

            const manager = new ZoomCommandManager(mockZoomManager);
            await manager.executeZoomOut();

            assert.ok(mockZoomManager.zoomOut.calledOnce);
        });

        test('should execute reset command', async () => {
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const mockZoomManager = {
                reset: sandbox.stub().resolves(),
                getCurrentLevel: sandbox.stub().returns(0)
            };

            const manager = new ZoomCommandManager(mockZoomManager);
            await manager.executeReset();

            assert.ok(mockZoomManager.reset.calledOnce);
        });

        test('should handle command execution errors', async () => {
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const mockZoomManager = {
                zoomIn: sandbox.stub().rejects(new Error('Zoom failed')),
                getCurrentLevel: sandbox.stub().returns(0)
            };

            const showErrorStub = sandbox.stub(vscode.window, 'showErrorMessage');
            const manager = new ZoomCommandManager(mockZoomManager);

            await manager.executeZoomIn();

            assert.ok(showErrorStub.calledWith(sinon.match(/failed/i)));
        });
    });

    suite('State Management', () => {
        test('should validate editor state before command execution', async () => {
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            sandbox.stub(vscode.window, 'activeTextEditor').value(undefined);
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');

            const mockZoomManager = {
                zoomIn: sandbox.stub().resolves()
            };

            const manager = new ZoomCommandManager(mockZoomManager);
            await manager.executeZoomIn();

            assert.ok(showInfoStub.calledWith(sinon.match(/no active editor/i)));
            assert.ok(mockZoomManager.zoomIn.notCalled);
        });

        test('should validate supported file types', async () => {
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const mockEditor = {
                document: {
                    languageId: 'plaintext'
                }
            };
            sandbox.stub(vscode.window, 'activeTextEditor').value(mockEditor);
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');

            const mockZoomManager = {
                zoomIn: sandbox.stub().resolves()
            };

            const manager = new ZoomCommandManager(mockZoomManager);
            await manager.executeZoomIn();

            assert.ok(showInfoStub.calledWith(sinon.match(/not supported/i)));
            assert.ok(mockZoomManager.zoomIn.notCalled);
        });
    });

    suite('Disposal', () => {
        test('should dispose all resources', () => {
            if (!ZoomCommandManager) {
                assert.fail('ZoomCommandManager not implemented yet');
                return;
            }

            const mockDisposable = { dispose: sandbox.stub() };
            const manager = new ZoomCommandManager();
            (manager as any)._disposables = [mockDisposable];

            manager.dispose();

            assert.ok(mockDisposable.dispose.calledOnce);
        });
    });
});