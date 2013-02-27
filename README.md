WOW
===

Writing on the Wall code for algorithm

This page is two tables - students and thesis sections

The first table shows the number of students, their 1st, 2nd, & 3rd choices, their friends, and the thesis they get enrolled in.

The second table shows the thesis sections, who teaches, how many students selected it as a first, second, and third choice, preferred students, and enrolled students

The current state of the algorithm is:

1. For each thesis section, if the number of first choices is less than or equal to the number of spots, accept those students.
2. If a thesis section has more interest than spots, the teacher's preferences are collected between all "interested students". Those who indicated that thesis as either a 1st, 2nd, or 3rd choice.
3. If a student whose first choice is a contested section has been selected by the professor, that student is accepted.
4. Students are scored by their and their friends' first choices.
5. Students with the highest scores are accepted into contested sections until there are no spaces left.
***** Soon *****
6. Repeat steps 1-5 for second and third choices.
7. Handle remaining students* 

*still under thought construction