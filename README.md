# MARSTROI
Структура:
```
app/
  |--scss/
     |--global/
     |--blocks/
     |--vendors/
     |--variables.scss
     |--functions.scss
     |--mixins.scss
     |--styles.scss
  |--img/
     |--svg-icons/
     |--svg-symbols/ (для объединения в один файл symbols.svg)
  |--js/
     |--plugins/
     |--script.js
  |--fonts/
  |--blocks (инклюды)

build/
  |--css/
     |--style.css
  |--fonts/
  |--img/
     |--symbols.svg
  |--js
other/
   |--psd
```

## Установка
1. Перейти в родительскую папку проектов
2. Запустить консоль Git Bash
3. Ввести команду `git clone https://github.com/corvus-007/marstroi`
4. Перейти в каталог проекта `cd имя_проекта`
5. Установить модули из package.json — `npm install`

## Запуск проекта
`npm start`
## Сборка проекта
`npm run build`
## Удаление папки build
`gulp clean`


Из папки js/plugins/ объединяются js-файлы и помещаются в js/plugins.js
Из папки img/svg-symbols/ объединяются svg-файлы и помещаются в img/symbols.svg
