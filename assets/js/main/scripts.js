$(function() {

	var minPosition = 0, // Minimum position the combatants can be, both x and y axis, may change in future
  		MaxPosition = 190, // Maximum position the combatants can be, both x and y axis, may change in future
  		minMove = -10, // Combatants can move 10px in either direction
  		maxMove = 10, // Combatants can move 10px in either direction
  		encounterCheck = false, // Have combatants encountered each other?
  		totalMoves = 1, // How many moves have happened?
  		index; // Index for combatants

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

	moveChar();

  	// Contact script, for encounters
	function contact(contactChar, contactOthers) {

	    var $contactChar = $(contactChar),
	    	visionBonus = 0,
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
			alert("Hello! I am an alert box!!");

			$(contactList).each(function(contactListCounter, val) {
				$(val).attr("data-moved", "true");
			});

			encounter(contactList); 
		}

		else {
			moveChar();
		}
	};

	function encounter(contactList) {

		var encounterNumber = contactList.length,
			encounterChance = Math.floor((Math.random() * 100) + 1),
			fightChance = 50,
			ignoreChance = 25,
			pactChance = 25;
		
		if (encounterChance < fightChance) {
			// Combat
			combat(contactList, encounterNumber);

		}

		else if (encounterChance < fightChance + 1 && encounterChance < fightChance + ignoreChance ) {
			// Ignore
			ignore(contactList, encounterNumber);
		}

		else if (encounterChance < fightChance + ignoreChance + 1 && encounterChance < 100) {
			// Pact
			pact(contactList, encounterNumber);
		}

	}

	// Combat script
	function combat(combatantList, length) {

		console.log("COMBAT");

		moveChar();

	}

	// Ignore script
	function ignore(ignoreList, length) {

		console.log("IGNORE");

		moveChar();

	}

	// Pact script
	function pact(pactList, length) {

		console.log("PACT");

		moveChar();
	}

	/*setInterval(function(){ 
		if (encounterCheck == false) {
    		moveChar();
    		totalMoves++;
    		$(".moves").text(totalMoves);
		}
		else {
		}
	}, 1000);*/

});