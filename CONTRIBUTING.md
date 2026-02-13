# Contributing to EditoraPDF

First off, thank you for considering contributing to EditoraPDF! 

EditoraPDF is an open-source project, and we love to receive contributions from our community. There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests, or writing code which can be incorporated into EditoraPDF itself.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/editorapdf.git
   cd editorapdf
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots, code samples, error messages)
- **Describe the behavior you observed** and what you expected to see
- **Include your environment details**: browser, OS, Node.js version

**Bug Report Template:**

```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- Browser: Chrome 120
- OS: macOS 14.0
- Node.js version: 18.17.0
- PDF file size: 5MB, 10 pages

## Screenshots
If applicable, add screenshots.

## Additional Context
Any other information about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any similar features** in other PDF editors
- **Include mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues that are great for newcomers
- `help wanted` - Issues where we need community help
- `documentation` - Documentation improvements

### Pull Requests

1. **Follow the style guidelines** (see below)
2. **Update documentation** as needed
3. **Add tests** if applicable
4. **Test your changes thoroughly**
5. **Ensure the build passes**: `npm run build`
6. **Keep pull requests focused** - one feature/fix per PR

**Pull Request Template:**

```markdown
## Description
Brief description of the changes.

## Related Issue
Fixes #(issue number)

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings or errors
- [ ] I have tested this on multiple browsers (if UI change)
```

## Development Setup

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern browser (Chrome, Firefox, Edge, Safari)

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### Project Structure

```
pdfeditor/
├── app/
│   ├── components/      # React components
│   ├── lib/            # Utility functions and PDF processing
│   ├── store/          # Zustand state management
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── public/             # Static assets
├── scripts/            # Build and deployment scripts
└── package.json
```

### Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **PDF.js** - PDF rendering (from Mozilla)
- **pdf-lib** - PDF manipulation

## Style Guidelines

### TypeScript/React

- Use **TypeScript** for all new code
- Use **functional components** with hooks
- Use **meaningful variable names**
- Keep components **small and focused**
- Extract reusable logic into **custom hooks**
- Add **JSDoc comments** for complex functions

### Code Style

```typescript
// ✅ Good
export function calculatePageScale(
  pageWidth: number,
  containerWidth: number
): number {
  return Math.min(containerWidth / pageWidth, 3.0);
}

// ❌ Bad
export function calc(w: number, c: number) {
  return Math.min(c / w, 3.0);
}
```

### Tailwind CSS

- Use **utility classes** instead of custom CSS
- Follow **responsive-first** approach
- Use **semantic color names** from the theme
- Group related utilities together

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `PdfViewer.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `pdfRender.ts`)
- **Hooks**: `use*.ts` (e.g., `useKeyboard.ts`)

## Commit Messages

Write clear, descriptive commit messages:

```bash
# Format
<type>: <subject>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, etc.)
refactor: Code refactoring
perf:     Performance improvements
test:     Adding tests
chore:    Build process or auxiliary tool changes

# Examples
feat: add undo/redo functionality
fix: resolve PDF export issue with rotated pages
docs: update README with deployment instructions
style: format code with prettier
refactor: extract text extraction logic to separate module
perf: optimize thumbnail rendering performance
```

## Community

- **GitHub Issues**: [Report bugs and request features](https://github.com/affsquadDevs/editorapdf/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/affsquadDevs/editorapdf/discussions)
- **Email**: hello@affsquad.com

## Recognition

Contributors will be recognized in our README and project documentation. Thank you for helping make EditoraPDF better! 🙏

## License

By contributing to EditoraPDF, you agree that your contributions will be licensed under the MIT License.
