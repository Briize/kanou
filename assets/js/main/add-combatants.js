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

		var combatantHTML = "<div id='combatant_" + combatantCount + "' class='combatant'> <div class='remove_combatant'><span class='fa fa-times-circle'></span></div><div class='combatant_image'> <div class='combatant_image_container'></div><div class='combatant_image_input'> <input class='combatant_image_input_input' type='text' name='combatant_image_input_" + combatantCount + "' placeholder='Image URL'> <button class='combatant_image_input_button' type='button'><span class='fa fa-check'></span></button> </div></div><div class='combatant_data'> <div class='combatant_data_name'> <label for='combatant_data_name_" + combatantCount + "'>Name</label> <input type='text' name='combatant_data_name_" + combatantCount + "' id='combatant_data_name_" + combatantCount + "'> </div><div class='combatant_data_gender'> <label>Gender</label> <label for='gender_male_" + combatantCount + "'><span class='fa fa-mars'></span></label> <input type='radio' class='gender' id='gender_male_" + combatantCount + "' name='gender_" + combatantCount + "' value='male'> <label for='gender_female_" + combatantCount + "'><span class='fa fa-venus'></span></label> <input type='radio' class='gender' id='gender_female_" + combatantCount + "' name='gender_" + combatantCount + "' value='female'> <label for='gender_other_" + combatantCount + "'><span class='fa fa-intersex'></span></label> <input type='radio' class='gender' id='gender_other_" + combatantCount + "' name='gender_" + combatantCount + "' value='other'> </div><div class='combatant_data_stats'> <select> <option data-id='1'></option> <option data-id='2'></option> <option data-id='3'></option> <option data-id='4'></option> <option data-id='5'></option> <option data-id='6'></option> <option data-id='7'></option> <option data-id='8'></option> <option data-id='9'></option> <option data-id='10'></option> <option data-id='11'></option> <option data-id='12'></option> <option data-id='13'></option> <option data-id='14'></option> <option data-id='15'></option> </select> </div></div></div>";

		$("#additional_combatant").before(combatantHTML);
		
	}

    $("#additional_combatant-button").on( "click", function() {
	  	addNewCombatant();

	  	
	});

	$(".content").on( "click", ".remove_combatant", function() {

		$(this).parents(".combatant").remove();
		combatantCount--;

		$(".combatant").each(function( index ) {

			$(this).attr("id","combatant_" + index);

		});

	});

	$(".content").on( "click", ".combatant_image_input_button", function() {

		var combatant_image_url = $(this).parents(".combatant").find(".combatant_image_inputs_input").val(),
			combatant_image = $(this).parents(".combatant").find(".combatant_image_inputs_input").val()

		console.log(combatant_image);

	});

});