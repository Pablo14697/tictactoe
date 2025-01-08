# web

This is the web app for Tic Tac Toe.

---

## Development

### Node (v18.19.0)

We recommend using [nvm](https://github.com/nvm-sh/nvm).

We use v18.19.0 to match our cloud run-time environment.

To help guarantee your run-time environment, we define `{ engines }` in our package.json.

Also, we maintain a [.nvmrc](./.nvmrc) project file, such that you can simply:

```bash
nvm use
```

To understand which version(s) you have installed and are running, you can:

```bash
nvm list
node -v
```

## Quick Start

```bash
yarn dev:reset
yarn dev
```

## Automated Tests

To run tests, simply run:

```bash
yarn test
```

- You'll notice there are two different automated tests - one that's UI driven, and the other that's isolated around game logic.
- UI tests are found in [game.page.test.tsx](./src/components/pages/game/game.page.test.tsx).
- These tests will also be run in a pipeline, and are required to pass before merging.

### Working with UI Tests

- The tests require that you add a `data-testid` attribute to certain elements so the test knows what to interact with. See the [contants.ts](./src/constants.ts) file for variables with test IDs, which you will need to use on the following elements:
  - Reset Button - the reset button on your page must have the `data-testid` attribute set to `action-button`. We have provided a shared component via [action-button.component.tsx](./src/components/shared/action-button.component.tsx) for you to start with, which already has the `data-testid` attribute set.
  - Game Status - the game status text on your page, for example "Winner: X" must have the `data-testid` attribute set to `game-status`.
  - Cell - the game board's nine cells on your page must each have a `data-testid` attribute set to `cell-{index}`, where `{index}` is an integer between 0 and 8, inclusive. The cells should be ordered from left-to-right, top-to-bottom, starting at 0.
