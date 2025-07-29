# CodeZoom VS Code Extension - Development Guide

## Project Overview

CodeZoom is a VS Code extension that enables developers to progressively "zoom out" from detailed code implementation to high-level architectural understanding through AI-powered code summarization. This document provides complete instructions for developing the MVP from start to finish.

## Repository Information

- **GitHub Repository**: https://github.com/nuvemlabs/codezoom
- **VS Code Marketplace Publisher**: nuvemlabs
- **Publisher ID**: nuvemlabs  
- **DevOps Address**: https://dev.azure.com/nuvemlabs/
- **Starting Directory**: `codezoom/`

## Development Principles

- **Test-Driven Development (TDD)**: Write tests before implementation
- **Atomic Commits**: Keep commits small and focused on single changes
- **Technical Commit Messages**: Direct, no-nonsense descriptions of technical changes
- **Documentation**: Keep README and docs updated with each change
- **Interactive Development**: Use Makefile for all development operations

## Architecture Design

### Core Components

```
src/
├── extension.ts              # Main extension entry point
├── commands/                 # Command handlers
│   ├── zoomCommands.ts      # Zoom in/out/reset commands
│   └── configCommands.ts    # Configuration commands
├── core/                    # Core business logic
│   ├── zoomManager.ts       # Manages zoom levels and state
│   ├── codeAnalyzer.ts      # Parses and analyzes code structure
│   ├── summaryGenerator.ts  # Generates code summaries
│   └── cacheManager.ts      # Handles summary caching
├── llm/                     # LLM integration
│   ├── llmProvider.ts       # Abstract LLM provider interface
│   ├── openaiProvider.ts    # OpenAI implementation
│   ├── anthropicProvider.ts # Anthropic implementation
│   └── localProvider.ts     # Local/offline fallback
├── parsers/                 # Language-specific parsers
│   ├── baseParser.ts        # Abstract parser interface
│   ├── typescriptParser.ts  # TypeScript/JavaScript parser
│   ├── pythonParser.ts      # Python parser
│   └── javaParser.ts        # Java parser
├── ui/                      # User interface components
│   ├── statusBar.ts         # Status bar integration
│   ├── zoomWidget.ts        # Floating zoom control
│   └── settingsPanel.ts     # Configuration UI
└── utils/                   # Utility functions
    ├── logger.ts            # Logging utility
    ├── config.ts            # Configuration management
    └── performance.ts       # Performance monitoring
```

### Zoom Levels Specification

- **Level 0**: Original code unchanged
- **Level 1**: Inline comments replaced with summaries, simple statements grouped
- **Level 2**: Method implementations as pseudo-code, signatures preserved
- **Level 3**: Methods as signatures with purpose descriptions
- **Level 4**: Class-level overview with structure and relationships
- **Level 5**: File-level summary with main purpose and key exports

### Technical Requirements

- **Languages**: TypeScript/JavaScript, Python, Java (MVP)
- **Performance**: <2s initial summarization for 500 lines, <200ms zoom transitions
- **Memory**: <100MB overhead
- **Cache Hit Rate**: >80% for repeated views
- **VS Code API**: Latest stable extension API

## Task Breakdown

### Phase 1: Project Setup & Foundation
- [ ] **001**: Project initialization and repository setup
- [ ] **002**: VS Code extension boilerplate and build system
- [ ] **003**: Testing framework setup (unit + e2e)
- [ ] **004**: Makefile with development commands
- [ ] **005**: CI/CD pipeline configuration

### Phase 2: Core Architecture
- [ ] **006**: Extension activation and command registration
- [ ] **007**: Configuration management system
- [ ] **008**: Logging and error handling framework
- [ ] **009**: Base parser interface and TypeScript parser
- [ ] **010**: Zoom manager core logic

### Phase 3: LLM Integration
- [ ] **011**: LLM provider interface and OpenAI implementation
- [ ] **012**: Summary generation pipeline
- [ ] **013**: Cache management system
- [ ] **014**: Offline fallback mechanism
- [ ] **015**: Token limit handling and chunking

### Phase 4: Zoom Functionality
- [ ] **016**: Zoom level 1 implementation (comment summarization)
- [ ] **017**: Zoom level 2 implementation (pseudo-code methods)
- [ ] **018**: Zoom level 3 implementation (method signatures)
- [ ] **019**: Zoom level 4 implementation (class overview)
- [ ] **020**: Zoom level 5 implementation (file summary)

### Phase 5: User Interface
- [ ] **021**: Status bar zoom level indicator
- [ ] **022**: Keyboard shortcut handlers
- [ ] **023**: Command palette integration
- [ ] **024**: Editor content replacement system
- [ ] **025**: Visual indicators for summarized code

