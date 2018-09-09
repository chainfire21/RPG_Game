$(document).ready(function () {

    function Player(name, hp, atk, def, imgRoute, arrAbilities) {
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.imgRoute = imgRoute;
        this.currentHp = hp;
        this.arrAbilities = arrAbilities;
        this.playerCard = function () {
            var abilityButtons = $("<div>").addClass("col");
            arrAbilities.forEach(function (element) {
                var abilityButton = $("<div>").addClass("row justify-content-center").html($("<a>").addClass("btn btn-secondary col m-1 disabled").attr("id", element).html(element));
                abilityButtons.append(abilityButton);

            });
            var hpBar = $("<div>").addClass("progress").html($("<div>").addClass("progress-bar bg-danger").attr({ "id": "hpBarPlayer", "style": "width:100%", "role": "progressbar", "aria-valuenow": "100", "aria-valuemin": "0", "aria-valuemax": "100" }));
            var playerCardBody = $("<div>").addClass("card-body col ").html($("<h5>").addClass("card-title text-center player").attr("id", name));
            playerCardBody.append(abilityButtons);
            var playerCardHeading = $("<div>").addClass("card col playerCard").html($("<img>").addClass("card-img-top").attr({ "id": "playerImage", "src": imgRoute }));
            playerCardHeading.append(hpBar, playerCardBody);
            $("#PCs").append(playerCardHeading);
            $("#" + name).html(name);
        }
        this.updateHP = function (damage) {
            this.currentHp = this.currentHp - damage + this.def;

            var percentage = (this.currentHp / hp * 100);
            $("#hpBarPlayer").attr("style", "width: " + percentage + "%");
        }
    }

    function Enemy(name, maxHp, atk, def, imgRoute) {
        this.name = name;
        this.maxHp = maxHp;
        this.atk = atk;
        this.def = def;
        this.imgRoute = imgRoute;
        this.currentHp = maxHp;
        this.enemyCard = function () {
            var hpBar = $("<div>").addClass("progress").html($("<div>").addClass("progress-bar bg-danger").attr({ "id": "hpBarEnemy", "style": "width:100%", "role": "progressbar", "aria-valuenow": "100", "aria-valuemin": "0", "aria-valuemax": "100" }));
            var playerCardBody = $("<div>").addClass("card-body col").html($("<h5>").addClass("card-title text-center enemy").attr("id", name));
            var playerCardHeading = $("<div>").addClass("card col enemyCard").html($("<img>").addClass("card-img-top").attr({ "id": "enemyImage", "src": imgRoute }));
            playerCardHeading.append(hpBar, playerCardBody);
            $("#NPCs").append(playerCardHeading);
            $("#" + name).html(name);
        }
        this.updateHP = function (damage) {
            this.currentHp = this.currentHp - damage + this.def;
            var percentage = (this.currentHp / maxHp * 100);
            $("#hpBarEnemy").attr("style", "width: " + percentage + "%");
        }
    }

    var player;
    var enemy;
    var defeatedTypes = [];
    var rogueSong = new Audio();
    rogueSong.src = "./assets/music/82_Nightmare.mp3";
    var fighterSong = new Audio();
    fighterSong.src = "./assets/music/4_Solemn_Vow-a.mp3";
    var wizardSong = new Audio();
    wizardSong.src = "./assets/music/148_Barovian_Castle.mp3";


    //The player chose the Rogue, build and add the card
    $("body").on("click", "#rogueAdd", function () {
        $("#PCs").empty();
        player = new Player("Rogue", 50, 8, 2, "./assets/images/rogue.jpg", ["Attack", "Critical"]);
        player.playerCard();
        $("#characterCreation").addClass("d-none");
        $("#enemyCreation").removeClass("d-none");
        rogueSong.play();
    });

    //The player chose the Wizard, build and add the card
    $("body").on("click", "#wizAdd", function () {
        $("#PCs").empty();
        player = new Player("Wizard", 45, 10, 1, "./assets/images/wizard.jpg", ["Attack", "Fireball"]);
        player.playerCard();
        $("#characterCreation").addClass("d-none");
        $("#enemyCreation").removeClass("d-none");
        wizardSong.play();

    });

    //The player chose the Fighter, build and add the card
    $("body").on("click", "#fighterAdd", function () {
        $("#PCs").empty();
        player = new Player("Fighter", 65, 5, 3, "./assets/images/fighter.jpg", ["Attack", "Smite"]);
        player.playerCard();
        $("#characterCreation").addClass("d-none");
        $("#enemyCreation").removeClass("d-none");
        fighterSong.play();
    });

    //Player chose the Demon enemy, build and add the card
    $("#enemyCreation").on("click", "#demon", function () {
        $("#NPCs").empty();
        enemy = new Enemy("Demon", 40, 4, 1, "./assets/images/demon.png");
        enemy.enemyCard();
        $("#enemyCreation").addClass("d-none");
        enableAbilities();
        $("#allCreation").append($("<h3>").attr("id", "fight").html("FIGHT!!"));
    });

    //Player chose the Abomination enemy, build and add the card
    $("#enemyCreation").on("click", "#abomination", function () {
        $("#NPCs").empty();
        enemy = new Enemy("Abomination", 50, 6, 2, "./assets/images/abomination.jpg");
        enemy.enemyCard();
        $("#enemyCreation").addClass("d-none");
        enableAbilities();
        $("#allCreation").append($("<h3>").attr("id", "fight").html("FIGHT!!"));
    });

    //Player chose the Drow enemy, build and add the card
    $("#enemyCreation").on("click", "#drow", function () {
        $("#NPCs").empty();
        enemy = new Enemy("Drow", 55, 7, 3, "./assets/images/drow.jpg");
        enemy.enemyCard();
        $("#enemyCreation").addClass("d-none");
        enableAbilities();
        $("#allCreation").append($("<h3>").attr("id", "fight").html("FIGHT!!"));
    });

    //Player chose the Abyss enemy, build and add the card
    $("#enemyCreation").on("click", "#abyss", function () {
        $("#NPCs").empty();
        enemy = new Enemy("Abyss", 70, 10, 4, "./assets/images/abyss.jpg");
        enemy.enemyCard();
        $("#enemyCreation").addClass("d-none");
        enableAbilities();
        $("#allCreation").append($("<h3>").attr("id", "fight").html("FIGHT!!"));
    });

    //Listen for the player clicking the attack button
    $("#PCs").on("click", "#Attack", function (e) {
        enemy.updateHP(player.atk);
        player.updateHP(enemy.atk);
        checkEnd();
    });

    //This will only work with Rogue Critical ability
    $("#PCs").on("click", "#Critical", function (e) {
        enemy.updateHP(player.atk * 5);
        player.updateHP(enemy.atk);
        $("#Critical").addClass("disabled");
        checkEnd();
    });

    //This will only work with Wizard Fireball ability
    $("#PCs").on("click", "#Fireball", function (e) {
        enemy.updateHP(player.atk * 5);
        player.updateHP(enemy.atk);
        $("#Fireball").addClass("disabled");
        checkEnd();
    });

    //This will only work with Fighter Smite ability
    $("#PCs").on("click", "#Smite", function (e) {
        enemy.updateHP(player.atk * 5);
        player.updateHP(enemy.atk);
        $("#Smite").addClass("disabled");
        checkEnd();
    });

    //The player clicked the defeat button after a loss or defeated all enemies
    $("body").on("click", "#pLoss", function (e) {
        resetGameState();
        $("#between").empty();
    });

    //The player won, click the victory button and go on to choose another enemy
    $("body").on("click", "#pWon", function (e) {
        continueGameState();
        $("#between").empty();
    });

    // check if game ended
    function checkEnd() {

        //if the enemy died, open up victory button 
        if (enemy.currentHp <= 0) {
            // $("#enemyImage").attr("src", "./assets/images/" + enemy.name.toLowerCase() + "Defeat.jpg");
           
            defeatedTypes.push(enemy.name.toLowerCase());
            disableAbilities();
            $(".enemyCard").append($("<div>").addClass("centered").text("Defeated"));
            if (defeatedTypes.length === 4) {
                $("#between").html($("<a>").addClass("btn btn-primary col mt-5").attr("id", "pLoss").html("All Foes</br>Defeated!</br>Restart?"));
            }
            else {
                $("#between").html($("<a>").addClass("btn btn-primary col mt-5").attr("id", "pWon").html("Victory!"));
            }
        }

        //if player died, open defeat button
        if (player.currentHp <= 0) {
            // $("#playerImage").attr("src", "./assets/images/" + player.name.toLowerCase() + "Defeat.jpg");
            $("#between").html($("<a>").addClass("btn btn-primary col mt-5").attr("id", "pLoss").html("Defeat!"));
            disableAbilities();
            $(".playerCard").append($("<div>").addClass("centered").text("Defeated"));

        }
    }

    //disable player abilities
    function disableAbilities() {
        player.arrAbilities.forEach(function (element) {
            $("#" + element).addClass("disabled");
        });
    }

    //enable player abilities
    function enableAbilities() {
        player.arrAbilities.forEach(function (element) {
            $("#" + element).removeClass("disabled");
        });
    }

    //player died, reset all buttons and empty out character areas
    function resetGameState() {
        $("#NPCs").empty();
        $("#PCs").empty();
        $("#characterCreation").removeClass("d-none");
        $("#enemyCreation").addClass("d-none");
        $("#pLoss").remove();
        $("#fight").remove();
        defeatedTypes.forEach(function (element) {
            $("#" + element).removeClass("d-none");
        });
        defeatedTypes.length = 0;
        rogueSong.pause();
        wizardSong.pause();
        fighterSong.pause();

    }

    //player won, remove defeated enemy from list of options
    function continueGameState() {
        player.atk += 2;
        $("NPCs").empty();
        $("#fight").remove();
        $("#enemyCreation").removeClass("d-none");
        defeatedTypes.forEach(function (element) {
            $("#" + element).addClass("d-none");
        });

    }

});

