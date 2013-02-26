jQuery(document).ready(function($){

	var theses = generateTheses(7);
	var students = generateStudents(80);
	console.log(students);
	console.log(theses);
	
	for(i=0;i<students.length;i++){
		$('.students tbody').append('<tr><td>'+ students[i].id +'</td><td>'+ students[i].preferences.thesis_id[0] +' <em>'+theses[students[i].preferences.thesis_id[0]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[1] +' <em>'+theses[students[i].preferences.thesis_id[1]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[2] +' <em>'+theses[students[i].preferences.thesis_id[2]].teacher+'</em></td>``<td>'+ students[i].preferences.friend_id +'</td><td></td></tr>');
	}
	
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
		chosen = first+second+third;
		$('.theses tbody').append('<tr><td>'+theses[i].id+'</td><td>'+theses[i].teacher+'</td><td>'+first+'</td><td>'+second+'</td><td>'+third+'</td><td>'+chosen+'</td><td>'+not_chosen+'</td><td></td></tr>');
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
				}
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
				"students" : []
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
	

	
});