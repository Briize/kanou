$( function() {

    /*$( "#strength" ).slider();
    $( "#dexterity" ).slider();
    $( "#constitution" ).slider();
    $( "#intelligence" ).slider();
    $( "#wisdom" ).slider();
    $( "#charisma" ).slider();*/

    combatantCount = 0;

    function addNewCombatant() {
		
		combatantCount++;

		var combatantHTML = "<div id='combatant_" + combatantCount + "' class='combatant'><div class='remove_combatant'><span class='fa fa-times-circle'></span></div><div class='combatant_image'><div class='combatant_image_container'></div><div class='combatant_image_inputs'><input class='combatant_image_inputs_input' type='text' name='combatant_image_input_" + combatantCount + "' placeholder='Image URL'><button class='combatant_image_inputs_button' type='button'>Update Image</button></div></div><div class='combatant_data'><div class='combatant_data_name'><label for='combatant_data_name_" + combatantCount + "'>Name</label><input type='text' name='combatant_data_name_" + combatantCount + "' id='combatant_data_name_" + combatantCount + "'></div><div class='combatant_data_gender'><label>Gender</label><label for='gender_male_" + combatantCount + "'><span class='fa fa-mars'></span></label><input type='radio' class='gender' id='gender_male_" + combatantCount + "' name='gender_" + combatantCount + "' value='male'><label for='gender_female_" + combatantCount + "'><span class='fa fa-venus'></span></label> <input type='radio' class='gender' id='gender_female_" + combatantCount + "' name='gender_" + combatantCount + "' value='female'> <label for='gender_other_" + combatantCount + "'><span class='fa fa-intersex'></span></label> <input type='radio' class='gender' id='gender_other_" + combatantCount + "' name='gender_" + combatantCount + "' value='other'></div><div class='combatant_data_stats'><label for='combatant_data_stats_strength_" + combatantCount + "'>Strength</label><div id='strength'></div><label for='combatant_data_stats_dexterity_" + combatantCount + "'>Dexterity</label><div id='dexterity'></div><label for='combatant_data_stats_constitution_" + combatantCount + "'>Constitution</label><div id='constitution'></div><label for='combatant_data_stats_intelligence_" + combatantCount + "'>Intelligence</label><div id='intelligence'></div><label for='combatant_data_stats_wisdom_" + combatantCount + "'>Wisdom</label><div id='wisdom'></div><label for='combatant_data_stats_charisma_" + combatantCount + "'>Charisma</label><div id='charisma'></div></div></div></div>";

		$("#additional_combatant").before(combatantHTML);
		
	}

    $("#additional_combatant-button").on( "click", function() {
	  	addNewCombatant();

	  	
	});

	$(".content").on( "click", ".remove_combatant", function() {

		console.log(this + "test");
		$(this).parents(".combatant").remove();
		combatantCount--;

		$(".combatant").each(function( index ) {

			$(this).attr("id","combatant_" + index);

		});

	});

});