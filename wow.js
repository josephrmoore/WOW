jQuery(document).ready(function($){

	var theses = generateTheses(7);
	var students = generateStudents(80);
	// console.log(students);
	// console.log(theses);
	
	for(i=0;i<theses.length;i++){
		var first = 0;
		var second = 0;
		var third = 0;
		var not_chosen = 0;
		var chosen = 0;
		
		for(j=0;j<students.length;j++){
			if(students[j].preferences.thesis_id[0] == i){
				first++;
			}
			if(students[j].preferences.thesis_id[1] == i){
				second++;
			}
			if(students[j].preferences.thesis_id[2] == i){
				third++;
			}
			if(students[j].preferences.thesis_id[2] != i && students[j].preferences.thesis_id[1] != i && students[j].preferences.thesis_id[0] != i){
				not_chosen++;
			}
		}
		theses[i].selections.first = first;
		theses[i].selections.second = second;
		theses[i].selections.third = third;
		theses[i].selections.third = third;
		theses[i].selections.not_chosen = not_chosen;
		theses[i].selections.chosen = first+second+third;
	}
	var smallest = students.length;

	for(i=0;i<theses.length;i++){
		var students_left = [];
		if(theses[i].selections.first <= theses[i].spaces.total){
			for(j=0;j<students.length;j++){
				if(students[j].preferences.thesis_id[0] == i){
					students[j].enrolled_thesis = i;
					theses[i].enrolled_students.push(j);
				}
				if(students[j].enrolled_thesis<0){
					students_left.push(students[j].id);
				}
			}
		}
	
		var l = theses[i].enrolled_students.length;
		var avail = uniqueRandom(Math.floor(Math.random()*5), Math.floor(Math.random()*l));
		var st = [];
		console.log(avail);
		for(j=0;j<avail.length;j++){
			console.log(theses[i].enrolled_students);
			// The 5 is the number of students a teacher can put dibs on
			theses[i].preferred_students.push(theses[i].enrolled_students[avail[j]]);
		}
		
		// for(j=0;j<students.length;j++){
		// 	if(students[j].enrolled_thesis<0 && students[j].preferences.thesis_id[1] == i && theses[i].enrolled_students<theses[i].spaces.total && theses[i].){
		// 		students[j].enrolled_thesis = i;
		// 		theses[i].enrolled_students.push(j);
		// 	}
		// }
		// 
		
		$('.theses tbody').append('<tr><td>'+theses[i].id+'</td><td>'+theses[i].teacher+'</td><td>'+theses[i].selections.first+'</td><td>'+theses[i].selections.second+'</td><td>'+theses[i].selections.third+'</td><td>'+theses[i].selections.chosen+'</td><td>'+theses[i].selections.not_chosen+'</td><td>'+theses[i].preferred_students+'</td><td>'+theses[i].enrolled_students+'</td></tr>');
	}

	for(i=0;i<students.length;i++){
		$('.students tbody').append('<tr><td>'+ students[i].id +'</td><td>'+ students[i].preferences.thesis_id[0] +' <em>'+theses[students[i].preferences.thesis_id[0]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[1] +' <em>'+theses[students[i].preferences.thesis_id[1]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[2] +' <em>'+theses[students[i].preferences.thesis_id[2]].teacher+'</em></td><td>'+ students[i].preferences.friend_id +'</td><td>'+students[i].enrolled_thesis+'</td></tr>');
	}
	
	
	function generateStudents(total){
		var students = [];
		for(i=0;i<total;i++){
			var t = uniqueRandom(3, theses.length);
			var f = uniqueRandom(Math.floor(Math.random()*(total/8))+3, total);
			students[i] = {
				"id": i,
				"preferences" : {
					"thesis_id" : [
						t[0],t[1],t[2]
					],
					"friend_id": f
				},
				"enrolled_thesis" : -1
			};
		}
		return students;
	}
	
	function generateTheses(total){
		var sections = [];
		for(i=0;i<total;i++){
			sections[i] = {
				"id": i,
				"teacher" : "TeachBot"+(1+i),
				"spaces" : {
					"total":14,
					"taken":0,
					"available":14,
				},
				"preferred_students" : [],
				"enrolled_students" : [],
				"selections" : {}
			};
		}
		return sections;
	}
	
	function uniqueRandom(count, bound){
		if(bound>=count){
			var set = [];
			for(j=0;j<count;j++){
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

	}
	
});