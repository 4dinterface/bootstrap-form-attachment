# jQote2 � ���������� javascript ������������

## About 
http://aefxx.com/jquery-plugins/jqote2/
https://github.com/aefxx/jQote2

## API
�����:
+ **<a href="$(template).jqote(data[, tag])">$(template).jqote(data[, tag])</a>**
+ **<a href="$(elem).jqotepre(template, data[, tag])">$(elem).jqoteapp(template, data[, tag])</a>**
+ **<a href="$(elem).jqotepre(template, data[, tag])">$(elem).jqotepre(template, data[, tag])</a>**
+ **<a href="$(elem).jqotesub(template, data[, tag])">$(elem).jqotesub(template, data[, tag])</a>**
+ **<a href="$.jqote(template, data[, tag])">$.jqote(template, data[, tag])</a>**
+ **<a href="$.jqotec(template[, tag])">$.jqotec(template[, tag])</a>**
+ **<a href="$.jqotefn(template)">$.jqotefn(template)</a>**
+ **<a href="$.jqotetag(string)">$.jqotetag(string)</a>**

[������ �� ������ ��������](http://aefxx.com/api/jqote2-reference/)
<br/ >
<br/ >
### $(template).jqote(data[, tag])<a name="$(template).jqote(data[, tag])"></a>
jQote2 �������� �������� � ������������ ����������� ��������, ������ �� ������� ����� ������������ ������������ ���������� �������� ������.

������ ��� �� ����� �������, �������� ��������� ���������:
+ `i and j` - ���������� ��������. `i` - ������� �������, `j` - ������� ������
+ `data` - ������ ������. ����� �� �������� ��� `this`
+ `fn` - ��������������� ������� �������������� ������ (������ �������)
+ `out` - ������ �������������� ���������������� ������

> �������� ���� ����� ��������� � **jqoteXXX** �������.

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
���� �� ���� �������, ����������� ��������� ��������������� �������� � ��������, ���������� ����� �� ���������.

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
���������� ������ ����, �� ����������� ����, ��� ��������� ��������������� �������� ����� ���������.
<br />
<br />
### $(elem).jqotesub(template, data[, tag]) / html only <a name="$(elem).jqotesub(template, data[, tag])"></a>
��� ������� ������ ��� ������ innerHTML �������� �� ��������������� ��������.
<br />
<br />
### $.jqote(template, data[, tag]) <a name="$.jqote(template, data[, tag])"></a>
������������� �� �� ����������������, ��� � ���������� ����.
<br />
<br />
### $.jqotec(template[, tag]) <a name="$.jqotec(template[, tag])"></a>
������ jQote2. ������ ������� � ���������� ������ �������. �������� ������������ ������, ����������� ��� � �������, ������� �������� ��� ���������� �������� ������.<br />
�� ������ ��������� ���������������� ������� � ���������� �/��� �������� �� ����� �� ����� ���������� �������, ��� ������������ jQote2 ����������� �������� �� �� ����������� ���� (� ���� ������ ����������� ��������� DOM ��������).<br />
> �������� ��������: ������ ������� ��������������� �� ���� �� ����� ������������, ���� � ��� �� ������ DOM ������� ��� ������ �������.

**Returns**<br />
`lambda : function`

��������� ������ ������� ������������ ��� `?(i, j, data, fn)`, ��� `fn` ������ �� `?`. ��� �����, ����� ��� ��������� �������� ������ ����� ��������.

**Parameters**<br />
`template : jQuery object | jQuery selector | DOM element | template string`<br />
`tag : string (optional)`
<br />
<br />
### $.jqotefn(template) <a name="$.jqotefn(template)"></a>
������� ������������� ��� ������� � ���� �������� (`$.jqotecache`) �� ��������� ID - ����������� ������������� DOM ��������� (����� �����, ������ �������� �� 0).

**Returns**<br />
`lambda : function (or false if nonexistent)`

**Parameters**<br />
`template : jQuery object | jQuery selector | DOM element`
<br />
<br />
### $.jqotetag(string) <a name="$.jqotetag(string)"></a>
� ������� ���� ������� ����� �������� ��� �������������. �� ��������� ��� `%`.

**Returns**<br />
`void`

**Parameters**<br />
`tag : string`

