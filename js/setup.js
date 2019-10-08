'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себесатьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Функция перемешивания элементов исходного массива случайным образом
 * @param {Array} inputArray - исходный массив данных
 * @return {Array} перемешанный массив
 */

var getArrayOfRandomElementsOfArray = function (inputArray) {
  var randomArray = [];
  for (var i = inputArray.length - 1; i >= 0; i--) {
    var randomIndexOfArray = Math.floor(Math.random() * inputArray.length);
    randomArray.push(inputArray[randomIndexOfArray]);
    inputArray.splice(randomIndexOfArray, 1);
  }
  return randomArray;
};

var randomWizardsNames = getArrayOfRandomElementsOfArray(WIZARD_NAMES);
var randomWizardsSurnames = getArrayOfRandomElementsOfArray(WIZARD_SURNAMES);
var randomWizardCoats = getArrayOfRandomElementsOfArray(WIZARD_COATS);
var randomWizardEyes = getArrayOfRandomElementsOfArray(WIZARD_EYES);

var wizards = [
  {
    name: randomWizardsNames[0] + ' ' + randomWizardsSurnames[0],
    coatColor: randomWizardCoats[0],
    eyesColor: randomWizardEyes[0]
  },
  {
    name: randomWizardsNames[1] + ' ' + randomWizardsSurnames[1],
    coatColor: randomWizardCoats[1],
    eyesColor: randomWizardEyes[1]
  },
  {
    name: randomWizardsNames[2] + ' ' + randomWizardsSurnames[2],
    coatColor: randomWizardCoats[2],
    eyesColor: randomWizardEyes[2]
  },
  {
    name: randomWizardsNames[3] + ' ' + randomWizardsSurnames[3],
    coatColor: randomWizardCoats[3],
    eyesColor: randomWizardEyes[3]
  }
];

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

/**
 * Функция создания DOM-элемента на основе JS-объекта
 * @param {Object} wizard -  объект с данными о маге
 * @return {any} DOM-элемент
 */

var generateWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var similarListElement = document.querySelector('.setup-similar-list');

/**
 * Функция заполнения фрагмента DOM-элементами на основе массива JS-объектов
 * @param {Array} arrayOfObjects - массив JS-объектов с данными
 * @return {DocumentFragment} фрагмент с DOM-элементами
 */

var renderWizards = function (arrayOfObjects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayOfObjects.length; i++) {
    fragment.appendChild(generateWizard(arrayOfObjects[i]));
  }
  return fragment;
};

similarListElement.appendChild(renderWizards(wizards));
document.querySelector('.setup-similar').classList.remove('hidden');
