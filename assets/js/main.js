const wallpaper = document.querySelector(".wallpaper");
const inputWidth = document.querySelector(".input-width");
const inputHeight = document.querySelector(".input-height");
const inputLinearStartColor = document.querySelector(".input-linear-start-color");
const inputLinearEndColor = document.querySelector(".input-linear-end-color");
const inputRadialColor = document.querySelector(".input-radial-color");
const btnGenerateWallpaper = document.querySelector(".btn-generate-wallpaper");

btnGenerateWallpaper.addEventListener("click", renderWallpaperFromInput);
renderWallpaperFromInput();

function renderWallpaperFromInput() {
	wallpaper.width = inputWidth.value;
	wallpaper.height = inputHeight.value;

	renderWallpaper(
		wallpaper,
		inputLinearStartColor.value,
		inputLinearEndColor.value,
		inputRadialColor.value
	);
}

/**
 * @param {HTMLCanvasElement} canvasElement
 * @param {string} linearStartColor
 * @param {string} linearEndColor
 * @param {string} radialColor
 */
function renderWallpaper(canvasElement, linearStartColor, linearEndColor, radialColor) {
	const ctx = canvasElement.getContext("2d");
	const width = canvasElement.width;
	const height = canvasElement.height;
	const linearGradient = buildLinearGradient(ctx, width, height);
	const radialGradient = buildRadialGradient(ctx, width, height);

	linearGradient.addColorStop(0, linearStartColor);
	linearGradient.addColorStop(1, linearEndColor);

	radialGradient.addColorStop(0, radialColor);
	radialGradient.addColorStop(1, "transparent");

	ctx.fillStyle = linearGradient;
	ctx.fillRect(0, 0, width, height);

	ctx.fillStyle = radialGradient;
	ctx.fillRect(0, 0, width, height);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
function buildLinearGradient(ctx, width, height) {
	return ctx.createLinearGradient(0, 0, width, height);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
function buildRadialGradient(ctx, width, height) {
	const x = getRandomNumber(width * 0.75, width);
	const y = getRandomNumber(height * 0.25, height * 0.75);
	const size = width / 2;

	return ctx.createRadialGradient(x, y, 0, x, y, size);
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}