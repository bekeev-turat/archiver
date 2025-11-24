import { useState } from "react";

export function useInitialOpen(
	level: number,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
	return useState(level < 2)
}
