import type {
	GameHistory,
	GameMode,
	GameResult,
} from "@customTypes/game.types";

const HISTORY_KEY = "HISTORY";

export const getHistory = (): GameHistory[] => {
	const history: GameHistory[] = JSON.parse(
		localStorage.getItem(HISTORY_KEY) || "[]",
	);

	return history;
};

export const storeHistory = (result: GameResult, mode: GameMode) => {
	const history = getHistory();

	localStorage.setItem(
		HISTORY_KEY,
		JSON.stringify([
			...history,
			{ outcome: result.outcome, id: Date.now(), gameMode: mode },
		] as GameHistory[]),
	);
};
