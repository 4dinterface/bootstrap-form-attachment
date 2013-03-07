# jQote2 – Клиентский javascript шаблонизатор

## About 
http://aefxx.com/jquery-plugins/jqote2/
https://github.com/aefxx/jQote2

## API
Обзор:
+ **<a href="$(template).jqote(data[, tag])">$(template).jqote(data[, tag])</a>**
+ **<a href="$(elem).jqotepre(template, data[, tag])">$(elem).jqoteapp(template, data[, tag])</a>**
+ **<a href="$(elem).jqotepre(template, data[, tag])">$(elem).jqotepre(template, data[, tag])</a>**
+ **<a href="$(elem).jqotesub(template, data[, tag])">$(elem).jqotesub(template, data[, tag])</a>**
+ **<a href="$.jqote(template, data[, tag])">$.jqote(template, data[, tag])</a>**
+ **<a href="$.jqotec(template[, tag])">$.jqotec(template[, tag])</a>**
+ **<a href="$.jqotefn(template)">$.jqotefn(template)</a>**
+ **<a href="$.jqotetag(string)">$.jqotetag(string)</a>**

[Ссылка на полное описание](http://aefxx.com/api/jqote2-reference/)
<br/ >
<br/ >
### $(template).jqote(data[, tag])<a name="$(template).jqote(data[, tag])"></a>
jQote2 способен работать с произвольным количеством шаблонов, каждый их которых может обрабатывать произвольное количество объектов данных.

Каждый раз во время запуска, доступны следующие пременные:
+ `i and j` - переменные счетчики. `i` - считает шаблоны, `j` - объекты данных
+ `data` - объект данных. Также он доступен как `this`
+ `fn` - скомпилировання функция обрабатывающая шаблон (лямбда функция)
+ `out` - строка представляющая скомпилированный шаблон

> Описание выше также применимо к **jqoteXXX** методам.

**Returns**<br />
`out : string (the processed outcome)`

**Parameters**<br />
`data : object | array of object`<br />
`tag : string (optional, defaults to "%")`<br />
`template : jQuery object`

**Example**
```html
<p id="example"></p>

<script type="text/x-jqote-template" id="template">
    <![CDATA[
    I said <strong><*= this.greet + " " + data[j].who *></strong> !!!
    <* out = out.replace(/John/, 'World'); *>
    ]]>
</script>
```
```javascript
<script type="text/javascript">
    // let's do some jQote magic
    $('#example').append(
        $('#template').jqote({greet: 'Hello', who: 'John'}, '*')
    );
</script>
```
<br/ >
### $(elem).jqoteapp(template, data[, tag]) / append<a name="$(elem).jqotepre(template, data[, tag])"></a>
Один из трех методов, позволяющий добавлять сгенерированную разметку к элементу, найденному ранее по селектору.

**Returns**<br/>
`jQuery : jQuery object`

**Parameters**<br />
`template : jQuery object | jQuery selector | DOM element | array of DOM element | lambda | array of lambda | template string`<br />
`data : object | array of object`<br />
`tag : string (optional)`<br />
`elem : jQuery object`

**Examples**
```javascript
<script type="text/javascript">
    // let's do some jQote magic
    $('#example').jqoteapp('#template', {greet: 'Hello', who: 'John'});
</script>
```
```javascript
<script type="text/javascript">
    $('#example').jqoteapp(
        '<li><<%= this.tag %>>Styled!</<%= this.tag %></li>',
        [ {tag: 'strong'}, {tag: 'em'} ]
    );
</script>
```
<br/ >
### $(elem).jqotepre(template, data[, tag]) / prepend <a name="$(elem).jqotepre(template, data[, tag])"</a>
Аналогичен методу выше, за исключением того, что добавляет сгенерированную разметку перед элементом.
<br />
<br />
### $(elem).jqotesub(template, data[, tag]) / html only <a name="$(elem).jqotesub(template, data[, tag])"></a>
Эта функция служит для замены innerHTML элемента на сгенерированную разметку.
<br />
<br />
### $.jqote(template, data[, tag]) <a name="$.jqote(template, data[, tag])"></a>
Предоставляет ту же функциональность, что и упомянутые выше.
<br />
<br />
### $.jqotec(template[, tag]) <a name="$.jqotec(template[, tag])"></a>
Движок jQote2. Парсит шаблоны и генерирует ламбда функции. Единожды преобразовав шаблон, компилирует его в функцию, которую кеширует для увеличения скорости работы.<br />
Вы можете сохранить скомпилированную функцию в переменной и/или передать ее любой из ранее упомянутых функций, или предоставить jQote2 возможность получить их из внутреннего кэша (в этом случае передавайте связанные DOM элементы).<br />
> Обратите внимание: строка шаблона сгенерированная на лету не будет закеширована, если с ней не связан DOM элемент или лямбда функция.

**Returns**<br />
`lambda : function`

Сигнатура лябюда функции определяется как `?(i, j, data, fn)`, где `fn` ссылка на `?`. Это важно, когда вам требуются рекурсия внутри ваших шаблонов.

**Parameters**<br />
`template : jQuery object | jQuery selector | DOM element | template string`<br />
`tag : string (optional)`
<br />
<br />
### $.jqotefn(template) <a name="$.jqotefn(template)"></a>
Функция предназначена для доступа к кэшу шаблонов (`$.jqotecache`) по средствам ID - внутреннего представления DOM элементов (целое число, отсчет ведеться от 0).

**Returns**<br />
`lambda : function (or false if nonexistent)`

**Parameters**<br />
`template : jQuery object | jQuery selector | DOM element`
<br />
<br />
### $.jqotetag(string) <a name="$.jqotetag(string)"></a>
С помощью этой функции можно изменить тег идентификатор. По умолчанию это `%`.

**Returns**<br />
`void`

**Parameters**<br />
`tag : string`

