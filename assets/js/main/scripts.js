$(function() {

	var minPosition = 0, // Minimum position the combatants can be, both x and y axis, may change in future
  		MaxPosition = 390, // Maximum position the combatants can be, both x and y axis, may change in future
  		minMove = 0, // Combatants can move 10px in either direction
  		maxMove = 5, // Combatants can move 10px in either direction
  		encounterCheck = false, // Have combatants encountered each other?
  		totalMoves = 1, // How many moves have happened?
  		index; // Index for combatants

  	// Adds all combatants to the field
  	function getCombatants() {
		
		var combatantNumbers = combatants.length;
			combatantCounter = 0;
		
		while (combatantCounter < combatantNumbers) {

			var randomTop = /*Math.floor(Math.random()*(390-0+1)+0)*/1,
				randomLeft = /*Math.floor(Math.random()*(390-0+1)+0)*/1;

			$("#container").append("<div class='char' id='char" + combatantCounter + "' style='top: " +  randomTop + "px; left: " +  randomLeft + "px; background-color: red;' data-index='" + combatantCounter + "' data-name='" + combatants[combatantCounter]["name"] + "' data-status='" + combatants[combatantCounter]["status"] + "' data-moved='false' data-target-moving='false' data-target-top='0' data-target-left='0'></div>");
			
			combatantCounter++;
			
		}
		
	}

	getCombatants();

	function moveChar() {

		$( ".char[data-status='alive']").each(function( index, element ) {

		  	// Check for contact

			contact("#char" + index, ".char:not(#char" + index + ", [data-moved=true], [data-moved=dead])"); // Check this char against all the others

		});

		if (encounterCheck == false) {
			$( ".char[data-status='alive']").each(function( index, element ) {

			  	var top = $(element).position().top,
			  		left = $(element).position().left,
			  		positionChangeTop = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
					positionChangeLeft = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
					targetTop = parseInt($(element).attr("data-target-top")),
					targetLeft = parseInt($(element).attr("data-target-left"));

				if ($(element).data("target-moving") == true) {

					if (targetTop == top && targetLeft == left) {
						$(element).data("target-moving", false);

						console.log("At point");
					}

					else {

						if (targetTop > top) {

							if (targetTop - 5 > top) {

								$(element).css("top", top + positionChangeTop);

								console.log("targetTop - 5 > top");

							}

							else {

								$(element).css("top", targetTop + "px");

								console.log("targetTop > else");

							}

						}

						else if (targetTop < top) {

							if (targetTop + 5 < top) {

								$(element).css("top", top - positionChangeTop);

								console.log("targetTop + 5 < top");

								console.log(targetTop);

							}

							else {

								$(element).css("top", targetTop + "px");

								console.log("targetTop < else");

							}

						}

						else {

						}

						if (targetLeft > left) {

							if (targetLeft - 5 > left ) {

								$(element).css("left", left + positionChangeLeft);

							}

							else {

								$(element).css("left", targetLeft + "px");

							}

						}

						else if (targetLeft < left) {

							if (targetLeft + 5 < left ) {

								$(element).css("left", left - positionChangeLeft);

							}

							else {

								$(element).css("left", targetLeft + "px");

							}

						}

						else {
							
						}

						console.log("Moving");
						
					}

				}

				else if ($(element).data("target-moving") == false) {

					var positionNewTop = Math.floor(Math.random() * (MaxPosition - minMove + 1)) + minMove, 
						positionNewLeft = Math.floor(Math.random() * (MaxPosition - minMove + 1)) + minMove;

					console.log(positionNewTop);
					console.log(positionNewLeft);

					$(element).attr("data-target-top", positionNewTop);
					$(element).attr("data-target-left", positionNewLeft);

					$(element).data("target-moving", true);

					console.log("moving again");

				}
			  	
			  	/*if (top + positionChangeTop >= minPosition && top + positionChangeTop <= MaxPosition) {
		  			$(element).css("top", top + positionChangeTop);
			  	}
			  	if (left + positionChangeLeft >= minPosition && left + positionChangeLeft <= MaxPosition) {
		  			$(element).css("left", left + positionChangeLeft);
		  		}*/

			});

		}

	};

  	// Contact script, for encounters
	function contact(contactChar, contactOthers) {

	    var $contactChar = $(contactChar),
	    	visionBonus = 6,
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
			combatChance = 100,
			ignoreChance = 25,
			pactChance = 25;

		if (encounterChance < combatChance) {
			// Combat
			combat(contactList);
		}

		else if (encounterChance < combatChance + 1 && encounterChance < combatChance + ignoreChance ) {
			// Ignore
			ignore(contactList, encounterNumber);
		}

		else if (encounterChance < combatChance + ignoreChance + 1 && encounterChance < 100) {
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

		//var combatantOrder = [];

		$(combatantList).each(function(combatantListArrayIndex, combatantListArrayElement) {

			var combatantOrderID = combatantList[combatantListArrayIndex]['id'],
				combatantOrderCalc  = combatantList[combatantListArrayIndex]['dexterity'] * combatantList[combatantListArrayIndex]['energy'] * (Math.random() * (0.5 - 1.5) + 1.5).toFixed(1);

			combatantList[combatantListArrayIndex] = {"data": combatantListArrayElement,"turn": combatantOrderCalc};

		});

		combatantList.sort(function(a, b) { 
		    return parseFloat(b.turn - a.turn); 
		});

		console.log(combatantList);
		
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

		//combatPopup(combatantList,combatantOrder);

		combatPopup(combatantList);

	}

	function combatPopup(popupList) {

		$("#popup").removeClass("hidden");

		console.log(popupList.length);

		var numberOfCombatants = popupList.length,
			combatantTurn = 0;

		$(".next").on( "click", function() {

			//$(popupList[combatantTurn]).each(function(popupListArrayIndex, popupListArrayElement) {

				if (combatantTurn <= numberOfCombatants) {

					var combatOption = Math.floor((Math.random() * 100) + 1),
						attackChance = 100,
						escapeChance = 25,
						surrenderChance = 25,
						truceChance =  25;

					if (combatOption < attackChance) {
						// Attack

						console.log("attack");
						
						var encounterData = combatPopupAttack(popupList, combatantTurn, popupList[combatantTurn]),
							attacker = encounterData[0]["data"],
							weapon = encounterData[1],
							recipient = encounterData[2]["data"];

						$(".popup_events").append("<p>" + attacker["name"] + " attacks " + recipient["name"] + " with a " + weapon["weapon"] + "</p>");

					}

					else if (combatOption < attackChance + 1 && combatOption < attackChance + escapeChance ) {
						// Escape
						combatPopupEscape(popupList, popupListArrayIndex, popupListArrayElement);
						console.log("escape");
					}

					else if (combatOption < attackChance + escapeChance + 1 && combatOption < 100) {
						// Surrender
						combatPopupSurrender(popupList, popupListArrayIndex, popupListArrayElement);
						console.log("surrender");
					}

					else if (combatOption < attackChance + escapeChance + surrenderChance + 1 && combatOption < 100) {
						// Truce
						combatPopupTruce(popupList, popupListArrayIndex, popupListArrayElement);
						console.log("truce");
					}

					/*$(".popup_content").append("<p>" + popupList[popupCounter]['name'] + " " + popupList[popupCounter]['health'] + "</p>");*/

					//console.log(popupOrder[popupOrderArrayIndex]['id']);
					//console.log(popupOrder[popupOrderArrayIndex]['turn']);

					combatantTurn++;

				}

			});

		//});

		/*$(".next").on( "click", function() {
		  	for (popupCounter = 0; popupCounter < popupList.length; popupCounter++) { 
			    $(".popup_content").append("<p>" + popupList[popupCounter]['name'] + " " + popupList[popupCounter]['health'] + "</p>");
			}
		});*/

	}

	function combatPopupAttack(combatPopupList, combatPopupListIndex, combatPopupListCombatant) {

		var targets = [],
			initiator,
			weaponArray = [];

		$(combatPopupList).each(function(combatPopupListArrayTargetIndex, combatPopupListArrayTargetElement) {

			if (combatPopupListArrayTargetIndex != combatPopupListIndex) {
				// Attack
				targets.push(combatPopupListArrayTargetElement);
			}

			else {
 				initiator = combatPopupListArrayTargetElement;
			}

		});

		//console.log(combatPopupListCombatant);

		var targetRandomiser = parseInt((Math.random() * (targets.length - 1 + 1)), 10) + 1,
			target = targets[targetRandomiser - 1];

		//console.log(targetRandomiser);
		//console.log(target.data.name);

		combatPopupListCombatant["data"]["weapons"].sort(function (a, b) {
			return parseFloat(b.priority) - parseFloat(a.priority);
		});

		$(combatPopupListCombatant["data"]["weapons"]).each(function(combatPopupListCombatantIndex, combatPopupListCombatantElement) {

			if (weaponArray.length === 0) {
					
				weaponArray.push(combatPopupListCombatantElement);

			}
			
			else {

				if (weaponArray[weaponArray.length - 1].priority == combatPopupListCombatantElement.priority) {
					weaponArray.push(combatPopupListCombatantElement);

				}

			}

		});

		var initiatorWeapon = weaponArray[Math.floor(Math.random()*weaponArray.length)],
			weapon = initiatorWeapon.weapon,
			damage = initiatorWeapon.damage,
			modifier = initiatorWeapon.modifier,
			modifierVal = combatPopupListCombatant["data"][modifier],
			damageTotal = damage + modifierVal;


		var targetHealth = target.data.health - damageTotal;

		target.data.health = targetHealth;

		return [initiator, initiatorWeapon, target];

	}

	function combatPopupEscape(combatPopupList, combatPopupListIndex, combatPopupListCombatant) {
		
	}

	function combatPopupSurrender(combatPopupList, combatPopupListIndex, combatPopupListCombatant) {
		
	}

	function combatPopupTruce(combatPopupList, combatPopupListIndex, combatPopupListCombatant) {
		
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