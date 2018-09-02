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
                var abilityButton = $("<div>").addClass("row justify-content-center").html($("<a>").addClass("btn btn-primary col m-1 disabled").attr("id", element).html(element));
                abilityButtons.append(abilityButton);

            });
            var hpBar = $("<div>").addClass("progress").html($("<div>").addClass("progress-bar bg-danger").attr({ "id": "hpBarPlayer", "style": "width:100%", "role": "progressbar", "aria-valuenow": "100", "aria-valuemin": "0", "aria-valuemax": "100" }));
            var playerCardBody = $("<div>").addClass("card-body col").html($("<h5>").addClass("card-title text-center player").attr("id", name));
            playerCardBody.append(abilityButtons);
            var playerCardHeading = $("<div>").addClass("card col").html($("<img>").addClass("card-img-top").attr({ "id": "playerImage", "src": imgRoute }));
            playerCardHeading.append(hpBar, playerCardBody);
            $("#PCs").append(playerCardHeading);
            $("#" + name).html(name);
        }
        this.updateHP = function (damage) {
            this.currentHp = this.currentHp - damage;

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
            var playerCardHeading = $("<div>").addClass("card col").html($("<img>").addClass("card-img-top").attr({ "id": "enemyImage", "src": imgRoute }));
            playerCardHeading.append(hpBar, playerCardBody);
            $("#NPCs").append(playerCardHeading);
            $("#" + name).html(name);
        }
        this.updateHP = function (damage) {
            this.currentHp = this.currentHp - damage;

            var percentage = (this.currentHp / maxHp * 100);
            $("#hpBarEnemy").attr("style", "width: " + percentage + "%");
        }
    }

    var player;
    var enemy;

    $("body").on("click", "#rogueAdd", function () {
        $("#PCs").empty();
        player = new Player("Rogue", 10, 5, 2, "./assets/images/rogue.jpg", ["Attack", "Critical"]);
        player.playerCard();
        $("#characterCreation").addClass("d-none");
        $("#enemyCreation").removeClass("d-none");
    });
    $("body").on("click", "#wizAdd", function () {
        $("#PCs").empty();
        player = new Player("Wizard", 5, 10, 2, "http://via.placeholder.com/413x370", ["Attack", "fireball"]);
        player.playerCard();
        $("#characterCreation").addClass("d-none");
        $("#enemyCreation").removeClass("d-none");

    });
    $("body").on("click", "#fighterAdd", function () {
        $("#PCs").empty();
        player = new Player("Fighter", 15, 2, 5, "http://via.placeholder.com/413x370", ["Attack", "smite"]);
        player.playerCard();
        $("#characterCreation").addClass("d-none");
        $("#enemyCreation").removeClass("d-none");
    });
    $("body").on("click", "#demon", function () {
        $("#NPCs").empty();
        enemy = new Enemy("Demon", 50, 2, 2, "./assets/images/demon.png");
        enemy.enemyCard();

        $("#enemyCreation").addClass("d-none");
        player.arrAbilities.forEach(function (element) {
            $("#" + element).removeClass("disabled");
        });
        // $("#allCreation").html($("<h3>").html("FIGHT!!"));
    });
    $("body").on("click", "#abomination", function () {
        $("#NPCs").empty();
        enemy = new Enemy("Abomination", 30, 5, 10, "http://via.placeholder.com/413x370");
        enemy.enemyCard();
        $("#enemyCreation").addClass("d-none");
        player.arrAbilities.forEach(function (element) {
            $("#" + element).removeClass("disabled");
        });
        // $("#allCreation").html($("<h3>").html("FIGHT!!"));
    });
    $("#PCs").on("click", "#Attack", function (e) {
        enemy.updateHP(player.atk);
        player.updateHP(enemy.atk);
        checkEnd();
    });
    $("#PCs").on("click", "#Critical", function (e) {
        enemy.updateHP(player.atk*7);
        player.updateHP(enemy.atk);
        $("#Critical").addClass("disabled");
        checkEnd();
    });
    $("body").on("click", "#pLoss", function (e) {
        resetGameState();
    });

    function checkEnd() {
        console.log(enemy.currentHp);
        if (enemy.currentHp <= 0) {
            $("#enemyImage").attr("src", "./assets/images/" + enemy.name.toLowerCase() + "Defeat.jpg");
        }
        if (player.currentHp <= 0) {
            $("#playerImage").attr("src", "./assets/images/" + player.name.toLowerCase() + "Defeat.jpg");
            $("#between").html($("<a>").addClass("btn btn-primary col mt-5").attr("id", "pLoss").html("Defeat!"));
            player.arrAbilities.forEach(function (element) {
                $("#" + element).addClass("disabled");
            });
        }
    }

    function resetGameState() {
        $("#NPCs").empty();
        $("#PCs").empty();
        $("#characterCreation").removeClass("d-none");
        $("#enemyCreation").addClass("d-none");
        $("#pLoss").remove();
    }



});

