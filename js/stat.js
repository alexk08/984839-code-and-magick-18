'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var INDENT = 20;
var SPACING = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

/**
 * Отрисовывает облако заданного цвета на холсте
 * @param {Object} ctx - объект канваса
 * @param {number} x - координата X
 * @param {number} y - координата Y
 * @param {string} color - цвет заливки
 */

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Отображает текст с заданным цветом
 * @param {Object} ctx - объект канваса
 * @param {string} color - цвет текста
 * @param {string} text - текст
 * @param {number} x - координата X
 * @param {number} y - координата Y
 */

var renderText = function (ctx, color, text, x, y) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

/**
 * Функция поиска максимального элемента массива
 * @param {Array} arr - массив
 * @return {number} - максимальный элемент массива
 */

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/**
 * Отображает в заданном цвете каждый элемент массива с новой строки
 * @param {Object} ctx - объект канваса
 * @param {Array} strings - массив строк
 * @param {string} color - цвет текста
 */

var renderTextFromArray = function (ctx, strings, color) {
  ctx.fillStyle = color;
  strings.forEach(function (string, i) {
    ctx.fillText(string, CLOUD_X + INDENT, CLOUD_Y + INDENT + FONT_GAP * (i + 1));
  });
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderTextFromArray(ctx, ['Ура вы победили!', 'Список результатов:'], '#000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barX = CLOUD_X + SPACING + (BAR_WIDTH + SPACING) * i;
    var barY = CLOUD_Y + BAR_HEIGHT * (1.5 - times[i] / maxTime);

    renderText(ctx, '#000', players[i], barX, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    renderText(ctx, '#000', Math.round(times[i]), barX, CLOUD_Y + barY - FONT_GAP);

    var barColor = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + 100 * Math.random() + '%, 50%)';
    ctx.fillStyle = barColor;

    ctx.fillRect(barX, barY, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
