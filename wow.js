var got_first = 0;
var got_second = 0;
var got_third = 0;
var got_none = 0;
var got_one = 0;
var got_peers = 0;

jQuery(document).ready(function($){
	var burroughs;
	var data;
	
	$.ajax({
	  dataType: "json",
	  url: "teachers.json",
	  data: data,
	  success: function(){
	  	for(name in data){
		  	burroughs.push(data[name]);
	  	}
	  	console.log(burroughs);
	  }
	});
	
	var iteration = 0;

	var student_data = [
		{
			"id": 0,
			"NetID": "",
			"choices" : [0,1,2],
			"peers": [4,3,53,42,6,7,11,1,27,12],
			"thesis" : -1
		},
		{
			"id": 1,
			"NetID": "",
			"choices" : [4,3,2],
			"peers": [51,52,79,42,26,67],
			"thesis" : -1
		},
		{
			"id": 2,
			"NetID": "",
			"choices" : [5,0,1],
			"peers": [28,73,37,21,77,33,4,39,60,9],
			"thesis" : -1
		},
		{
			"id": 3,
			"NetID": "",
			"choices" : [3,4,0],
			"peers": [60,22,21,56,76,41,12,5,33],
			"thesis" : -1
		},
		{
			"id": 4,
			"NetID": "",
			"choices" : [0,4,2],
			"peers": [73,6,65,25,31],
			"thesis" : -1
		},
		{
			"id": 5,
			"NetID": "",
			"choices" : [4,1,5],
			"peers": [4,2,33,35,27,74,72,31,18,40],
			"thesis" : -1
		},
		{
			"id": 6,
			"NetID": "",
			"choices" : [1,2,3],
			"peers": [55,12,53,36,47,24,41,30,61,52,57,64],
			"thesis" : -1
		},
		{
			"id": 7,
			"NetID": "",
			"choices" : [4,3,2],
			"peers": [66,7],
			"thesis" : -1
		},
		{
			"id": 8,
			"NetID": "",
			"choices" : [4,3,5],
			"peers": [48,18,19,7,61],
			"thesis" : -1
		},
		{
			"id": 9,
			"NetID": "",
			"choices" : [3,5,2],
			"peers": [16,4,61,11,12,68,44,49,51],
			"thesis" : -1
		},
		{
			"id": 10,
			"NetID": "",
			"choices" : [0,4,2],
			"peers": [72,56,76,30,0,78,38,59,63,27],
			"thesis" : -1
		},
		{
			"id": 11,
			"NetID": "",
			"choices" : [0,4,1],
			"peers": [22,17,51,78],
			"thesis" : -1
		},
		{
			"id": 12,
			"NetID": "",
			"choices" : [3,0,1],
			"peers": [78,75,16,17,13,65,38,52,29],
			"thesis" : -1
		},
		{
			"id": 13,
			"NetID": "",
			"choices" : [2,3,5],
			"peers": [3,68,22,29,26,57,70,30,59,1],
			"thesis" : -1
		},
		{
			"id": 14,
			"NetID": "",
			"choices" : [1,2,3],
			"peers": [11,9,61,67,3],
			"thesis" : -1
		},
		{
			"id": 15,
			"NetID": "",
			"choices" : [2,0,5],
			"peers": [79,28,41,10,14,22,3,18,42,63,2,67],
			"thesis" : -1
		},
		{
			"id": 16,
			"NetID": "",
			"choices" : [2,4,3],
			"peers": [10,27,65,36,61,15,49],
			"thesis" : -1
		},
		{
			"id": 17,
			"NetID": "",
			"choices" : [2,3,0],
			"peers": [35,37,75,49,11],
			"thesis" : -1
		},
		{
			"id": 18,
			"NetID": "",
			"choices" : [0,4,5],
			"peers": [63,14,0,37,10,77,67,16,36,53,62],
			"thesis" : -1
		},
		{
			"id": 19,
			"NetID": "",
			"choices" : [3,0,1],
			"peers": [40,60,70,51,20,18,17,36,9,14,22,30],
			"thesis" : -1
		},
		{
			"id": 20,
			"NetID": "",
			"choices" : [3,2,1],
			"peers": [20,70,65,13,58,2,47,11,49,72,60,34],
			"thesis" : -1
		},
		{
			"id": 21,
			"NetID": "",
			"choices" : [4,5,0],
			"peers": [8,7,39,14,16,47,20,67,70],
			"thesis" : -1
		},
		{
			"id": 22,
			"NetID": "",
			"choices" : [3,5,0],
			"peers": [7,72,42,23,35,67],
			"thesis" : -1
		},
		{
			"id": 23,
			"NetID": "",
			"choices" : [2,3,4],
			"peers": [31,12,66,47,43,25,24,76,69,51],
			"thesis" : -1
		},
		{
			"id": 24,
			"NetID": "",
			"choices" : [3,4,5],
			"peers": [56,46,22,49,7,1,42],
			"thesis" : -1
		},
		{
			"id": 25,
			"NetID": "",
			"choices" : [5,4,3],
			"peers": [17,41,46,43,9,3,72,76,66],
			"thesis" : -1
		},
		{
			"id": 26,
			"NetID": "",
			"choices" : [2,1,3],
			"peers": [39,34,72],
			"thesis" : -1
		},
		{
			"id": 27,
			"NetID": "",
			"choices" : [3,2,1],
			"peers": [43,2,30,17,64,45,41,7,75],
			"thesis" : -1
		},
		{
			"id": 28,
			"NetID": "",
			"choices" : [4,3,2],
			"peers": [67,10,66,47,9,51,22,79],
			"thesis" : -1
		},
		{
			"id": 29,
			"NetID": "",
			"choices" : [2,0,1],
			"peers": [37,22,67,7,75,5,71,1,76,73],
			"thesis" : -1
		},
		{
			"id": 30,
			"NetID": "",
			"choices" : [4,2,1],
			"peers": [23,39,32,55,42,28,56,65,40,43],
			"thesis" : -1
		},
		{
			"id": 31,
			"NetID": "",
			"choices" : [2,3,0],
			"peers": [40,44,68,32,72,48,33,0,8],
			"thesis" : -1
		},
		{
			"id": 32,
			"NetID": "",
			"choices" : [1,2,4],
			"peers": [66,68,19,41,37,39,65,2,22],
			"thesis" : -1
		},
		{
			"id": 33,
			"NetID": "",
			"choices" : [2,0,3],
			"peers": [18,13,20,73],
			"thesis" : -1
		},
		{
			"id": 34,
			"NetID": "",
			"choices" : [1,0,2],
			"peers": [47,78,76,25,23,38],
			"thesis" : -1
		},
		{
			"id": 35,
			"NetID": "",
			"choices" : [1,0,3],
			"peers": [18,24,17,69,55,64,27,46,44,70,35],
			"thesis" : -1
		},
		{
			"id": 36,
			"NetID": "",
			"choices" : [4,0,3],
			"peers": [33,58,61,68,34,27,19],
			"thesis" : -1
		},
		{
			"id": 37,
			"NetID": "",
			"choices" : [3,0,2],
			"peers": [61,69,21,24,26,8,71,73],
			"thesis" : -1
		},
		{
			"id": 38,
			"NetID": "",
			"choices" : [3,0,5],
			"peers": [27,77,34,29],
			"thesis" : -1
		},
		{
			"id": 39,
			"NetID": "",
			"choices" : [5,2,3],
			"peers": [40,8,71,39,34,78,14,27,29,64],
			"thesis" : -1
		},
		{
			"id": 40,
			"NetID": "",
			"choices" : [5,3,0],
			"peers": [40,67,44,65,32,71,16,12],
			"thesis" : -1
		},
		{
			"id": 41,
			"NetID": "",
			"choices" : [0,1,2],
			"peers": [48],
			"thesis" : -1
		},
		{
			"id": 42,
			"NetID": "",
			"choices" : [2,3,0],
			"peers": [29,16,49,0,47,38,20,26,27,73,66,17,4,7,5],
			"thesis" : -1
		},
		{
			"id": 43,
			"NetID": "",
			"choices" : [3,0,1],
			"peers": [22,42,19,47,46,66,23,76,64,16,8,27,6,2,4],
			"thesis" : -1
		},
		{
			"id": 44,
			"NetID": "",
			"choices" : [3,4,5],
			"peers": [74,79,69,41,22,28,43,14,29,6],
			"thesis" : -1
		},
		{
			"id": 45,
			"NetID": "",
			"choices" : [3,1,2],
			"peers": [56,75,40,28,16,25,15,63],
			"thesis" : -1
		},
		{
			"id": 46,
			"NetID": "",
			"choices" : [3,2,5],
			"peers": [24,12,16,21,38,27,14,25,66,57,73],
			"thesis" : -1
		},
		{
			"id": 47,
			"NetID": "",
			"choices" : [2,3,4],
			"peers": [49,35,44,37,2,51,25,32,52,34,68],
			"thesis" : -1
		},
		{
			"id": 48,
			"NetID": "",
			"choices" : [3,4,2],
			"peers": [41,50,21,37,29,77,19],
			"thesis" : -1
		},
		{
			"id": 49,
			"NetID": "",
			"choices" : [2,4,3],
			"peers": [54,5,28,38,59],
			"thesis" : -1
		},
		{
			"id": 50,
			"NetID": "",
			"choices" : [4,5,2],
			"peers": [18,46,0,22],
			"thesis" : -1
		},
		{
			"id": 51,
			"NetID": "",
			"choices" : [5,4,3],
			"peers": [12,33,50,49,8,64,14,67,23,70,43,7],
			"thesis" : -1
		},
		{
			"id": 52,
			"NetID": "",
			"choices" : [1,2,4],
			"peers": [41,45,61,8,53,11,14,73,30,3,77],
			"thesis" : -1
		},
		{
			"id": 53,
			"NetID": "",
			"choices" : [2,4,5],
			"peers": [16,34,7,14,24],
			"thesis" : -1
		},
		{
			"id": 54,
			"NetID": "",
			"choices" : [3,0,2],
			"peers": [62,47,78,70,27,11,30,52,34],
			"thesis" : -1
		},
		{
			"id": 55,
			"NetID": "",
			"choices" : [4,0,3],
			"peers": [44,79,62,21,45,36,24,53,55,57,52,3],
			"thesis" : -1
		},
		{
			"id": 56,
			"NetID": "",
			"choices" : [0,1,2],
			"peers": [43,7,52,29,13,9,1,75],
			"thesis" : -1
		},
		{
			"id": 57,
			"NetID": "",
			"choices" : [0,1,2],
			"peers": [7,42,65,78],
			"thesis" : -1
		},
		{
			"id": 58,
			"NetID": "",
			"choices" : [0,1,4],
			"peers": [69,74,5,6,41,68,13,42],
			"thesis" : -1
		},
		{
			"id": 59,
			"NetID": "",
			"choices" : [0,1,5],
			"peers": [28,49,77,16,33,55,7],
			"thesis" : -1
		},
		{
			"id": 60,
			"NetID": "",
			"choices" : [3,4,2],
			"peers": [13,39,78,76],
			"thesis" : -1
		},
		{
			"id": 61,
			"NetID": "",
			"choices" : [0,1,4],
			"peers": [50,65,22,69,58,41,64,33,25,3,28],
			"thesis" : -1
		},
		{
			"id": 62,
			"NetID": "",
			"choices" : [0,2,5],
			"peers": [34,7,55,2,37,18,42,51,54,56,35,38],
			"thesis" : -1
		},
		{
			"id": 63,
			"NetID": "",
			"choices" : [0,3,4],
			"peers": [42,6,46,25,61,9,38,21,1,32,64],
			"thesis" : -1
		},
		{
			"id": 64,
			"NetID": "",
			"choices" : [0,3,2],
			"peers": [79,18,58,8,75,17],
			"thesis" : -1
		},
		{
			"id": 65,
			"NetID": "",
			"choices" : [4,3,2],
			"peers": [1,66,9,5,43,10,72,62,67,41,53,23],
			"thesis" : -1
		},
		{
			"id": 66,
			"NetID": "",
			"choices" : [4,5,3],
			"peers": [67,2,66,13,11,64,9,68],
			"thesis" : -1
		},
		{
			"id": 67,
			"NetID": "",
			"choices" : [2,3,1],
			"peers": [78,32,62,25,42,8,79],
			"thesis" : -1
		},
		{
			"id": 68,
			"NetID": "",
			"choices" : [3,1,2],
			"peers": [12,30,15,49,67,76,72,47,69,63],
			"thesis" : -1
		},
		{
			"id": 69,
			"NetID": "",
			"choices" : [2,1,3],
			"peers": [75,34,4,67,27,66,65,22,19,63,69],
			"thesis" : -1
		},
		{
			"id": 70,
			"NetID": "",
			"choices" : [3,2,4],
			"peers": [22,15,48,43,7],
			"thesis" : -1
		},
		{
			"id": 71,
			"NetID": "",
			"choices" : [2,3,4],
			"peers": [18,74,68,39,44,71],
			"thesis" : -1
		},
		{
			"id": 72,
			"NetID": "",
			"choices" : [3,2,1],
			"peers": [52,18,15,12,55],
			"thesis" : -1
		},
		{
			"id": 73,
			"NetID": "",
			"choices" : [0,1,2],
			"peers": [22,35,2,12],
			"thesis" : -1
		},
		{
			"id": 74,
			"NetID": "",
			"choices" : [2,1,3],
			"peers": [34,9,50,40,78,67],
			"thesis" : -1
		},
		{
			"id": 75,
			"NetID": "",
			"choices" : [3,2,1],
			"peers": [77,78,45,20,2,43,65,46,19,37,33],
			"thesis" : -1
		},
		{
			"id": 76,
			"NetID": "",
			"choices" : [4,3,0],
			"peers": [72,40,37,44,66,50,1,39,31,48,41],
			"thesis" : -1
		},
		{
			"id": 77,
			"NetID": "",
			"choices" : [5,3,2],
			"peers": [67,5,29],
			"thesis" : -1
		},
		{
			"id": 78,
			"NetID": "",
			"choices" : [3,4,0],
			"peers": [2,8,49,14,12,76,22,64,27],
			"thesis" : -1
		},
		{
			"id": 79,
			"NetID": "",
			"choices" : [4,3,0],
			"peers": [42,0,74,46,22],
			"thesis" : -1
		},
	];


	var characters = [
		'Larry Stooge',
		'Moe Stooge',
		'Curly Stooge',
		'Bugs Bunny',
		'Elmer Fudd',
		'Daffy Duck',
		'Foghorn Leghorn',
		'Sylvester',
		'Tweety Bird',
		'Marvin Martian',
		'Wile E. Coyote',
		'Road Runner',
		'Speedy Gonzales',
		'Pepe Le Pew',
		'Petunia Pig',
		'Yosemite Sam',
		'Tasmanian Devil',
		'Tasmanian She-Devil',
		'Mickey Mouse',
		'Pluto',
		'Sluggo',
		'Nancy',
		'Charlie Brown',
		'Linus',
		'Lucy',
		'Pigpen',
		'Snoopy',
		'Woodstock',
		'Doctor Jekyll',
		'Mister Hyde',
		'Huey',
		'Dewey',
		'Louie',
		'Pee-Wee Herman',
		'Cowboy Curtis',
		'Miss Yvonne',
		'Globey',
		'Randy',
		'Pterri',
		'Clockey',
		'Floory',
		'Dog Chair',
		'Conky 2000',
		'Jambi',
		'Chairry',
		'Mario',
		'Luigi',
		'Princess Peach',
		'Toad',
		'Bowser',
		'Yoshi',
		'Wario',
		'Wa-Luigi',
		'Donkey Kong',
		'Diddy Kong',
		'Dixie Kong',
		'Cranky Kong',
		'Candy Kong',
		'Funky Kong',
		'Maxwell Smart',
		'Agent 99',
		'Chief',
		'Agent 13',
		'Batman',
		'Robin',
		'Superman',
		'Captain Marvel',
		'Wonder Woman',
		'Batgirl',
		'Catwoman',
		'Green Lantern',
		'Flash',
		'Daredevil',
		'Invisible Woman',
		'The Hulk',
		'The Thing',
		'Thor',
		'Iron Man',
		'Captain Kirk',
		'Scotty',
		'Bones',
		'Spock',
		'Jim',
		'Uhura',
		'Sulu'
	];
	
	// Initialize global variables - generateThesis ***MUST*** always be before generateStudents
	var students_left = [];
	var theses = generateTheses(6);
	var unshuffled_students = generateStudents(student_data);

	var shuffled_ids = uniqueRandom(unshuffled_students.length, unshuffled_students.length);
	var students = [];
	var teacher_chosen;
	for(var i=0;i<unshuffled_students.length;i++){
		// students[i] = unshuffled_students[i];
		students[i] = unshuffled_students[shuffled_ids[i]];
	}
	// This is the algorithm
	sausage_factory();
	for(var i=0;i<students.length;i++){
		var fr = '';
		for(var j=0;j<students[i].peers.length;j++){
			fr += characters[students[i].peers[j]];
			fr += ', ';
		}
		fr = fr.substr(0, fr.length-2);
		$('.students tbody').append('<tr><td>'+ characters[students[i].id] +'</td><td class="t">'+ burroughs[students[i].choices[0]] +'</td><td class="t">'+ burroughs[students[i].choices[1]] +'</td><td class="t">'+ burroughs[students[i].choices[2]] +'</td><td>'+ fr +'</td><td class="t">'+burroughs[students[i].thesis]+'</td></tr>');
	}
	// Get dataviz data
	var dataviz = dataviz();
			
	// Functions
	function generateTheses(total){
		var sections = [];
		var prefs = [
				[3,11,41,29,54],
				[30,32,34,45,52],
				[17,16,9,26,48],
				[22,24,43,46,63],
				[65,66,11,58,10],
				[25,39,15,50,77]
		];
		for(var i=0;i<total;i++){
			sections[i] =  {
				"id": i,
				"teacher" : "TeachBot"+(1+i),
				"total" : 14,
				"enrolled":[],
				"teacher_pref":prefs[i],
				"choices" : [],
				"not_chosen":0,
				"chosen":0,
				"totalinterest":[]
			};
		}
		return sections;
	}
	

	
	function generateStudents(student_data){
		var students = [];
		for(var i=0;i<student_data.length;i++){
			students[i] = student_data[i];
			students_left.push(students[i].id);	
		}
		for(var i=0;i<theses.length;i++){
			var interest = [];
			var pref = [];
			for(var j=0;j<students.length;j++){
				for(var k=0;k<students[j].choices.length;k++){
					if(students[j].choices[k] == i){
						interest.push(j);
					}
				}
			}
			theses[i].totalinterest = interest;
		}
		return students;
	}
	

	
	function uniqueRandom(count, bound){
		if(bound>=count){
			var set = [];
			for(var j=0;j<count;j++){
				if(j==0){
					set[j] = Math.floor(Math.random()*bound);
				} else {
					set[j] = Math.floor(Math.random()*bound);
					for(k=0;k<j;k++){
						if(set[j] == set[k]){
							set[j] = checkRepeat(set[k], set[j], bound);
							k = -1;
						}
					}
				}
			}
			return set;
		} else {
			return false;
		}
	}
	
	function checkRepeat(n1, n2, total){
		if(n1 == n2){
			n2 = Math.floor(Math.random()*total);
			return checkRepeat(n1, n2, total);
		} else {
			return n2;
		}
	}
	
	function sausage_factory(){
		
		iteration++;		
		// Initialize student interest data
		for(var i=0;i<theses.length;i++){
			var first = 0;
			var second = 0;
			var third = 0;
			var not_chosen = 0;
			var chosen = 0;
			var interested_students = [];

			for(var j=0;j<students.length;j++){
				if(students[j].choices[0] == i){
					first++;
					interested_students.push(students[j].id);
				}
				if(students[j].choices[1] == i){
					second++;
					interested_students.push(students[j].id);
				}
				if(students[j].choices[2] == i){
					third++;
					interested_students.push(students[j].id);
				}
				if(students[j].choices[2] != i && students[j].choices[1] != i && students[j].choices[0] != i){
					not_chosen++;
				}
			}
			theses[i].choices[0] = first;
			theses[i].choices[1] = second;
			theses[i].choices[2] = third;
			theses[i].not_chosen = not_chosen;
			theses[i].chosen = first+second+third;
		}
		
	// Pre-Iteration
		// For each section...
		for(var i=0;i<theses.length;i++){
			// See how many people picked it as their first choice. i=thesis section, 0=1st choice
			var choosers = getChoice(i, 0);
			// If the number of 1st choice students is less than the total allowable students for that section...
			if(choosers.length<=theses[i].total){
				// Add them all to that section
				for(var j=0;j<choosers.length;j++){
					addStudent(students[choosers[j]],i);					
				}
			}
		}

		
	// The remaining sections are contested
	// Iterations (x3) 1st, 2nd, & 3rd choices for thesis
		for(var n=0;n<3;n++){			
			// For each section...
			for(var i=0;i<theses.length;i++){				
				// Find out which students selected that section as this iteration's choice (1st, 2nd, or 3rd). i=thesis section, n=choice, 1-3
				var choosers = getChoice(i, n);
				teacher_chosen = 0;
				teacherChoice(i, choosers);
				if(teacher_chosen>0){
					friendIn(n, i);
					friendOut(n, i);
				}
				oneAttaTime(n, i);
				spaceLeft(n, i);
			}
			// Repeat for 2nd & 3rd choices...
		}
		anyLeft();
		printResults();
	}
	
	
	
// ************************** FUNCTION DECLARATIONS ************************** //
	
	
	
	
	function printResults(){
		var c = $('li.blank').clone();
		c.removeClass('blank');
		c.removeClass('off');
		c.addClass('i-'+iteration);
		// c.find('h1').html('Iteration '+iteration);
		$('li.blank').before(c);
		
		// Print to screen
		for(var i=0;i<theses.length;i++){
			var pr = '';
			var en = '';
			for(var j=0;j<theses[i].teacher_pref.length;j++){
				pr += characters[theses[i].teacher_pref[j]];
				pr += ', ';
			}
			for(var j=0;j<theses[i].enrolled.length;j++){
				en += characters[theses[i].enrolled[j]];
				en += ', ';
			}
			pr = pr.substr(0, pr.length-2);
			en = en.substr(0, en.length-2);
			$('.i-' + iteration + ' .theses tbody').append('<tr><td>'+burroughs[i]+'</td><td>'+theses[i].choices[0]+'</td><td>'+theses[i].choices[1]+'</td><td>'+theses[i].choices[2]+'</td><td>'+theses[i].chosen+'</td><td>'+theses[i].not_chosen+'</td><td>'+pr+'</td><td>'+en+'</td></tr>');
		}
	}
	
	
	function oneAttaTime(n, i){
		// For all the students...
		for(var j=0;j<students.length;j++){
			// If they are not enrolled in this section and want to be...
			if(students[j].choices[n] == i && students[j].thesis == -1){
				// If there's still room...
				if(theses[i].enrolled.length<theses[i].total){
					// That student is enrolled in the section
					addStudent(students[j],i);
					friendIn();
					friendOut();
				}
			}
		}
	}
	
	
	function teacherChoice(i, choosers){
		for(var j=0;j<theses[i].teacher_pref.length;j++){
			for(var k=0;k<choosers.length;k++){
				// If the teacher selected any of those students... 
				if(choosers[k] == theses[i].teacher_pref[j]){
					// Add them to that section
					addStudent(students[choosers[k]], i);
					teacher_chosen++;
				}
			}
		}
	}
	
	
	
	function friendIn(n, i){
		// For all the students...
		for(var j=0;j<students.length;j++){
			// If they are now enrolled in this section...
			if(students[j].thesis == i){
				for(var k=0;k<students[j].peers.length;k++){
					// If any of their peers selected this section as this iteration's choice (1st, 2nd, 3rd) and there's still room...
					if(students[students[j].peers[k]].choices[n] == i && theses[i].enrolled.length<theses[i].total){
						// The peer is enrolled in the section
						addStudent(students[students[j].peers[k]], i);
					}
				}
			}
		}
	}
	
	function friendOut(n, i){
		// For all the students...
		for(var j=0;j<students.length;j++){
			// If they are not enrolled in this section and want to be...
			if(students[j].choices[n] == i && students[j].thesis == -1){
				for(var k=0;k<students[j].peers.length;k++){
					// If any of their peers are already enrolled in the section and there's still room...
					if(students[students[j].peers[k]].thesis == i && theses[i].enrolled.length<theses[i].total){
						// That student is enrolled in the section
						addStudent(students[j],i);
					}
				}
			}
		}
	}
	
	function spaceLeft(n, i){
		// For all the students...
		for(var j=0;j<students.length;j++){
			// If they are not enrolled in this section and want to be...
			if(students[j].choices[n] == i && students[j].thesis == -1){
				// If there's still room...
				if(theses[i].enrolled.length<theses[i].total){
					// That student is enrolled in the section
					addStudent(students[j],i);
				}
			}
		}
	}
	
	function anyLeft(){
		// For each section...
		for(var j=0;j<students.length;j++){
			if(students[j].thesis == -1){
				for(var k=0;k<theses.length;k++){
					// If there is space left
					if(theses[k].enrolled.length<theses[k].total){
						// Add that student
						addStudent(students[j], k);
					}
				}
			}
		}
		
		var postdata = {
			'results': [
				theses, students, unshuffled_students
			]
		};
		$.ajax({
			url: "savelog.php",
			type:"POST",
			data: postdata,
			success: function(result){
				console.log(postdata);
				console.log("success! " + result);
				window.close();
			}
		});			

	}
	
	
	function getChoice(section, choice){
		var choosers = [];
		for(var i=0;i<students.length;i++){
			if(students[i].choices[choice] == section){
				choosers.push(i);
			}
		}
		return choosers;
	}
	
	function addStudent(student, section){
		if(student.thesis == -1){
			student.thesis = section;
			theses[section].enrolled.push(student.id);
		}
	}
	
	function studentsLeft(){
		var sl = [];
		for(var i=0;i<students.length;i++){
			if(students[i].thesis == -1){
				sl.push(i);
			}
		}
		return sl;
	}
	
	function dataviz(){

		for(var i=0;i<students.length;i++){
			if(students[i].choices[0] == students[i].thesis){
				got_first++;
			} else if (students[i].choices[1] == students[i].thesis){
				got_second++;
			} else if (students[i].choices[2] == students[i].thesis){
				got_third++
			} else {
				got_none++;
			}
			var peers = students[i].peers;
			var flag = false;
			for(var j=0;j<peers.length;j++){
				var peer_id = peers[j];
				var peer = students[peer_id];
				if(peer.thesis == students[i].thesis){
					flag = true;
				}
			}
			if(flag){
				got_peers++;
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

		

		$('.dataviz tbody').append('<tr><td>'+dataviz.got_first+' -> '+ (dataviz.got_first/students.length)*100 +'%</td><td>'+dataviz.got_second+' -> '+ (dataviz.got_second/students.length)*100+'%</td><td>'+dataviz.got_third+' -> '+ (dataviz.got_third/students.length)*100+'%</td><td>'+dataviz.got_one+' -> '+ (dataviz.got_one/students.length)*100+'%</td><td>'+dataviz.got_none+' -> '+ (dataviz.got_none/students.length)*100+'%</td><td>'+dataviz.got_peers+' -> '+ (dataviz.got_peers/students.length)*100 +'%</td></tr>');


	}
	
	$('#run_me_again').click(function(){
		got_first = 0;
		got_second = 0;
		got_third = 0;
		got_none = 0;
		got_one = 0;
		got_peers = 0;
		students_left = [];
		theses = generateTheses(6);
		unshuffled_students = generateStudents(student_data);
		shuffled_ids = uniqueRandom(unshuffled_students.length, unshuffled_students.length);
		students = [];
		for(var i=0;i<unshuffled_students.length;i++){
			students[i] = unshuffled_students[shuffled_ids[i]];
		}
		// This is the algorithm
		sausage_factory();
	});
	
	$('#show_hide_students').click(function(){
		if($('table.students').hasClass('off')){
			$('table.students').removeClass('off');
			$('#show_hide_students').html('-');
		} else {
			$('table.students').addClass('off');
			$('#show_hide_students').html('+');
		}
	});
	
});

// Load the Visualization API and the piechart package.
  google.load('visualization', '1.0', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
function drawChart(){
	drawChart1();
	drawChart2();
	drawChart3();
}
  function drawChart1() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choice');
    data.addColumn('number', 'Students');
    data.addRows([
      ['1st Choice', got_first],
      ['2nd Choice', got_second],
      ['3rd Choice', got_third],
      ['No choice', got_none],
    ]);

    // Set chart options
    var options = {'title':'Students by choice',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
  }

  function drawChart2() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choice');
    data.addColumn('number', 'Students');
    data.addRows([
      ['Got one of their choices', got_one],
      ['Didn\'t get any of their choices', got_none],
    ]);

    // Set chart options
    var options = {'title':'Got One vs. Got None',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
  }

  function drawChart3() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choice');
    data.addColumn('number', 'Students');
    data.addRows([
      ['In a section with a peer', got_peers],
      ['In a section with no peers', (80-got_peers)]
    ]);

    // Set chart options
    var options = {'title':'Students by peers',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div3'));
    chart.draw(data, options);
  }