<?php 
	function statusCheck() {
			
		global $combatants;
		
		$combatantNumbers = count($combatants);
		$i = 0;	
		
		while ($i < $combatantNumbers) {

			echo "<p>" . $combatants[$i]['name'] . "</p>";
			echo "<p>" . $combatants[$i]['status'] . "</p>";
			
			$i++;
			
		}
		
	}

	statusCheck();

?>