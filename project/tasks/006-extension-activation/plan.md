# Task 006: Extension Activation and Command Registration - Implementation Plan

## Overview
Implement proper VS Code extension activation with robust command registration system, replacing the basic scaffold with production-ready command handlers and activation logic.

## Scope
- Enhanced extension activation with proper lifecycle management
- Command registration system with error handling
- Activation event optimization for performance
- Status bar integration for zoom level display
- Command validation and proper disposal

## Current State Analysis
Currently have basic extension.ts with:
- Simple activate/deactivate functions
- Basic command registration for zoom in/out/reset
- Placeholder command handlers showing info messages
- No error handling or status management

## Implementation Steps

### 1. Write Failing Tests First (TDD)
- [ ] Test activation lifecycle management
- [ ] Test command registration with proper handlers
- [ ] Test status bar integration
- [ ] Test error handling scenarios
- [ ] Test proper disposal on deactivation

### 2. Command System Architecture
- [ ] Create commands/zoomCommands.ts module
- [ ] Implement ZoomCommandManager class
- [ ] Add command validation and error handling
- [ ] Implement command state management

### 3. Status Bar Integration
- [ ] Create ui/statusBar.ts module
- [ ] Implement zoom level status indicator
- [ ] Add click handlers for status bar item
- [ ] Integrate with command system

### 4. Enhanced Activation
- [ ] Improve activation logic with error handling
- [ ] Add activation event optimization
- [ ] Implement proper resource management
- [ ] Add activation status logging

### 5. Error Handling Framework
- [ ] Create utils/errorHandler.ts
- [ ] Implement graceful error recovery
- [ ] Add user-friendly error messages
- [ ] Integrate with VS Code error reporting

## Technical Design

### Command Architecture
```typescript
interface CommandManager {
  registerCommands(context: vscode.ExtensionContext): void;
  executeZoomIn(): Promise<void>;
  executeZoomOut(): Promise<void>;
  executeReset(): Promise<void>;
  dispose(): void;
}
```

### Status Bar Integration
```typescript
interface StatusBarManager {
  initialize(context: vscode.ExtensionContext): void;
  updateZoomLevel(level: number): void;
  show(): void;
  hide(): void;
  dispose(): void;
}
```

### Activation Events
- Optimize activation for performance
- Use specific language triggers
- Lazy load components when needed

## Success Criteria
- [ ] All tests pass (unit tests for command system)
- [ ] Commands execute without errors
- [ ] Status bar shows zoom level indicator
- [ ] Error handling prevents extension crashes
- [ ] Proper resource disposal on deactivation
- [ ] Performance: activation <100ms

## Dependencies
- Current basic extension.ts structure
- Testing framework (already setup)
- VS Code API types

## Risk Mitigation
- Implement error boundaries around command execution
- Use defensive programming for VS Code API calls
- Add telemetry for activation issues
- Graceful degradation if status bar fails

## Testing Strategy
- Unit tests for command manager logic
- Integration tests for VS Code API interaction
- Error scenario testing
- Performance testing for activation time

## Performance Considerations
- Lazy load command handlers
- Minimize activation footprint
- Cache status bar items
- Efficient event listener management