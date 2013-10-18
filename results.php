<?php 
	$log = "log.txt";
	$data = file_get_contents($log);
	$results = json_decode($data);
	
	// Get top 20 results based on weighted score
	
	
?>

<h1>Algorithm Results</h1>
<table>
	<thead>
		<th class="one-of">% Got One of Their Choices</th>
		<th class="got-1st">% Got 1st Choice</th>
		<th class="got-peers">% in Class with a Peer</th>
		<th class="not-1st">Students Who didn't get their 1st</th>
	</thead>
	<tbody>
		<tr class="template off">
			
		</tr>
	</tbody>
</table>

	</div>
	<button id="students-ok">All the Student Data is OK!</button>
</section>