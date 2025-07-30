import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';

suite('Extension Test Suite', () => {
    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('Extension Activation', () => {
        test('should register zoom in command', async () => {
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand');
            
            const { activate } = await import('../../src/extension');
            const context = {
                subscriptions: []
            } as any;

            activate(context);

            assert.ok(registerCommandStub.calledWith('codezoom.zoomIn'));
            assert.strictEqual(context.subscriptions.length, 3);
        });

        test('should register zoom out command', async () => {
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand');
            
            const { activate } = await import('../../src/extension');
            const context = {
                subscriptions: []
            } as any;

            activate(context);

            assert.ok(registerCommandStub.calledWith('codezoom.zoomOut'));
        });

        test('should register reset command', async () => {
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand');
            
            const { activate } = await import('../../src/extension');
            const context = {
                subscriptions: []
            } as any;

            activate(context);

            assert.ok(registerCommandStub.calledWith('codezoom.reset'));
        });
    });

    suite('Command Handlers', () => {
        test('zoom in command should show placeholder message', async () => {
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand');
            
            const { activate } = await import('../../src/extension');
            const context = {
                subscriptions: []
            } as any;

            activate(context);

            const zoomInHandler = registerCommandStub.getCall(0).args[1];
            zoomInHandler();

            assert.ok(showInfoStub.calledWith('CodeZoom: Zoom In (not implemented yet)'));
        });

        test('zoom out command should show placeholder message', async () => {
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand');
            
            const { activate } = await import('../../src/extension');
            const context = {
                subscriptions: []
            } as any;

            activate(context);

            const zoomOutHandler = registerCommandStub.getCall(1).args[1];
            zoomOutHandler();

            assert.ok(showInfoStub.calledWith('CodeZoom: Zoom Out (not implemented yet)'));
        });

        test('reset command should show placeholder message', async () => {
            const showInfoStub = sandbox.stub(vscode.window, 'showInformationMessage');
            const registerCommandStub = sandbox.stub(vscode.commands, 'registerCommand');
            
            const { activate } = await import('../../src/extension');
            const context = {
                subscriptions: []
            } as any;

            activate(context);

            const resetHandler = registerCommandStub.getCall(2).args[1];
            resetHandler();

            assert.ok(showInfoStub.calledWith('CodeZoom: Reset Zoom (not implemented yet)'));
        });
    });
});