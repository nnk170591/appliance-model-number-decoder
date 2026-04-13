# Contributing

Thanks for your interest in contributing to `appliance-model-number-decoder`!

## How to Contribute

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR-USERNAME/appliance-model-number-decoder.git`
3. **Install** dependencies: `npm install`
4. **Make** your changes
5. **Test**: `npm test`
6. **Build**: `npm run build`
7. **Submit** a pull request

## What We're Looking For

- **New model patterns** — If you find appliance model numbers that aren't detected, add them to `src/model-number/patterns.ts`
- **Part type rules** — New classification rules for `src/part-type/classifier.ts`
- **Brand decoders** — Nomenclature decoders for GE, LG, Samsung, Bosch (currently only Whirlpool-family)
- **Bug fixes** — If a model is misidentified or a part is misclassified
- **Documentation** — Improvements to reference docs

## Guidelines

- All code must be TypeScript with strict mode
- Zero runtime dependencies
- Tests required for new features
- Follow the existing pattern: first-match-wins regex arrays

## Questions?

Open an issue on GitHub or visit [oemparthub.com](https://oemparthub.com).
