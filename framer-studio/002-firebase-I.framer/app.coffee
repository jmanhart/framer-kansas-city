{Firebase} = require 'firebase'


firebase = new Firebase
	projectID: "framer-i"
	secret: "VDHF62p58FpqztGonXED9Qc1XQxIOlabw3oe8RwK"
	
	
topAlert = new Layer
	width: Screen.width
	height: 70
	backgroundColor: "#2F2F2F"
	y: Align.top(-70)
	
alertString = new TextLayer
	parent: topAlert
	fontSize: 17
	x: Align.left(16)
	y: Align.top(16)
	text: "Hola Julio!"
 
topAlert.states =
	active:
		y: Align.top(0)


topAlert.animationOptions =
	curve: Spring(damping: 0.7)
	time: 0.5


bottomAlert = new Layer
	width: Screen.width
	height: 150
	backgroundColor: "#2F2F2F"
	y: Align.bottom(150)

bottomAlertString = new TextLayer
	parent: bottomAlert
	x: Align.center()
	y: Align.center
	fontSize: 22
	text: "{Bottom Alert String}"
	
bottomAlert.states =
	active:
		y: Align.bottom(0)
bottomAlert.animationOptions = topAlert.animationOptions
# On Change to monitor the data base in real time
firebase.onChange "/bottomAlert", (value) ->
	if value == true
		bottomAlert.stateCycle("active")
		alertString.text = "Hola Julio! This is an error message :("
	if value == false
		bottomAlert.stateCycle("default")
		
firebase.onChange "/topAlert", (value) ->
	if value == true
		topAlert.stateCycle("active")
	if value == false
		topAlert.stateCycle("default")	
	