# TIC-TAC-TOE Coding Challenge

See the [Frontend Coding Challange](https://squaduplabs.notion.site/Frontend-Coding-Challenge-f532fcf1e5df4c28b57682111b92a735) landing page.

Your goal is to create a really basic web app for TIC-TAC-TOE.

In this repo (structured like a monorepo), you’ll find a web app built in React/Vite. We’ve provided some starter code to establish some standards, and help you get to the good stuff quicker.

## Getting started

See the web app [README](./apps/web/README.md) for instructions on how to get started with the web app.

## Requirements

### Basic Rules of Tic-Tac-Toe

- X always goes first, players then alternate turns.
- Once a player gets three tiles in a straight line (row, column, or diagonal), they win.
- If all tiles are filled and there is no winner, it’s a draw.

### Additional requirements

- The most basic implementation offers human vs. human gameplay, taking turns.
- The game status should always read one of (_validated using automated UI tests_):
  - `Next Turn: X`
  - `Next Turn: O`
  - `Winner: X`
  - `Winner: O`
  - `It’s a Draw`

### Automated Tests

- When you run `yarn test`, you'll notice a bunch of automated tests, including UI tests. Be sure all your tests pass, but also be encouraged to expand the tests for more thorough coverage.
- Read more about tests in the web app [README](./apps/web/README.md).

### Design Guidance

- Follow the designs and designer guidance found in this [Figma file](https://www.figma.com/file/5B6h1yYAh5g5oTfzzOZBCj/TicTacToe-Coding-Challenge?type=design&node-id=0%3A1&mode=design&t=qbpjiARea2da0hnI-1) (password = `jointhesquad`).
- It’s expected you’ll implement the app to reflect the designs as closely as possible.
- Pro tip: _For the sake of expediency, you don’t need to export any graphics/assets; everything can be rendered using DIVs and text._

### Principles to Consider

- Try to stick with coding standards established in the repo. But also, be encouraged to propose alternative standards in follow-up PRs.
- We care about linting, so please pay attention to lint rules established, which are also enforced by the pipelines.

### Pull Request Workflow

- Leveraging pull requests is a big part of our day-to-day workflow. It might feel unnatural for some, but stacking PRs on top of each other can be helpful when rapidly iterating, or experimenting on top of stable iterations.
- For this exercise, we encourage you to issue multiple PRs, one hypothetical series of PRs might look like:
  - PR #1 : Basic Tic Tac Toe : `main` <- `basic-gameplay`
  - PR #2 : BONUS Mobile Responsive : `basic-gameplay` <- `mobile-responsive`
  - PR #3 : BONUS RandoBot : `mobile-responsive` <- `randobot`
- We also encourage commenting inline your PRs (even on your own code) to help communicate or engage code reviewers proactively.

## Bonus Features

We genuinely don’t want you to spend endless hours on this, but if you’re feeling ambitious, finish early, and/or have the time, here are some bonus features to consider. You’re encouraged to open separate PRs for each.

- **Mobile Responsive -** Make the app mobile responsive - so it's perfectly playable on your standard mobile browser.
- **RandoBot -** Abandon two human player mode, and add human vs. bot mode. The bot can play very naively (perhaps making random moves).
- **Game History** - Leveraging local storage, maintain a record of wins and draws, and display them elegantly within the app. Perhaps demonstrate your favorite way to manage state.
- **Flexible Grids** - Adapt your game logic and layout to support 4x4, 5x5, or any arbitrary grid size games _(and don’t worry too much about mobile responsiveness in larger cases)_
- **SuperBot** - Upgrade your computer opponent to play smarter.

## Have questions?

Don’t hesitate to reach out to [eric@squaduplabs.com](mailto:eric@squaduplabs.com) and/or [corey@squaduplabs.com](mailto:corey@squaduplabs.com)

We’ll get you unblocked as soon as we can.
