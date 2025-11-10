<style>
#floatingmenu {
width:100%;
height:320px;
position:absolute;
bottom:-300px;
z-index:99999;
background:#000;
-webkit-transition: all 700ms ease;
		-moz-transition: all 700ms ease;
        -ms-transition: all 700ms ease;
        -o-transition: all 700ms ease;
		transition: all 700ms ease;
}

#floatingmenu:hover {
bottom:0px;
-webkit-transition: all 700ms ease;
		-moz-transition: all 700ms ease;
        -ms-transition: all 700ms ease;
        -o-transition: all 700ms ease;
		transition: all 700ms ease;
}

#listcontainer {
position:relative;
width:900px;
margin-left:auto;
margin-right: auto;
}

#listcontainer ul {
width:290px;
float:left;
color:FFF;
</style>

<div id="floatingmenu">
    <div id="listcontainer">
        <ul class="floatingcolumn">
            <li>Link 1</li>
        </ul>
        <ul class="floatingcolumn">
            <li>Link 2</li>
        </ul>
        <ul class="floatingcolumn">
            <li>Link 3</li>
        </ul>
    </div>
</div>