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
	<section class="students">
		<h2>Students</h2>
		<button id="import-students">Import Student Data CSV</button>
		<table class="off">
			<thead>
				<th class="n-number">N-Number</th>
				<th class="name">Name</th>
				<th class="choice-1">Choice 1</th>
				<th class="choice-2">Choice 2</th>
				<th class="choice-3">Choice 3</th>
				<th class="peers">Peers</th>
				<th class="professor-preferred">Professor Preferred</th>
				<th class="current-thesis">Current Thesis</th>
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
				</tr>
			</tbody>
		</table>
		<button id="students-ok" class="off">All the Student Data is OK!</button>
	</section>
	<section class="teachers">
		<h2>Teachers</h2>
		<button id="import-teachers">Import Teacher Data CSV</button>
		<table class="off">
			<thead>
				<th class="name">Name</th>
				<th class="choices">Choices</th>
			</thead>
			<tbody>
				<tr class="template off">
					<td class="name" contenteditable="true"></td>
					<td class="choices" contenteditable="true"></td>
				</tr>
			</tbody>
			</table>
		<button id="teachers-ok" class="off">All the Teacher Data is OK!</button>
	</section>
	
	<section class="run off">
		<form action="">
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
	<section class="get-results off">When all the popup windows close, you can <button id="get-results">Click Here</button> to choose from the existing results sets.</section>
	<section class="results dataviz off">
		<table>
					<thead>
					<tr>
						<th>Number &amp; % of Students that got 1st Choice</th>
						<th>Number &amp; % of Students that got 2nd Choice</th>
						<th>Number &amp; % of Students that got 3rd Choice</th>
						<th>Number &amp; % of Students that got One of Their Choices</th>
						<th>Number &amp; % of Students that got none of their choices</th>
						<th>Number &amp; % of Students that got at least one of their friends in their section</th>
						<th>Select</th>
					</tr>
					</thead>
			<tbody>
			</tbody>
		</table>
	</section>
	<p id="debug"></p>
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
		var allresults = [];
		$('form').submit(function(){
			// send teacher and student data to overwrite JSON files
			// run algorithm
			runAlgorithm(25);
			return false;
		});
		function runAlgorithm(times){
			for(i=0;i<times;i++){
				window.open("index.php", "_blank", "width=100,height=100");
			}
		}
		
		function dataviz(students, s){
			var got_first = 0;
			var got_second = 0;
			var got_third = 0;
			var got_none = 0;
			var got_one = 0;
			var got_peers = 0;
			for(var i=0;i<s.length;i++){
				if(s[i].choices[0] == s[i].thesis){
					got_first++;
				} else if (s[i].choices[1] == s[i].thesis){
					got_second++;
				} else if (s[i].choices[2] == s[i].thesis){
					got_third++
				} else {
					got_none++;
				}
				
				if(s[i].NetID){
					console.log(s[i].NetID);
					var p = students[s[i].NetID].peers; // string of Nnumbers
					var peers = p.split(" "); // array of Nnumbers
					var flag = false;
					if(peers.length>0){
						for(j=0;j<peers.length;j++){
							if(peers[j] == ""){
								peers.splice(j,1);
								console.log(peers);
							}
							for(k=0;k<s.length;k++){
								if(s[k].NetID == peers[j]){
									peers[j] = s[k].id;
								}
							}
							if(peers[j] && peers[j] != ""){
								console.log(peers[j]);
								var peer = s[peers[j]];
								if(peer.thesis == s[i].thesis){
									flag = true;
								}
							}
						}
					}
					if(flag){
						got_peers++;
					}
				}
			}
	
			got_one = got_first+got_second+got_third;
	
			var dataviz = {
				"got_first" : got_first,
				"got_second" : got_second,
				"got_third" : got_third,
				"got_none" : got_none,
				"got_one" : got_one,
				"got_peers" : got_peers
			}
			return dataviz;
	
		}
		
		function showResults(dataviz, students, i){
			$('.results tbody').append('<tr data-id="' + i + '"><td>'+dataviz.got_first+' -> '+ (dataviz.got_first/students.length)*100 +'%</td><td>'+dataviz.got_second+' -> '+ (dataviz.got_second/students.length)*100+'%</td><td>'+dataviz.got_third+' -> '+ (dataviz.got_third/students.length)*100+'%</td><td>'+dataviz.got_one+' -> '+ (dataviz.got_one/students.length)*100+'%</td><td>'+dataviz.got_none+' -> '+ (dataviz.got_none/students.length)*100+'%</td><td>'+dataviz.got_peers+' -> '+ (dataviz.got_peers/students.length)*100 +'%</td><td class="select"><button>Select</button></td></tr>');
		}
		
		$('#get-results').click(function(){
		
			$.ajax({
				url: "parselog.php",
				success: function(data){
					var results = JSON.parse(data);
					allresults = results;
					showTop50(allresults);
				}
			});
			$('.get-results').addClass('off');
			$('.results').removeClass('off');
		});
		
		function showTop50(allresults){
			var weighted = [];
			// weight all results
			for(i=0; i<allresults.allresults.length; i++){
				var s = allresults.allresults[i].students.students;
				var d = dataviz(students, s);
				var one = d.got_one/s.length*3;
				var first = d.got_first/s.length*2;
				var peer = d.got_peers/s.length;
				var weight = (one+first+peer)/6;
				var w = {
					"id":i,
					"weight":weight
				}
				weighted.push(w);
			}
			// get top ones first
			weighted = weighted.sort(function(obj1, obj2) {
				return obj2.weight - obj1.weight;
			});
			// display 
			for(i=0; i<weighted.length; i++){
				var s = allresults.allresults[weighted[i].id].students.students;
				showResults(dataviz(students, s), s, weighted[i].id);
			}
			$('.select button').click(function(){
				var id = $(this).parent().parent().attr('data-id');
				allresults.allresults[id].id = id;

				// cram allresults[weighted[i].id].results[1] object into tables from original page, or popup		
				$.ajax({
					type:"POST",
					url:"session.php",
					data: allresults.allresults[id],
					success:function(data){
						window.open("single.php", "_blank");
					}
				});
				
					
			});
			
		}
	
		
		$('#import-students').click(function(){
			$('.students table').removeClass('off');
			$(this).addClass('off');
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
						clone.find('.choice-1').html(revertTeacher(students[N].choices[0]));
						clone.find('.choice-2').html(revertTeacher(students[N].choices[1]));
						clone.find('.choice-3').html(revertTeacher(students[N].choices[2]));
						clone.find('.peers').html(students[N].peers);
						clone.find('.current-thesis').html(students[N].current);
						clone.find('.professor-preferred').html(students[N].professor_preferred);
						clone.removeClass('template off');
						temp.before(clone);
					}
					$('.students div').removeClass('off');
					$('#students-ok').removeClass('off');
					$('#students-ok').click(function(){
						$(this).addClass('off');
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
								students[N].name = name;
								students[N].choices[0] = convertTeacher(c1);
								students[N].choices[1] = convertTeacher(c2);
								students[N].choices[2] = convertTeacher(c3);
								students[N].peers = peers;
								students[N].current = current;
							}
						});
						students_done = true;
						if(checkForRun()){
							$('.run').removeClass('off');
						}
					});
					if(teachers_done){
						printPreferred();
					}
				}
			});			
		});
		
		
		$('#import-teachers').click(function(){
			$(this).addClass('off');
			$('.teachers table').removeClass('off');
			$.ajax({
				url: "convert.php?file=teachers.csv",
				success: function(data){
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
					
					$('#teachers-ok').removeClass('off');
					$('#teachers-ok').click(function(){
						$(this).addClass('off');
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
					
					if(students_done){
						printPreferred();
					}
				}
			});			
		});
		
		function printPreferred(){
			for(j=0;j<teachers.length;j++){
				var choices = teachers[j].choices;
				var arr = choices.split(" ");
				$('.students tr').each(function(i){
					for(k=0; k<arr.length; k++){
						if($(this).find('.n-number').html() == arr[k] && $(this).find('.n-number').html() != ""){
							console.log($(this).find('.name').html());
							students[arr[k]].professor_preferred += teachers[j].name + " ";
							$(this).find('.professor-preferred').html(students[arr[k]].professor_preferred);
						}
					}
				});
			}
		}
		
		function checkForRun(){
			if(students_done && teachers_done){
				return true;
			}
			return false;
		}
		
		function prepAlgorithm(){
			printPreferred();
			$('.number-sections .number').html(teachers.length);
			$('.number-students .number').html(Object.size(students));
			$('.cap .number').html(Math.ceil(Object.size(students)/teachers.length));
			
			$.ajax({
				url: "savestudents.php",
				type:"POST",
				data: {"students":students},
				success: function(result){
					$.ajax({
						url: "saveteachers.php",
						type:"POST",
						data: {"teachers":teachers},
						success: function(result){
							console.log("success! " + result);
							$('.run').removeClass('off');
							$('.get-results').removeClass('off');
						}
					});	
				}
			});						
		}
		
		Object.size = function(obj) {
		    var size = 0, key;
		    for (key in obj) {
		        if (obj.hasOwnProperty(key)) size++;
		    }
		    return size;
		};
		
		function revertTeacher(_in){
			out = "No Choice";
			switch(parseInt(_in)){
				case 0:
					out = "Katherine Moriwaki";
					break;
				case 1:
					out = "John Sharp";
					break;
				case 2:
					out = "Colleen Macklin";
					break;
				case 3:
					out = "Melanie Creen";
					break;
				case 4:
					out = "Anthony Deen";
					break;
				case 5:
					out = "Marko Tandefelt";
					break;
				default:
					out = "No Choice";
					break;
			}
			return out;
		}
		
		function convertTeacher(_in){
			var out = -1;
			switch(_in){
				case "Katherine Moriwaki":
					out = 0;
					break;
				case "John Sharp":
					out = 1;
					break;
				case "Colleen Macklin":
					out = 2;
					break;
				case "Melanie Creen":
					out = 3;
					break;
				case "Anthony Deen":
					out = 4;
					break;
				case "Marko Tandefelt":
					out = 5;
					break;
				default:
					out = -1;
					break;
			}
			return out;
		}
				
		// write page for picking results
			// parse log
			// weight results
			// display filtered
			// display single
			// choosing mechanism
			// export to csv
		
		

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