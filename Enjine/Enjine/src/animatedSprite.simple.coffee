###
	Class to represent an uninterrupted set of frames to animate.
	Code by Rob Kleffner, 2011
###

@module("Enjine", ->
	class AnimationSequence
		constructor: (@startRow, @startColumn, @endRow, @endColumn) ->
			@singleFrame = false
			if @startRow == @endRow and @startColumn == @endColumn
				@singleFrame = true
)

@module("Enjine", ->
	class AnimatedSprite extends FrameSprite
		lastElapsed: 0
		framesPerSecond: 1 / 20
		currentSequence: null
		playing: false
		looping: false
		sequences: {}

		update: (delta) ->
			if @currentSequence.singleFrame then return
			
			unless @playing then return

			@lastElapsed -= delta

			if @lastElapsed > 0 then return

			@lastElapsed = @framesPerSecond
			@frameX += @frameWidth

			if @frameX > (@image.width - @frameWidth)
				@frameX = 0
				@frameY += @frameHeight

				if @frameY > (@image.height - @frameHeight)
					@frameY = 0

			if @frameX > (@currentSequence.endColumn * @frameWidth) and @frameY == (@currentSequence.endRow * @frameHeight)
				seqEnd = true
			else if @frameX == 0 and @frameY > (@currentSequence.endRow * @frameHeight)
				seqEnd = true

			if (seqEnd)
				if @looping
					@frameX = @currentSequence.startColumn * @frameWidth
					@frameY = @currentSequence.startRow * @frameHeight
				else
					@playing = false

		playSequence: (seqName, doLoop) ->
			@playing = true
			@looping = doLoop
			@currentSequence = @sequences["seq_" + seqName]
			@frameX = @currentSequence.startColumn * @frameWidth
			@frameY = @currentSequence.startRow * @frameHeight
			@

		stopLooping: ->
			@looping = false
			@

		stopPlaying: ->
			@playing = false
			@

		setFrameWidth: (width) ->
			@frameWidth = width
			@

		setFrameHeight: (height) ->
			@frameHeight = height
			@

		setColumnCount: (columnCount) ->
			@frameWidth = @image.width / columnCount
			@

		setRowCount: (rowCount) ->
			@frameHeight = @image.height / rowCount
			@

		addSequence: (name, sequence) ->
			@sequences["seq_" + name] = sequence
			@

		addNewSequence: (name, startRow, startColumn, endRow, endColumn) ->
			@sequences["seq_" + name] = new Enjine.AnimationSequence(startRow, startColumn, endRow, endColumn)
			@

		deleteSequence: (name) ->
			delete @sequences["seq_" + name]
			@

		clearSequences: ->
			delete @sequences
			@sequences = {}
			@
)