### Phase 6: Performance & Polish
- [ ] **026**: Performance optimization and profiling
- [ ] **027**: Error handling and user feedback
- [ ] **028**: Settings UI and configuration panel
- [ ] **029**: Documentation and help system
- [ ] **030**: Marketplace preparation and packaging

## Development Workflow

### Initial Setup Commands

```bash
# 1. Initialize project structure
git init
git remote add origin https://github.com/nuvemlabs/codezoom.git

# 3. Create initial directory structure
mkdir -p src/{commands,core,llm,parsers,ui,utils}
mkdir -p test/{unit,e2e}
mkdir -p project/tasks
mkdir -p docs

# 4. Initialize npm project
npm init -y

# 5. Install VS Code extension dependencies
npm install --save-dev @types/vscode @vscode/test-electron typescript ts-loader webpack webpack-cli

# 6. Install testing dependencies  
npm install --save-dev mocha @types/mocha chai @types/chai sinon @types/sinon

# 7. Install production dependencies
npm install axios dotenv
```

### Makefile Structure

Create a Makefile with these targets:

```makefile
.PHONY: help install build test test-unit test-e2e watch debug package publish clean

help:          ## Show this help
install:       ## Install dependencies
build:         ## Build the extension
test:          ## Run all tests
test-unit:     ## Run unit tests only
test-e2e:      ## Run end-to-end tests only
watch:         ## Watch for changes and rebuild
debug:         ## Launch extension in debug mode
package:       ## Package extension for distribution
publish:       ## Publish to VS Code marketplace
clean:         ## Clean build artifacts
```

### Testing Strategy

#### Unit Tests
- Test each component in isolation
- Mock external dependencies (LLM APIs, VS Code APIs)
- Achieve >90% code coverage
- Focus on core logic: parsing, summarization, zoom levels

#### End-to-End Tests
- Test complete user workflows
- Use VS Code extension test framework
- Test keyboard shortcuts and commands
- Verify UI updates and state management

### Commit Message Format

Use imperative mood with technical focus:

```
feat: add TypeScript parser with AST analysis
fix: resolve memory leak in cache manager  
test: add unit tests for zoom level transitions
refactor: extract LLM provider interface
docs: update README with installation instructions
```

### Task Planning Process

For each task requiring detailed planning:

1. Create `project/tasks/XXX-task-name/` folder
2. Generate required files:
   - `plan.md`: Detailed implementation plan
   - `tests.md`: Test specifications and scenarios
   - `logs.md`: Development progress and decisions
   - `verification-of-conclusion.md`: Acceptance criteria and validation
   - `lessons-learned.md`: Post-completion insights

### Quality Gates

Before marking any task complete:

1. All tests pass (unit + e2e)
2. Code coverage meets minimum threshold
3. Documentation updated
4. Manual testing completed
5. Performance benchmarks met
6. Code reviewed (self-review minimum)

## PRD Integration

The complete Product Requirements Document is located in `/docs/prd.md` and must be referenced throughout development. Key requirements to validate against:

- **Performance**: <2s initial summarization, <200ms transitions
- **Languages**: TypeScript/JavaScript, Python, Java support
- **Zoom Levels**: All 6 levels (0-5) implemented correctly
- **User Experience**: Seamless integration with VS Code workflows
- **Configuration**: Multiple LLM providers, customizable shortcuts
- **Caching**: Local storage with >80% hit rate

## Success Criteria

### MVP Launch Requirements

1. ✅ All zoom levels functional for TypeScript/JavaScript
2. ✅ OpenAI LLM integration with caching
3. ✅ Keyboard shortcuts and command palette
4. ✅ Status bar integration
5. ✅ Performance requirements met
6. ✅ Comprehensive test coverage >80%
7. ✅ Documentation complete
8. ✅ VS Code marketplace ready

### Quality Metrics

- **Crash Rate**: <0.1%
- **Memory Usage**: <100MB overhead
- **User Satisfaction**: >85% (based on early feedback)
- **Cache Hit Rate**: >80%
- **Test Coverage**: >80%

## Development Notes

### User Interaction Protocol

- Ask clarifying questions when requirements are ambiguous
- Provide status updates after each major milestone
- Request feedback on architectural decisions
- Confirm test scenarios before implementation

### Error Handling Strategy

- Graceful degradation when LLM APIs unavailable
- Clear error messages for configuration issues
- Fallback to original code view on parsing failures
- Comprehensive logging for debugging

### Security Considerations

- Secure API key storage in VS Code settings
- No code transmission beyond LLM processing
- Optional local-only mode for sensitive codebases
- Clear data retention policies

---

## Getting Started

1. **Read this document completely**
2. **Review the PRD in `/docs/prd.md`**
3. **Start with task 001: Project initialization**
4. **Follow TDD methodology strictly**
5. **Ask questions when uncertain**
6. **Keep commits atomic and technical**
7. **Update documentation continuously**

Ready to begin development! Start with task 001 and create the initial project structure following the specifications above.
