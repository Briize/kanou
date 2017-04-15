$(function() {

	var minPosition = 0, // Minimum position the combatants can be, both x and y axis, may change in future
  		MaxPosition = 190, // Maximum position the combatants can be, both x and y axis, may change in future
  		minMove = -10, // Combatants can move 10px in either direction
  		maxMove = 10, // Combatants can move 10px in either direction
  		encounterCheck = false, // Have combatants encounterChecked eachother?
  		totalMoves = 0, // How many moves have happened?
  		index; // Index for combatants

  	//combatants.push({"name":"Player 5","gender":"male","image":"","status":"Alive","strength":20,"dexterity":20,"constitution":20,"intelligence":20,"wisdom":20,"charisma":20,"longitude":0,"latitude":0,"health":100,"hunger":100,"thirst":100,"energy":100,"sanity":100,"injuries":[""],"weapons":[""],"relationships":[""],"odds":1.0});

  	function getCombatants() {
		
		var combatantNumbers = combatants.length;
		combatantCounter = 0;	
		
		
		while (combatantCounter < combatantNumbers) {

			$("#container").append("<div class='char' id='char" + combatantCounter + "' style='top: " +  Math.floor(Math.random()*(190-0+1)+0) + "px; left: " +  Math.floor(Math.random()*(190-0+1)+0) + "px; background-color: red;' data-index='" + combatantCounter + "' data-name='" + combatants[combatantCounter]["name"] + "' data-status='" + combatants[combatantCounter]["status"] + "' data-moved='false'></div>");
			
			combatantCounter++;
			
		}
		
	}

	getCombatants();

	function moveChar() {

		$( ".char[data-status='alive'").each(function( index, element ) {

		  	var top = $(element).position().top,
		  		left = $(element).position().left,
		  		positionChangeTop = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
				positionChangeLeft = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove;
		  	
		  	if (top + positionChangeTop >= minPosition && top + positionChangeTop <= MaxPosition) {
	  			$(element).css("top", top + positionChangeTop);
		  	}
		  	if (left + positionChangeLeft >= minPosition && left + positionChangeLeft <= MaxPosition) {
	  			$(element).css("left", left + positionChangeLeft);
	  		}

		  	// Check for contact

		  	if ($(element).attr("data-moved") == "false") {

			  	contact("#char" + index, ".char:not(#char" + index + ", [data-moved=true])"); // Check this char against all the others
			  	
			}

		});

	};

  	// Contact script, for encounters
	function contact(contactChar, contactOthers) {

	    var $contactChar = $(contactChar),
	    	visionBonus = 10,
	    	contactCharAxis = $contactChar.offset(),
	    	contactChar_x = [contactCharAxis.left - visionBonus, contactCharAxis.left + $contactChar.outerWidth() + visionBonus], // Get x axis
	    	contactChar_y = [contactCharAxis.top - visionBonus, contactCharAxis.top + $contactChar.outerHeight() + visionBonus], // Get y axis
	    	contactList = []; // List of contacts

	    $(contactOthers).each(function() {
			var $contactOthers = $(this),
				contactOthersAxis = $contactOthers.offset(),
				contactOthers_x = [contactOthersAxis.left - visionBonus, contactOthersAxis.left + $contactOthers.outerWidth() + visionBonus], // Get x axis
				contactOthers_y = [contactOthersAxis.top - visionBonus, contactOthersAxis.top + $contactOthers.outerHeight() + visionBonus]; // Get y axis

			if ( contactChar_x[0] < contactOthers_x[1] && contactChar_x[1] > contactOthers_x[0] && contactChar_y[0] < contactOthers_y[1] && contactChar_y[1] > contactOthers_y[0]) {
				// Run combat script
				var newContact = "#" + $(this).attr('id');
				contactList.push(newContact);
			}

	    });

	    if (contactList.length) {

	    	contactList.push(contactChar);
			encounterCheck = true; // Encounter is now true

			console.log("STOP");

			$(contactList).each(function(contactListCounter, val) {
				$(val).attr("data-moved", "true");
			});

			encounter(contactList); 
		}
	};

	function encounter(contactList) {

		console.log(contactList.length);

		var encounterNumber = contactList.length,
			encounterChance = Math.floor((Math.random() * 100) + 1);
		
		if (encounterChance < 25) {
			// Fight
		}

		else if (encounterChance < 26 && encounterChance < 50) {
			// Ignore
		}

		else if (encounterChance < 51 && encounterChance < 75) {
			// Pact
		}

		else {
			// Other
		}


	}

	// Combat script
	function combat(combatantList) {
		
		function combatSuccess() {

			var combatant1Index = $(combatant1).attr("data-index"),
			 	combatant2Index = $(combatant2).attr("data-index");

		}
	}

	setInterval(function(){ 
		if (!encounterCheck) {
    		moveChar();
    		totalMoves++;
    		$(".moves").text(totalMoves);
		}
	}, 500);

});