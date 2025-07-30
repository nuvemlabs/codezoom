# CodeZoom VS Code Extension

Progressive code summarization for architectural understanding.

## Overview

CodeZoom enables developers to progressively "zoom out" from detailed code implementation to high-level architectural understanding through AI-powered code summarization. Navigate between 6 different zoom levels, from original code to file-level summaries.

## Features

- **6 Zoom Levels**: From detailed code (Level 0) to architectural overview (Level 5)
- **Multi-Language Support**: TypeScript, JavaScript, Python, Java
- **Keyboard Shortcuts**: Quick zoom in/out with familiar shortcuts
- **AI-Powered**: Intelligent code summarization using LLM providers
- **Performance Optimized**: <2s initial summarization, <200ms zoom transitions

## Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nuvemlabs/codezoom.git
   cd codezoom
   ```

2. **Install dependencies**
   ```bash
   make install
   # or
   npm install
   ```

3. **Build the extension**
   ```bash
   make build
   # or
   npm run compile
   ```

4. **Run tests**
   ```bash
   make test
   # or
   npm test
   ```

### VS Code Development

1. **Open in VS Code**
   ```bash
   code .
   ```

2. **Launch Extension Development Host**
   - Press `F5` or use Command Palette: "Debug: Start Debugging"
   - Or use: `make debug`

3. **Test the extension**
   - Open a TypeScript/JavaScript file in the development host
   - Use keyboard shortcuts or Command Palette to test zoom commands

## Usage

### Keyboard Shortcuts

- **Zoom In**: `Ctrl+Shift+=` (Mac: `Cmd+Shift+=`)
- **Zoom Out**: `Ctrl+Shift+-` (Mac: `Cmd+Shift+-`)
- **Reset Zoom**: `Ctrl+Shift+0` (Mac: `Cmd+Shift+0`)

### Command Palette

1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type "CodeZoom" to see available commands:
   - `CodeZoom: Zoom In`
   - `CodeZoom: Zoom Out`
   - `CodeZoom: Reset Zoom`

### Zoom Levels

- **Level 0**: Original code unchanged
- **Level 1**: Inline comments replaced with summaries, simple statements grouped
- **Level 2**: Method implementations as pseudo-code, signatures preserved
- **Level 3**: Methods as signatures with purpose descriptions
- **Level 4**: Class-level overview with structure and relationships
- **Level 5**: File-level summary with main purpose and key exports

## Development

### Available Commands

```bash
make help          # Show available commands
make install       # Install dependencies
make build         # Build the extension
make test          # Run all tests
make test-unit     # Run unit tests only
make test-e2e      # Run end-to-end tests only
make watch         # Watch for changes and rebuild
make debug         # Launch extension in debug mode
make package       # Package extension for distribution
make clean         # Clean build artifacts
```

### Project Structure

```
src/
├── extension.ts              # Main extension entry point
├── commands/                 # Command handlers
├── core/                     # Core business logic
├── llm/                      # LLM integration
├── parsers/                  # Language-specific parsers
├── ui/                       # User interface components
└── utils/                    # Utility functions

test/
├── unit/                     # Unit tests
└── e2e/                      # End-to-end tests

project/
└── tasks/                    # Task planning and documentation
```

### Contributing

1. **Follow TDD**: Write tests before implementation
2. **Atomic Commits**: Keep commits small and focused
3. **Technical Messages**: Use imperative mood for commit messages
4. **Quality Gates**: Run lint and tests before committing

### Testing

The project uses comprehensive testing with Mocha, Chai, and Sinon:

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Watch mode for tests
npm run watch-tests
```

## Architecture

### Core Components

- **Zoom Manager**: Manages zoom levels and state transitions
- **Code Analyzer**: Parses and analyzes code structure
- **Summary Generator**: Generates AI-powered code summaries
- **Cache Manager**: Handles summary caching for performance
- **LLM Providers**: Pluggable AI providers (OpenAI, Anthropic, local)

### Language Support

- **TypeScript/JavaScript**: Full AST parsing and summarization
- **Python**: Planned for future release
- **Java**: Planned for future release

## Performance

- **Initial Summarization**: <2 seconds for 500 lines of code
- **Zoom Transitions**: <200ms between levels
- **Memory Usage**: <100MB overhead
- **Cache Hit Rate**: >80% for repeated views

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/nuvemlabs/codezoom/issues)
- **Documentation**: See `docs/` directory
- **Development Guide**: See `CLAUDE.md`

---

**Status**: MVP Development in Progress
**Version**: 0.1.0
**Publisher**: nuvemlabs