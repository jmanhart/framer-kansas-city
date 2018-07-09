timeOptions = {hour: '2-digit', minute: '2-digit', second: '2-digit'};

getTime = () ->
	time = new Date()
	time.toLocaleString('en-US', timeOptions)

time = new TextLayer
	x: Align.center()
	y: Align.center()
	color: 'black'
	fontSize: 30
	textAlign: 'left'
	text: "thinking..."
	
Utils.interval 1, ->
	time.text = getTime()
# 	print getTime()

	