<?php include "assets/php/header.php"; ?>

<main class="main" id="add_combatants">

	<section id="add_combatants-section">

		<div class="container">

			<div class="content">
		
				<div id="combatant_0" class="combatant">

					<div class="remove_combatant">
						<span class="fa fa-times-circle"></span>
					</div>
					
					<div class="combatant_image">
						
						<div class="combatant_image_container">
							
							<!--img src="http://i.imgur.com/N8V2ahs.jpg"-->

						</div>

						<div class="combatant_image_input">
							
							<input class="combatant_image_input_input" type="text" name="combatant_image_input" placeholder="Image URL">
							<button class="combatant_image_input_button" type="button"><span class="fa fa-check"></span></button>

						</div>						


					</div>

					<div class="combatant_data">
						
						<div class="combatant_data_name">

							<label>Name</label>
							<input type="text" name="combatant_data_name">
			
						</div>

						<div class="combatant_data_gender">

							<label>Gender</label>
							<label><span class="fa fa-mars"></span></label>
							<input type="radio" class="gender" name="gender" value="male">
							<label><span class="fa fa-venus"></span></label>
  							<input type="radio" class="gender" name="gender" value="female">
  							<label><span class="fa fa-intersex"></span></label>
  							<input type="radio" class="gender" name="gender" value="other">
			
						</div>

						<div class="combatant_data_stats">
				            <select>
				                <option data-id="1"></option>
				                <option data-id="2"></option>
				                <option data-id="3"></option>
				                <option data-id="4"></option>
				                <option data-id="5"></option>
				                <option data-id="6"></option>
				                <option data-id="7"></option>
				                <option data-id="8"></option>
				                <option data-id="9"></option>
				                <option data-id="10"></option>
				                <option data-id="11"></option>
				                <option data-id="12"></option>
				                <option data-id="13"></option>
				                <option data-id="14"></option>
				                <option data-id="15"></option>
				            </select>
				        </div>


					</div>

				</div>

				<div id="additional_combatant">
					<span class="fa fa-plus-circle" id="additional_combatant-button"></span>
				</div>

			</div>

		</div>

	</section>
	
</main>

<?php include "assets/php/footer.php"; ?>