<?php include 'assets/php/header.php'; ?>

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

						<div class="combatant_image_inputs">
							
							<input class="combatant_image_inputs_input" type="text" name="combatant_image_input" placeholder="Image URL">
							<button class="combatant_image_inputs_button" type="button">Update Image</button>

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

							<label>Strength</label>
							<div class="strength"></div>

							<label>Dexterity</label>
							<div class="dexterity"></div>

							<label>Constitution</label>
							<div class="constitution"></div>

							<label>Intelligence</label>
							<div class="intelligence"></div>

							<label>Wisdom</label>
							<div class="wisdom"></div>

							<label>Charisma</label>
							<div class="charisma"></div>
			
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

<?php include 'assets/php/footer.php'; ?>