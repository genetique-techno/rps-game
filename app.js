// Angular Modules

// entire app is inside a closure; good practice
(function() { 
	var app = angular.module('rps-game', []);

	// initializes everything
	app.controller('GameController', function () {
		this.totalplays = 0;
		this.won = false;
		this.you = {
			name: 'You',
			wins: 0,
			move: ''
		};
		this.opponent = {
			name: 'Opponent',
			wins: 0,
			move: ''
		};
		this.viewStage = 'start-page';

		// progresses to move selection
		this.startGame = function () {
			this.callView('move-page');
		}

		// You locked in your move, now play
		this.playAction = function (currentMove) {
			this.displayTie = false;
			this.you.move = currentMove;

			// some game logic here
			//gets opponent move from SOMEWHERE
			//for now let's randomize it
			var moves = ['rock', 'paper', 'scissors'];
			var rnd = Math.floor(Math.random() * 2 + 1);
			this.opponent.move = moves[rnd];
			console.log('You:      ' + this.you.move);
			console.log('Opponent: ' + this.opponent.move);


			switch (this.opponent.move) {
				case this.you.move:
					this.displayTie = true;
					this.won = 'tie';
					this.callView('play-page');
					return;
				case 'rock':
					if (this.you.move === 'paper') { this.won = true; this.you.wins += 1;};
					if (this.you.move === 'scissors') { this.won = false; this.opponent.wins += 1;};
					break;
				case 'paper':
					if (this.you.move === 'scissors') { this.won = true; this.you.wins += 1;};
					if (this.you.move === 'rock') {this.won = false; this.opponent.wins += 1;};
					break;
				case 'scissors':
					if (this.you.move === 'rock') {this.won = true; this.you.wins += 1;};
					if (this.you.move === 'paper') {this.won = false; this.opponent.wins += 1;};
					break;
			}
			this.callView('play-page');


		}

		// Ends this match and resets everything
		this.quitMatch = function () {
			this.callView('start-page');
			this.totalplays = 0;
			this.opponent.wins = 0;
			this.you.wins = 0;
			console.log('RESET - quitMatch invoked')
		}

		// Starts another play to add to the match
		this.playAgain = function () {
			this.callView('move-page');
		}
		
		// Changes the current view property
		this.callView = function (view) {
			this.viewStage = view;
		}

		// Checks if this is the current section to view, returns true if it is
		this.isViewStage = function (view) {
			return this.viewStage === view;
		}

	})




})();