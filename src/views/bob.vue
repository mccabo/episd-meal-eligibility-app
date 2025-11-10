<template>
    <audio id="audMain" controls src="http://localhost/michael/afml.mp3" hidden></audio>
    <div id="divMain" name="main" class="main" style="display: flex;margin: auto;justify-content: space-evenly;">
        <img onclick="clickMe('king','afml.mp3')" src="king.jpg" alt="" class="bob">
        <img onclick="clickMe('running','bw.mp3')" src="running.jpg" alt="" class="bob">
        <img onclick="clickMe('buddies')" src="buddies.jpg" alt="" class="bob">
        <img onclick="clickMe('happy')" src="happy.jpg" alt="" class="bob">
        <img onclick="clickMe('wink')" src="wink.jpg" alt="" class="bob">
        <img onclick="clickMe('sad')" src="sad.jpg" alt="" class="bob" hidden>
        <img onclick="clickMe('dumdum')" src="dumdum.jpg" alt="" class="bob">
        <img onclick="clickMe('burger')" src="burger.jpg" alt="" class="bob">
    </div>           
    <div id="divMain" name="main" class="main w3-margin">
        <img id="imgMain" onclick="clickMe('king')" src="king.jpg" alt="" class="bobMain">                
    </div>           
</template>
        <script>        
        </script>
        <style>
            .main {
                color: red;
                font-size: 100px;
            }
            .bob {
                border: solid purple 3px;
                border-radius: 8px;
                width: 100px;
                height: 100px;
                padding: 10px;
            }
            .bobMain {
                display: flex;
                margin: auto;
                border: solid purple 3px;
                border-radius: 8px;
                width: 150px;
                height: 150px;
                padding: 10px;
                justify-content: center;;
            }
        </style>