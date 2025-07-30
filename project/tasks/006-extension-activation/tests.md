# Task 006: Extension Activation and Command Registration - Test Specifications

## Test Categories

### 1. Extension Activation Tests
**Objective**: Verify extension activates properly and handles lifecycle events

#### Unit Tests
- [ ] **Activation Success Test**
  - Test: Extension activates without errors
  - Setup: Mock VS Code context
  - Expected: activate() completes successfully
  - Validates: Basic activation works

- [ ] **Command Registration Test**
  - Test: All commands registered during activation
  - Setup: Spy on vscode.commands.registerCommand
  - Expected: 3 commands registered (zoomIn, zoomOut, reset)
  - Validates: Command system initialization

- [ ] **Status Bar Initialization Test**
  - Test: Status bar item created during activation
  - Setup: Spy on vscode.window.createStatusBarItem
  - Expected: Status bar item created and configured
  - Validates: UI integration

- [ ] **Deactivation Cleanup Test**
  - Test: Resources properly disposed on deactivation
  - Setup: Activate extension, then deactivate
  - Expected: All disposables cleaned up
  - Validates: Memory leak prevention

#### Error Handling Tests
- [ ] **Activation Failure Recovery Test**
  - Test: Extension handles activation errors gracefully
  - Setup: Mock VS Code API to throw error
  - Expected: Error logged, extension doesn't crash VS Code
  - Validates: Robust error handling

- [ ] **Command Registration Failure Test**
  - Test: Handles command registration failures
  - Setup: Mock registerCommand to fail
  - Expected: Graceful degradation, other commands still work
  - Validates: Partial failure handling

### 2. Command System Tests
**Objective**: Verify command handlers work correctly and handle errors

#### Command Execution Tests
- [ ] **Zoom In Command Test**
  - Test: zoomIn command executes successfully
  - Setup: Register commands, mock zoom manager
  - Expected: Zoom level increases, status updated
  - Validates: Core zoom functionality

- [ ] **Zoom Out Command Test**
  - Test: zoomOut command executes successfully
  - Setup: Register commands, mock zoom manager
  - Expected: Zoom level decreases, status updated
  - Validates: Core zoom functionality

- [ ] **Reset Command Test**
  - Test: reset command returns to level 0
  - Setup: Set zoom level to 3, execute reset
  - Expected: Zoom level set to 0, original code restored
  - Validates: Reset functionality

#### Command Validation Tests
- [ ] **Invalid State Handling Test**
  - Test: Commands handle invalid editor states
  - Setup: No active editor or unsupported file type
  - Expected: User-friendly error message shown
  - Validates: Input validation

- [ ] **Concurrent Command Execution Test**
  - Test: Multiple rapid command executions handled properly
  - Setup: Execute multiple commands quickly
  - Expected: Commands queued/debounced appropriately
  - Validates: Race condition prevention

### 3. Status Bar Integration Tests
**Objective**: Verify status bar displays correct information and responds to interactions

#### Display Tests
- [ ] **Initial Status Display Test**
  - Test: Status bar shows initial zoom level (0)
  - Setup: Activate extension
  - Expected: Status bar shows "Zoom: 0"
  - Validates: Initial state display

- [ ] **Zoom Level Update Test**
  - Test: Status bar updates when zoom level changes
  - Setup: Execute zoom commands
  - Expected: Status bar reflects current zoom level
  - Validates: State synchronization

- [ ] **Status Bar Click Handler Test**
  - Test: Clicking status bar opens zoom controls
  - Setup: Mock status bar click event
  - Expected: Quick pick menu with zoom options shown
  - Validates: Interactive functionality

#### Visibility Tests
- [ ] **Language-Specific Visibility Test**
  - Test: Status bar only visible for supported languages
  - Setup: Open TypeScript file vs unsupported file
  - Expected: Status bar visible for TS, hidden for others
  - Validates: Context-sensitive UI

- [ ] **Status Bar Disposal Test**
  - Test: Status bar properly disposed on deactivation
  - Setup: Activate, then deactivate extension
  - Expected: Status bar item removed from UI
  - Validates: UI cleanup

### 4. Performance Tests
**Objective**: Verify activation and command execution meet performance requirements

#### Timing Tests
- [ ] **Activation Performance Test**
  - Test: Extension activates within 100ms
  - Setup: Time activation process
  - Expected: activate() completes in <100ms
  - Validates: Performance requirement

- [ ] **Command Response Time Test**
  - Test: Commands execute quickly
  - Setup: Time command execution
  - Expected: Commands complete in <50ms (placeholder phase)
  - Validates: Responsive UI

#### Memory Tests
- [ ] **Memory Usage Test**
  - Test: Extension has minimal memory footprint
  - Setup: Monitor memory after activation
  - Expected: <10MB initial overhead
  - Validates: Efficient resource usage

- [ ] **Memory Leak Test**
  - Test: No memory leaks on repeated activation/deactivation
  - Setup: Activate/deactivate multiple times
  - Expected: Memory usage remains stable
  - Validates: Proper cleanup

### 5. Integration Tests
**Objective**: Verify integration with VS Code APIs and extension ecosystem

#### VS Code API Integration
- [ ] **Command Palette Integration Test**
  - Test: Commands appear in command palette
  - Setup: Open command palette
  - Expected: "CodeZoom:" commands visible and executable
  - Validates: VS Code integration

- [ ] **Keyboard Shortcut Integration Test**
  - Test: Keyboard shortcuts execute commands
  - Setup: Register shortcuts, simulate key presses
  - Expected: Commands executed via shortcuts
  - Validates: Shortcut system

- [ ] **Extension Host Integration Test**
  - Test: Extension works in VS Code extension host
  - Setup: Load extension in test environment
  - Expected: All functionality works as in real VS Code
  - Validates: Real-world compatibility

## Test Execution Strategy

### Pre-Implementation (TDD)
1. Write failing tests for each component
2. Implement minimum code to make tests pass
3. Refactor while keeping tests green
4. Add additional test scenarios as needed

### Test Data Requirements
- Mock VS Code context objects
- Sample TypeScript files for testing
- Mock zoom manager responses
- Simulated error conditions

### Continuous Testing
- Run tests after each implementation step
- Use watch mode during development
- Verify performance benchmarks regularly

## Acceptance Criteria
- All unit tests pass (>95% coverage)
- All integration tests pass
- Performance requirements met
- No memory leaks detected
- Manual testing in VS Code confirms functionality