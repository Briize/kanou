$(function() {

	//console.log(combatants2);

	//console.log(combatants2.batter2[0].charisma);

	var minPosition = 0, // Minimum position the combatants can be, both x and y axis, may change in future
  		MaxPosition = 190, // Maximum position the combatants can be, both x and y axis, may change in future
  		minMove = -10, // Combatants can move 10px in either direction
  		maxMove = 10, // Combatants can move 10px in either direction
  		encounterCheck = false, // Have combatants encountered each other?
  		totalMoves = 1, // How many moves have happened?
  		index; // Index for combatants

  	// Adds all combatants to the field
  	function getCombatants() {
		
		var combatantNumbers = combatants.length;
		combatantCounter = 0;	
		
		
		while (combatantCounter < combatantNumbers) {

			$("#container").append("<div class='char' id='char" + combatantCounter + "' style='top: " +  Math.floor(Math.random()*(190-0+1)+0) + "px; left: " +  Math.floor(Math.random()*(190-0+1)+0) + "px; background-color: red;' data-index='" + combatantCounter + "' data-name='" + combatants[combatantCounter]["name"] + "' data-status='" + combatants[combatantCounter]["status"] + "' data-moved='false'></div>");
			
			combatantCounter++;
			
		}
		
	}

	getCombatants();

	function moveChar(callback) {

		$( ".char[data-status='alive'").each(function( index, element ) {

		  	// Check for contact

			  	contact("#char" + index, ".char:not(#char" + index + ", [data-moved=true], [data-moved=dead])"); // Check this char against all the others

		});

		if (encounterCheck == false) {
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

			});
		}

	};

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

			$(contactList).each(function(contactListCounter, val) {
				$(val).attr("data-moved", "true");
			});

			var encounterListDetailsArray = [];

			$(contactList).each(function (contactListIndex){

				var contactID = contactList[contactListIndex],
					contactData = combatants[$(contactID).attr("data-index")];
					
				encounterListDetailsArray.push(contactData);

			});

			encounter(encounterListDetailsArray); 
		}
	};

	function encounter(contactList) {

		var encounterNumber = contactList.length,
			encounterChance = Math.floor((Math.random() * 100) + 1),
			fightChance = 100,
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
	function combat(combatantList) {

		/*var combatCounter = 0,
			combatantListDetailsArray = [];

		// Get array of all combatant details
		$(combatantList).each(function (){

			var combatantID = combatantList[combatCounter],
				combatantData = combatants[$(combatantID).attr("data-index")];

			combatantListDetailsArray.push(combatantData);

			//console.log(combatantListDetailsArray.combatantID[0].name);

			combatCounter++;

		});*/

		// First hit calculation

		var combatantOrder = [];

		$(combatantList).each(function(combatantListArrayIndex, combatantListArrayElement) {

			var combatantOrderID = combatantList[combatantListArrayIndex]['id'],
				combatantOrderCalc  = combatantList[combatantListArrayIndex]['dexterity'] * combatantList[combatantListArrayIndex]['energy'] * (Math.random() * (0.5 - 1.5) + 1.5).toFixed(1);

			combatantOrder.push({id: combatantOrderID, speed: combatantOrderCalc});

		});

		combatantOrder.sort(function(a, b) { 
		    return (a.speed - b.speed); 
		});

		console.log(combatantOrder[0]['id']);

		combatPopup(combatantList,combatantOrder)

		/*if (combatantListDetailsArray.length === 2) {

			var combatantOneFirstHit  = combatantListDetailsArray[0]['dexterity'] * combatantListDetailsArray[0]['energy'],
				combatantTwoFirstHit  = combatantListDetailsArray[1]['dexterity'] * combatantListDetailsArray[1]['energy']

			

			if (combatantOneFirstHit > combatantTwoFirstHit) {
				combatantListDetailsArray[1]['status'] = 'dead';
				$(combatantList[1]).attr("data-status", "dead");
			}

			else if (combatantOneFirstHit < combatantTwoFirstHit) {
				combatantListDetailsArray[0]['status'] = 'dead';
				$(combatantList[0]).attr("data-status", "dead");
			}

			else {
				console.log("CROSS COUNTER");
			}
		}

		else {

		}*/

		//combatPopup(combatantListDetailsArray);

	}

	function combatPopup(popupList, popupOrder) {

		$("#popup").removeClass("hidden");

		$(".next").on( "click", function() {
		  	for (popupCounter = 0; popupCounter < popupList.length; popupCounter++) { 
			    $(".popup_content").append("<p>" + popupList[popupCounter]['name'] + "</p>");
			}
		});

	}

	// Ignore script
	function ignore(ignoreList) {

		console.log("IGNORE");

	}

	// Pact script
	function pact(pactList) {

		console.log("PACT");
	}

	setInterval(function(){ 
		if (encounterCheck == false) {
			moveChar();
    		totalMoves++;
    		$(".moves").text(totalMoves);
		}
		else {
		}
	}, 1000);

});