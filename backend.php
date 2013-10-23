<!DOCTYPE html>
<html>
<head>
	<title>Algorithm Central</title>
	<meta name="generator" content="TextMate http://macromates.com/">
	<meta name="author" content="Joseph Moore">
	<meta charset="utf-8">
	<!-- Date: 2013-03-02 -->
	<link rel="stylesheet" href="styles.css" type="text/css" media="all" />
	<link href='http://fonts.googleapis.com/css?family=VT323' rel='stylesheet' type='text/css'>
	<!-- Mobile viewport optimized: h5bp.com/viewport -->
  	<meta name="viewport" content="width=device-width">
	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lte IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

<div id="wrapper">
	<h1>Algorithm Control Panel</h1>
	<div class="status">
		<ol>
			<li>
				<ul>
					<li class="incomplete">Student Data</li>
					<li class="incomplete">Teacher Data</li>
				</ul>
			</li>
			<li class="incomplete">
				Run the Algorithm
			</li>
		</ol>
	</div>
	<section class="students">
		<button id="import-students">Import Student Data CSV</button>
		<div class="off">
			<h2>Students</h2>
			<table>
			<thead>
				<th class="n-number">N-Number</th>
				<th class="name">Name</th>
				<th class="choice-1">Choice 1</th>
				<th class="choice-2">Choice 2</th>
				<th class="choice-3">Choice 3</th>
				<th class="peers">Peers</th>
				<th class="professor-preferred">Professor Preferred</th>
				<th class="current-thesis">Current Thesis</th>
				<th class="new-thesis">New Thesis</th>
			</thead>
			<tbody>
				<tr class="template off">
					<td class="n-number no-edit"></td>
					<td class="name" contenteditable="true"></td>
					<td class="choice-1" contenteditable="true"></td>
					<td class="choice-2" contenteditable="true"></td>
					<td class="choice-3" contenteditable="true"></td>
					<td class="peers" contenteditable="true"></td>
					<td class="professor-preferred" contenteditable="true"></td>
					<td class="current-thesis" contenteditable="true"></td>
					<td class="new-thesis" contenteditable="true"></td>
				</tr>
			</tbody>
			</table>
		</div>
		<button id="students-ok">All the Student Data is OK!</button>
	</section>
	<section class="teachers">
		<h2>Teachers</h2>
		<button id="import-teachers">Import Teacher Data CSV</button>
		<ul>
			<li class="template off">
				<span class="name" contenteditable="true"></span>
				<p class="choices" contenteditable="true"></p>
			</li>
		</ul>
		<button id="teachers-ok">All the Teacher Data is OK!</button>
	</section>
	
	<section class="run off">
		<form action="">
			<h2>Run <input id="times" type="number" value="100" /> Times</h2>
			<input type="submit" value="Run the Algorithm" />
		</form>
		<div class="attributes">
			<div class="number-sections">
				<span class="label">Number of Sections</span>
				<span class="number"></span>
			</div>
			<div class="number-students">
				<span class="label">Number of Students</span>
				<span class="number"></span>
			</div>
			<div class="cap">
				<span class="label">Lowest possible cap</span>
				<span class="number"></span>
			</div>
		</div>
	</section>
</div>



	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
  	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
       <script>
	jQuery(document).ready(function($){
		var students, teachers;
		var students_done = false;
		var teachers_done = false;
		$('form').submit(function(){
			// send teacher and student data to overwrite JSON files
			// run algorithm
			var times = $('#times').val();
			runAlgorithm(times);
			return false;
		});
		function runAlgorithm(times){
			for(i=0;i<times;i++){
				window.open("index.php", "_blank", "width=100,height=100");
			}
		}
		
		$('#import-students').click(function(){
			$.ajax({
				url: "convert.php?file=students.csv",
				success: function(data){
					students = JSON.parse(data);
					students = students.students;
					var temp = $('.students .template');
					for(N in students){
						var clone = temp.clone();
						clone.find('.n-number').html(N);
						clone.find('.name').html(students[N].name);
						clone.find('.choice-1').html(students[N].choices[0]);
						clone.find('.choice-2').html(students[N].choices[1]);
						clone.find('.choice-3').html(students[N].choices[2]);
						clone.find('.peers').html(students[N].peers);
						clone.find('.current-thesis').html(students[N].current);
						clone.removeClass('template off');
						temp.before(clone);
					}
					$('.students div').removeClass('off');
					
					$('#students-ok').click(function(){
						$('td').removeAttr('contenteditable').addClass('no-edit');
						$('.students tr').each(function(i){
							if(!$(this).hasClass('template') && $(this).find('.n-number').html() != 'N-Number'){
								var N = $(this).find('.n-number').html();
								var name = $(this).find('.name').html();
								var c1 = $(this).find('.choice-1').html();
								var c2 = $(this).find('.choice-2').html();
								var c3 = $(this).find('.choice-3').html();
								var peers = $(this).find('.peers').html();
								var current = $(this).find('.current-thesis').html();
								console.log(N);
								students[N].name = name;
								students[N].choices[0] = c1;
								students[N].choices[1] = c2;
								students[N].choices[2] = c3;
								students[N].peers = peers;
								students[N].current = current;
							}
						});
						students_done = true;
						if(checkForRun()){
							$('.run').removeClass('off');
						}
					});
				}
			});			
		});
		
		$('#import-teachers').click(function(){
			$.ajax({
				url: "convert.php?file=teachers.csv",
				success: function(data){
					console.log(data);
					teachers = JSON.parse(data);
					teachers = teachers.teachers;
					var temp = $('.teachers .template');
					for(i=0; i<teachers.length; i++){
						var clone = temp.clone();
						clone.find('.name').html(teachers[i].name);
						clone.find('.choices').html(teachers[i].choices);
						clone.removeClass('template off');
						temp.before(clone);
					}
					
					
					$('#teachers-ok').click(function(){
						$('.teachers span').removeAttr('contenteditable').addClass('no-edit');
						$('.teachers p').removeAttr('contenteditable').addClass('no-edit');

						$('.teachers li').each(function(i){
							if(!$(this).hasClass('template')){
								var name = $(this).find('.name').html();
								var choices = $(this).find('.choices').html();
								teachers[i].name = name;
								teachers[i].choices = choices;
							}
						});
						teachers_done = true;
						if(checkForRun()){
							prepAlgorithm();
						}
					});
				}
			});			
		});
		
		function checkForRun(){
			if(students_done && teachers_done){
				return true;
			}
			return false;
		}
		
		function prepAlgorithm(){
			$('.number-sections .number').html(teachers.length);
			$('.number-students .number').html(Object.size(students));
			$('.cap .number').html(Math.ceil(Object.size(students)/teachers.length));
			
			$.ajax({
				url: "savestudents.php",
				type:"POST",
				data: {"students":students},
				success: function(result){
					console.log("success! " + result);
					$.ajax({
						url: "saveteachers.php",
						type:"POST",
						data: {"teachers":teachers},
						success: function(result){
							console.log("success! " + result);
							$('.run').removeClass('off');
						}
					});	
				}
			});	
			
	
			
			// write new vars to json files
						
		}
		
		Object.size = function(obj) {
		    var size = 0, key;
		    for (key in obj) {
		        if (obj.hasOwnProperty(key)) size++;
		    }
		    return size;
		};
		
		// adapt old algorithm script to use json imported not hardcoded teacher and student vars
		
		// write page

	});
</script>
  <script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>