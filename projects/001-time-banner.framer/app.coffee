timeOptions = {hour: '2-digit', minute: '2-digit', second: '2-digit'};

getTime = () ->
	time = new Date()
	time.toLocaleString('en-US', timeOptions)
	
	
# getMinutes = () ->
# 	getMinutes = new Date()

time = new TextLayer
	x: Align.center()
	y: Align.center()
	color: 'black'
	fontSize: 48
	fontFamily: 'Roboto'
	width: 300
	textAlign: 'center'
	text: "thinking..."
	
Utils.interval 1, ->
	time.text = getTime()
# 	print getTime()


