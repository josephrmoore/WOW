jQuery(document).ready(function($){

	// Initialize global variables - generateThesis ***MUST*** always be before generateStudents
	var students_left = [];
	var theses = generateTheses(7);
	var students = generateStudents(80);
	var dataviz;
	// This is the algorithm
	sausage_factory();
	// Get dataviz data
	 dataviz = dataviz();
	
	// Print to screen
	for(var i=0;i<theses.length;i++){
		$('.theses tbody').append('<tr><td>'+i+'</td><td>'+theses[i].teacher+'</td><td>'+theses[i].choices[0]+'</td><td>'+theses[i].choices[1]+'</td><td>'+theses[i].choices[2]+'</td><td>'+theses[i].chosen+'</td><td>'+theses[i].not_chosen+'</td><td>'+theses[i].teacher_pref+'</td><td>'+theses[i].enrolled+'</td></tr>');
	}

	for(var i=0;i<students.length;i++){
		$('.students tbody').append('<tr><td>'+ i +'</td><td>'+ students[i].choices[0] +' <em>'+theses[students[i].choices[0]].teacher+'</em></td><td>'+ students[i].choices[1] +' <em>'+theses[students[i].choices[1]].teacher+'</em></td><td>'+ students[i].choices[2] +' <em>'+theses[students[i].choices[2]].teacher+'</em></td><td>'+ students[i].friends +'</td><td>'+students[i].thesis+'</td></tr>');
	}
			
	// Functions
	function generateTheses(total){
		var sections = [];
		for(var i=0;i<total;i++){
			sections[i] =  {
				"id": i,
				"teacher" : "TeachBot"+(1+i),
				"total" : 14,
				"enrolled":[],
				"teacher_pref":[],
				"choices" : [],
				"not_chosen":0,
				"chosen":0,
				"totalinterest":[]
			};
		}
		return sections;
	}
	
	function generateStudents(total){
		var students = [];
		for(var i=0;i<total;i++){
			var t = uniqueRandom(3, theses.length);
			var f = uniqueRandom(Math.floor(Math.random()*(total/8))+3, total);
			students[i] = {
				"id": i,
				"choices" : t,
				"friends": f,
				"thesis" : -1
			};
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
			var nmb = uniqueRandom(5, theses[i].totalinterest.length);
			for(var j=0;j<nmb.length;j++){
				theses[i].teacher_pref.push(theses[i].totalinterest[nmb[j]]);
			}
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
			// See how many people picked it as their first choice
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

	// Iterations (x3)
		for(var n=0;n<3;n++){
			// For each section...
			for(var i=0;i<theses.length;i++){
				// Find out which students selected that section as a 1st choice
				var choosers = getChoice(i, n);
				for(var j=0;j<theses[i].teacher_pref.length;j++){
					for(var k=0;k<choosers.length;k++){
						// If the teacher selected any of those students... 
						if(choosers[k] == theses[i].teacher_pref[j]){
							// Add them to that section
							addStudent(students[choosers[k]], i);
						}
					}
				}
				
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are now enrolled in this section...
					if(students[j].thesis == i){
						for(var k=0;k<students[j].friends.length;k++){
							// If any of their friends selected this section as a first choice and there's still room...
							if(students[students[j].friends[k]].choices[n] == i && theses[i].enrolled.length<theses[i].total){
								// The friend is enrolled in the section
								addStudent(students[students[j].friends[k]], i);
							}
						}
					}
				}
				
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are not enrolled in this section and want to be...
					if(students[j].choices[n] == i && students[j].thesis == -1){
						for(var k=0;k<students[j].friends.length;k++){
							// If any of their friends are already enrolled in the section and there's still room...
							if(students[students[j].friends[k]].thesis == i && theses[i].enrolled.length<theses[i].total){
								// That student is enrolled in the section
								addStudent(students[j],i);
							}
						}
					}
				}
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
		}
	// If there are any students left...
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
		var got_first = 0;
		var got_second = 0;
		var got_third = 0;
		var got_none = 0;
		var got_one = 0;
		var got_friends = 0;

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
			var friends = students[i].friends;
			var flag = false;
			for(var j=0;j<friends.length;j++){
				var friend_id = friends[j];
				var friend = students[friend_id];
				if(friend.thesis == students[i].thesis){
					flag = true;
				}
			}
			if(flag){
				got_friends++;
			}
		}

		got_one = got_first+got_second+got_third;

		var dataviz = {
			"got_first" : got_first,
			"got_second" : got_second,
			"got_third" : got_third,
			"got_none" : got_none,
			"got_one" : got_one,
			"got_friends" : got_friends
		}

		

		$('.dataviz tbody').append('<tr><td>'+dataviz.got_first+' -> '+ (dataviz.got_first/students.length)*100 +'%</td><td>'+dataviz.got_second+' -> '+ (dataviz.got_second/students.length)*100+'%</td><td>'+dataviz.got_third+' -> '+ (dataviz.got_third/students.length)*100+'%</td><td>'+dataviz.got_one+' -> '+ (dataviz.got_one/students.length)*100+'%</td><td>'+dataviz.got_none+' -> '+ (dataviz.got_none/students.length)*100+'%</td><td>'+dataviz.got_friends+' -> '+ (dataviz.got_friends/students.length)*100 +'%</td></tr>');

	}
	
});